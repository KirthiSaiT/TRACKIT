// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Video, Mic, VideoOff, MicOff, Users } from "lucide-react";
// import axios from "axios";

// const Maps = () => {
//   const { roomId } = useParams();
//   const [roomDetails, setRoomDetails] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   const [videoEnabled, setVideoEnabled] = useState(true);
//   const [audioEnabled, setAudioEnabled] = useState(true);

//   useEffect(() => {
//     fetchRoomDetails();
//   }, [roomId]);

//   const fetchRoomDetails = async () => {
//     try {
//       const response = await axios.get(`/api/rooms/${roomId}`);
//       setRoomDetails(response.data);
//       setParticipants(response.data.participants || []);
//     } catch (error) {
//       console.error("Error fetching room details:", error);
//     }
//   };
  

//   const toggleVideo = () => {
//     setVideoEnabled((prev) => !prev);
//   };

//   const toggleAudio = () => {
//     setAudioEnabled((prev) => !prev);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-white">
//       {roomDetails ? (
//         <>
//           <h2 className="text-2xl font-semibold">Room: {roomDetails.name}</h2>
//           <Card className="w-full max-w-3xl mt-4">
//             <CardContent className="p-4 flex flex-col gap-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-medium">Participants</span>
//                 <Users className="w-5 h-5" />
//               </div>
//               <ul>
//                 {participants.map((user, index) => (
//                   <li key={index} className="text-sm border-b py-2">{user.name}</li>
//                 ))}
//               </ul>
//             </CardContent>
//           </Card>

//           <div className="flex gap-4 mt-6">
//             <Button onClick={toggleVideo} variant="outline">
//               {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
//               {videoEnabled ? "Disable Video" : "Enable Video"}
//             </Button>
//             <Button onClick={toggleAudio} variant="outline">
//               {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
//               {audioEnabled ? "Mute" : "Unmute"}
//             </Button>
//           </div>
//         </>
//       ) : (
//         <p>Loading room details...</p>
//       )}
//     </div>
//   );
// };

// export default Maps;
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css"; // Ensure Leaflet styles are applied

const socket = io("http://localhost:3000"); // Adjust backend URL accordingly

const RealTimeTracking = () => {
  useEffect(() => {
    // Ensure map container exists before initializing
    const mapContainer = document.getElementById("map");
    if (!mapContainer) return;

    // Initialize Leaflet map
    const map = L.map("map").setView([20.5937, 78.9629], 5); // Default view (India)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([20.5937, 78.9629]).addTo(map);

    // Listen for real-time location updates
    socket.on("locationUpdate", (data) => {
      const { latitude, longitude } = data;
      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude], 12);
    });

    return () => {
      socket.off("locationUpdate");
      map.remove();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="bg-gray-800 text-white text-center p-4 text-xl">
        StreetMap
      </header>
      <div id="map" className="flex-grow w-full h-full"></div>
      <footer className="bg-gray-800 text-white text-center p-2">
        &copy; 2024 M0R1Ar3Y
      </footer>
    </div>
  );
};

export default RealTimeTracking;
