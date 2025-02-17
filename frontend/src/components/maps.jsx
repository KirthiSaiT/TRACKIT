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
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    // Prevent scrolling on the body when component mounts
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Re-enable scrolling when component unmounts
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

          socket.emit("send-location", {
            latitude,
            longitude,
            roomId: adminKey,
            isEmergency
          });
        },
        (error) => console.error("Geolocation Error:", error),
        { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
      );
    }
  }, [adminKey, isEmergency]);

  const handleSOSClick = () => {
    if (!isEmergency) {
      setShowConfirm(true);
    } else {
      setIsEmergency(false);
    }
  };

  const confirmSOS = () => {
    setIsEmergency(true);
    setShowConfirm(false);
    if (userLocation) {
      socket.emit("emergency-signal", {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        roomId: adminKey
      });
    }
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
            zoomControl={false} // Disable default zoom control
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {userLocation && <MapCenter userLocation={userLocation} />}
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

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm mx-4">
                <h3 className="text-xl font-bold mb-4">Confirm Emergency Alert</h3>
                <p className="mb-6 text-gray-600">Are you sure you want to send an emergency signal? This will alert all connected users.</p>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirm(false)}
                    className="hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={confirmSOS}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Send Alert
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* SOS Button */}
          <div className="fixed bottom-8 right-6 z-[1000]">
            <Button
              size="lg"
              className={`font-bold shadow-xl flex items-center gap-2 px-8 py-6 text-lg transition-all duration-300 ${
                isEmergency 
                  ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={handleSOSClick}
            >
              <AlertCircle className="h-6 w-6" />
              {isEmergency ? "CANCEL EMERGENCY" : "SOS"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Maps;