import React, { useEffect } from "react";
import { io } from "socket.io-client";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:3000"); // Backend URL

const RealTimeTracking = () => {
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Default to India

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markers = {}; // Store markers for each user

    // Get user's real-time location
    const updateUserLocation = () => {
      if (!navigator.geolocation) {
        console.error("❌ Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("send-location", { latitude, longitude });
        },
        (error) => console.error("❌ Error getting location:", error),
        { enableHighAccuracy: true }
      );
    };

    updateUserLocation(); // Start tracking

    // Listen for other users' locations
    socket.on("receive-location", ({ id, latitude, longitude }) => {
      if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
      } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
      }
      map.setView([latitude, longitude], 12);
    });

    // Remove disconnected users' markers
    socket.on("user-disconnected", (id) => {
      if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
      }
    });

    return () => {
      socket.off("receive-location");
      socket.off("user-disconnected");
      map.remove();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="bg-gray-800 text-white text-center p-4 text-xl">
        Real-Time Tracking
      </header>
      <div id="map" className="flex-grow w-full h-full"></div>
      <footer className="bg-gray-800 text-white text-center p-2">
        &copy; 2024 M0R1Ar3Y
      </footer>
    </div>
  );
};

export default RealTimeTracking;