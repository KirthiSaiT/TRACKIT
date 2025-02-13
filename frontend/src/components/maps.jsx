import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";

// Fix for missing Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const socket = io("http://localhost:3000"); // Change if using deployed backend

const Maps = ({ adminKey }) => {
  const [markers, setMarkers] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [roomExists, setRoomExists] = useState(true);

  useEffect(() => {
    if (!adminKey) return;

    // Check if room exists in MongoDB before joining
    fetch(`http://localhost:3000/api/rooms/${adminKey}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Room not found") {
          setRoomExists(false);
        } else {
          socket.emit("join-room", adminKey);
        }
      })
      .catch((error) => console.error("Room check error:", error));

    socket.on("current-users", (users) => {
      setMarkers(users);
    });

    socket.on("receive-location", ({ id, latitude, longitude }) => {
      setMarkers((prev) => ({
        ...prev,
        [id]: { latitude, longitude },
      }));
    });

    socket.on("user-disconnected", (id) => {
      setMarkers((prev) => {
        const updatedMarkers = { ...prev };
        delete updatedMarkers[id];
        return updatedMarkers;
      });
    });

    return () => {
      socket.off("receive-location");
      socket.off("user-disconnected");
      socket.off("current-users");
    };
  }, [adminKey]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          socket.emit("send-location", { latitude, longitude, roomId: adminKey });
        },
        (error) => console.error("Geolocation Error:", error),
        { enableHighAccuracy: true }
      );
    }
  }, [adminKey]);

  return (
    <div className="h-screen w-full">
      {!roomExists ? (
        <div className="flex justify-center items-center h-full text-red-600 text-xl font-bold">
          Room Not Found
        </div>
      ) : (
        <MapContainer center={[20.5937, 78.9629]} zoom={5} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {Object.entries(markers).map(([id, { latitude, longitude }]) => (
            <Marker key={id} position={[latitude, longitude]} icon={DefaultIcon}>
              <Popup>User {id}</Popup>
            </Marker>
          ))}

          {userLocation && (
            <Marker position={[userLocation.latitude, userLocation.longitude]} icon={DefaultIcon}>
              <Popup>You</Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </div>
  );
};

export default Maps;
