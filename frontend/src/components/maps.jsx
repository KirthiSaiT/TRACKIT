import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import io from "socket.io-client";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// Fix for missing Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Sos from "./sos";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const socket = io("http://localhost:3000");

const MapCenter = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 12, {
        animate: true,
      });
    }
  }, [userLocation, map]);
  return null;
};

const Maps = ({ adminKey }) => {
  const [markers, setMarkers] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [roomExists, setRoomExists] = useState(true);
  const [isEmergency, setIsEmergency] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (!adminKey) return;

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

    socket.on("session-created", (data) => {
      const { token, markerType } = data;
      setUserToken(token);
      localStorage.setItem("userToken", token);
    });

    socket.on("current-users", (users) => {
      setMarkers(users);
    });

    socket.on("receive-location", ({ token, latitude, longitude, markerType }) => {
      setMarkers((prev) => ({
        ...prev,
        [token]: { latitude, longitude, markerType },
      }));
    });

    socket.on("user-joined", ({ token, markerType }) => {
      setMarkers((prev) => ({
        ...prev,
        [token]: { latitude: null, longitude: null, markerType },
      }));
    });

    socket.on("user-disconnected", (token) => {
      setMarkers((prev) => {
        const updatedMarkers = { ...prev };
        delete updatedMarkers[token];
        return updatedMarkers;
      });
    });

    return () => {
      socket.off("session-created");
      socket.off("current-users");
      socket.off("receive-location");
      socket.off("user-joined");
      socket.off("user-disconnected");
    };
  }, [adminKey]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          if (userToken) {
            socket.emit("send-location", {
              latitude,
              longitude,
              roomId: adminKey,
              token: userToken,
            });
          }
        },
        (error) => console.error("Geolocation Error:", error),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }
  }, [adminKey, userToken]);

  const handleEmergencyAlert = async () => {
    setIsEmergency(true);
    if (userLocation && userToken) {
      socket.emit("emergency-signal", {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        roomId: adminKey,
        token: userToken,
      });
    }
  };

  const getMarkerIcon = (markerType) => {
    return DefaultIcon; // You can extend this for different icons if needed
  };

  const getOffsetPosition = (baseLat, baseLon, token, allMarkers) => {
    // Group markers by their base latitude and longitude
    const sameLocationMarkers = Object.entries(allMarkers).filter(
      ([_, { latitude, longitude }]) =>
        Math.abs(latitude - baseLat) < 0.0001 && Math.abs(longitude - baseLon) < 0.0001
    );

    if (sameLocationMarkers.length <= 1) {
      return { lat: baseLat, lng: baseLon }; // No offset needed if only one marker
    }

    // Sort tokens to ensure consistent ordering for offsets
    const sortedTokens = sameLocationMarkers.map(([t]) => t).sort();
    const index = sortedTokens.indexOf(token);

    // Offset in meters (approximately 0.0001 degrees ≈ 11 meters at equator)
    const offset = index * 0.0001; // Adjust this value for desired spacing
    const angle = (2 * Math.PI * index) / sameLocationMarkers.length; // Distribute around a circle

    // Calculate new position (simple offset for side-by-side placement)
    const newLat = baseLat + offset * Math.cos(angle);
    const newLon = baseLon + offset * Math.sin(angle);

    return { lat: newLat, lng: newLon };
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden">
      {!roomExists ? (
        <div className="flex justify-center items-center h-full text-red-600 text-xl font-bold">
          Room Not Found
        </div>
      ) : (
        <>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={8}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {userLocation && <MapCenter userLocation={userLocation} />}
            {Object.entries(markers).map(([token, { latitude, longitude, markerType }]) => {
              if (latitude && longitude) {
                const { lat, lng } = getOffsetPosition(latitude, longitude, token, markers);
                return (
                  <Marker
                    key={token}
                    position={[lat, lng]}
                    icon={getMarkerIcon(markerType)}
                  >
                    <Popup>User {token.slice(0, 8)}...</Popup>
                  </Marker>
                );
              }
              return null;
            })}
            {userLocation && (
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={getMarkerIcon("default")}
              >
                <Popup>You</Popup>
              </Marker>
            )}
          </MapContainer>

          <div className="fixed bottom-8 right-6 z-[1000]">
            <Sos onEmergencyAlert={handleEmergencyAlert} isEmergency={isEmergency} />
          </div>
        </>
      )}
    </div>
  );
};

export default Maps;