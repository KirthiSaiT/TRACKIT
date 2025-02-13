import React, { useEffect } from "react";
import { io } from "socket.io-client";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";

// Connect to backend
const socket = io("http://localhost:3000");

const RealTimeTracking = () => {
  useEffect(() => {
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Default India view

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markers = {}; // Store markers for each user

    // Function to create custom marker icon
    const createMarkerIcon = (color) =>
      L.icon({
        iconUrl: `https://via.placeholder.com/40/${color}/ffffff?text=●`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

    // Get real-time location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          socket.emit("send-location", { latitude, longitude });
        },
        (error) => console.error("❌ GPS Error:", error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error("❌ Geolocation not supported");
    }

    // Listen for location updates
    socket.on("receive-location", ({ id, latitude, longitude, userNumber }) => {
      if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]); // Move existing marker
      } else {
        const color = ["FF0000", "0000FF", "008000", "FFA500", "800080", "FF1493", "00CED1", "FFD700"][userNumber % 8];
        markers[id] = L.marker([latitude, longitude], { icon: createMarkerIcon(color) })
          .addTo(map)
          .bindPopup(`User ${userNumber}`);
      }
    });

    // Remove marker when a user disconnects
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
        &copy; 2024 TRACK1T
      </footer>
    </div>
  );
};

export default RealTimeTracking;
