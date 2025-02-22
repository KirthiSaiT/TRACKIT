// import React, { useEffect, useState, useRef } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import io from "socket.io-client";
// import Sos from "./sos";

// // Fix for missing Leaflet marker icons
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// const DefaultIcon = L.icon({
//   iconUrl: markerIcon,
//   shadowUrl: markerShadow,
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// const socket = io("http://localhost:3000");

// const MapCenter = ({ userLocation }) => {
//   const map = useMap();
//   useEffect(() => {
//     if (userLocation) {
//       map.setView([userLocation.latitude, userLocation.longitude], 12, {
//         animate: true,
//       });
//     }
//   }, [userLocation, map]);
//   return null;
// };

// const Maps = ({ adminKey }) => {
//   const [markers, setMarkers] = useState({});
//   const [userLocation, setUserLocation] = useState(null);
//   const [roomExists, setRoomExists] = useState(true);
//   const [isEmergency, setIsEmergency] = useState(false);
//   const [userToken, setUserToken] = useState(null);
//   const mapRef = useRef(null); // Holds the Leaflet map instance

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   useEffect(() => {
//     if (!adminKey) return;

//     fetch(`http://localhost:3000/api/rooms/${adminKey}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.message === "Room not found") {
//           setRoomExists(false);
//         } else {
//           socket.emit("join-room", adminKey);
//         }
//       })
//       .catch((error) => console.error("Room check error:", error));

//     socket.on("session-created", (data) => {
//       const { token } = data;
//       setUserToken(token);
//       localStorage.setItem("userToken", token);
//     });

//     socket.on("current-users", (users) => {
//       setMarkers(users);
//     });

//     socket.on("receive-location", ({ token, latitude, longitude, markerType }) => {
//       setMarkers((prev) => ({
//         ...prev,
//         [token]: { latitude, longitude, markerType },
//       }));
//     });

//     socket.on("user-joined", ({ token, markerType }) => {
//       setMarkers((prev) => ({
//         ...prev,
//         [token]: { latitude: null, longitude: null, markerType },
//       }));
//     });

//     socket.on("user-disconnected", (token) => {
//       setMarkers((prev) => {
//         const updatedMarkers = { ...prev };
//         delete updatedMarkers[token];
//         return updatedMarkers;
//       });
//     });

//     return () => {
//       socket.off("session-created");
//       socket.off("current-users");
//       socket.off("receive-location");
//       socket.off("user-joined");
//       socket.off("user-disconnected");
//     };
//   }, [adminKey]);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation({ latitude, longitude });

//           if (userToken) {
//             socket.emit("send-location", {
//               latitude,
//               longitude,
//               roomId: adminKey,
//               token: userToken,
//             });
//           }
//         },
//         (error) => console.error("Geolocation Error:", error),
//         { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
//       );
//     }
//   }, [adminKey, userToken]);

//   const handleEmergencyAlert = async () => {
//     setIsEmergency(true);
//     if (userLocation && userToken) {
//       socket.emit("emergency-signal", {
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//         roomId: adminKey,
//         token: userToken,
//       });
//     }
//   };

//   return (
//     <div className="fixed inset-0 w-full h-full overflow-hidden">
//       {!roomExists ? (
//         <div className="flex justify-center items-center h-full text-red-600 text-xl font-bold">
//           Room Not Found
//         </div>
//       ) : (
//         <>
//           <MapContainer
//             center={[20.5937, 78.9629]}
//             zoom={8}
//             className="w-full h-full"
//             zoomControl={false}
//             whenCreated={(map) => {
//               if (!mapRef.current) {
//                 mapRef.current = map; // Ensure only one instance is created
//               }
//             }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             {userLocation && <MapCenter userLocation={userLocation} />}
//             {Object.entries(markers).map(([token, { latitude, longitude, markerType }]) => (
//               latitude && longitude ? (
//                 <Marker key={token} position={[latitude, longitude]} icon={DefaultIcon}>
//                   <Popup>User {token.slice(0, 8)}...</Popup>
//                 </Marker>
//               ) : null
//             ))}
//             {userLocation && (
//               <Marker position={[userLocation.latitude, userLocation.longitude]} icon={DefaultIcon}>
//                 <Popup>You</Popup>
//               </Marker>
//             )}
//           </MapContainer>

//           <div className="fixed bottom-8 right-6 z-[1000]">
//             <Sos onEmergencyAlert={handleEmergencyAlert} isEmergency={isEmergency} />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Maps;
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:3000");

const Maps = () => {
    const mapRef = useRef(null);
    const userMarker = useRef(null);
    const markers = useRef({});
    const [locationError, setLocationError] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId') || `user_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('userId', storedUserId);
        setUserId(storedUserId);

        if (!mapRef.current) {
            mapRef.current = L.map("map", {
                center: [0, 0],
                zoom: 15,
            });

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "StreetMap-byPayalKri"
            }).addTo(mapRef.current);
        }

        const updateUserLocation = (latitude, longitude) => {
            socket.emit("send-location", { id: storedUserId, latitude, longitude });

            if (!userMarker.current) {
                userMarker.current = L.marker([latitude, longitude], {
                    icon: L.icon({
                        iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                    })
                }).addTo(mapRef.current);
            } else {
                userMarker.current.setLatLng([latitude, longitude]);
            }
            userMarker.current.bindPopup(`You (${storedUserId})`).openPopup();
            mapRef.current.setView([latitude, longitude], 15);
        };

        navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                updateUserLocation(latitude, longitude);
                setLocationError(null);
            },
            (error) => {
                setLocationError("Unable to get your location. Please check permissions.");
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

        socket.emit("request-all-locations");

        return () => {
            socket.off("receive-location");
            socket.off("all-locations");
            socket.off("user-disconnected");
        };
    }, []);

    useEffect(() => {
        socket.on("receive-location", ({ id, latitude, longitude }) => {
            if (!mapRef.current || id === userId) return;

            if (markers.current[id]) {
                markers.current[id].setLatLng([latitude, longitude]);
            } else {
                markers.current[id] = L.marker([latitude, longitude], {
                    icon: L.icon({
                        iconUrl: id === userId ? "https://leafletjs.com/examples/custom-icons/leaf-red.png" : "https://leafletjs.com/examples/custom-icons/leaf-green.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                    })
                }).addTo(mapRef.current).bindPopup(`User ${id}`).openPopup();
            }
        });

        socket.on("all-locations", (locations) => {
            Object.entries(locations).forEach(([id, location]) => {
                if (id !== userId && location.latitude && location.longitude) {
                    if (markers.current[id]) {
                        markers.current[id].setLatLng([location.latitude, location.longitude]);
                    } else {
                        markers.current[id] = L.marker([location.latitude, location.longitude], {
                            icon: L.icon({
                                iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                            })
                        }).addTo(mapRef.current).bindPopup(`User ${id}`).openPopup();
                    }
                }
            });
        });

        socket.on("user-disconnected", (disconnectedId) => {
            if (markers.current[disconnectedId]) {
                mapRef.current.removeLayer(markers.current[disconnectedId]);
                delete markers.current[disconnectedId];
            }
        });
    }, [userId]);

    return (
        <div className="fixed inset-0 overflow-hidden">
            <div id="map" className="w-full h-full" />
            {locationError && (
                <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {locationError}
                </div>
            )}
        </div>
    );
};

export default Maps;