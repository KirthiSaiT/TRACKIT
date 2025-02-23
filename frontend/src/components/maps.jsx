// import { useEffect, useRef, useState } from "react";
// import { io } from "socket.io-client";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const socket = io("http://localhost:3000");

// const Maps = () => {
//     const mapRef = useRef(null);
//     const userMarker = useRef(null);
//     const markers = useRef({});
//     const [locationError, setLocationError] = useState(null);
//     const [userId, setUserId] = useState(null);

//     useEffect(() => {
//         const storedUserId = localStorage.getItem('userId') || `user_${Math.random().toString(36).substr(2, 9)}`;
//         localStorage.setItem('userId', storedUserId);
//         setUserId(storedUserId);

//         if (!mapRef.current) {
//             mapRef.current = L.map("map", {
//                 center: [0, 0],
//                 zoom: 15,
//             });

//             L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                 attribution: "StreetMap-byPayalKri"
//             }).addTo(mapRef.current);
//         }

//         const updateUserLocation = (latitude, longitude) => {
//             socket.emit("send-location", { id: storedUserId, latitude, longitude });

//             if (!userMarker.current) {
//                 userMarker.current = L.marker([latitude, longitude], {
//                     icon: L.icon({
//                         iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
//                         iconSize: [25, 41],
//                         iconAnchor: [12, 41],
//                     })
//                 }).addTo(mapRef.current);
//             } else {
//                 userMarker.current.setLatLng([latitude, longitude]);
//             }
//             userMarker.current.bindPopup(`You (${storedUserId})`).openPopup();
//             mapRef.current.setView([latitude, longitude], 15);
//         };

//         navigator.geolocation.watchPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 updateUserLocation(latitude, longitude);
//                 setLocationError(null);
//             },
//             (error) => {
//                 setLocationError("Unable to get your location. Please check permissions.");
//             },
//             {
//                 enableHighAccuracy: true,
//                 timeout: 5000,
//                 maximumAge: 0
//             }
//         );

//         socket.emit("request-all-locations");

//         return () => {
//             socket.off("receive-location");
//             socket.off("all-locations");
//             socket.off("user-disconnected");
//         };
//     }, []);

//     useEffect(() => {
//         socket.on("receive-location", ({ id, latitude, longitude }) => {
//             if (!mapRef.current || id === userId) return;

//             if (markers.current[id]) {
//                 markers.current[id].setLatLng([latitude, longitude]);
//             } else {
//                 markers.current[id] = L.marker([latitude, longitude], {
//                     icon: L.icon({
//                         iconUrl: id === userId ? "https://leafletjs.com/examples/custom-icons/leaf-red.png" : "https://leafletjs.com/examples/custom-icons/leaf-green.png",
//                         iconSize: [25, 41],
//                         iconAnchor: [12, 41],
//                     })
//                 }).addTo(mapRef.current).bindPopup(`User ${id}`).openPopup();
//             }
//         });

//         socket.on("all-locations", (locations) => {
//             Object.entries(locations).forEach(([id, location]) => {
//                 if (id !== userId && location.latitude && location.longitude) {
//                     if (markers.current[id]) {
//                         markers.current[id].setLatLng([location.latitude, location.longitude]);
//                     } else {
//                         markers.current[id] = L.marker([location.latitude, location.longitude], {
//                             icon: L.icon({
//                                 iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
//                                 iconSize: [25, 41],
//                                 iconAnchor: [12, 41],
//                             })
//                         }).addTo(mapRef.current).bindPopup(`User ${id}`).openPopup();
//                     }
//                 }
//             });
//         });

//         socket.on("user-disconnected", (disconnectedId) => {
//             if (markers.current[disconnectedId]) {
//                 mapRef.current.removeLayer(markers.current[disconnectedId]);
//                 delete markers.current[disconnectedId];
//             }
//         });
//     }, [userId]);

//     return (
//         <div className="fixed inset-0 overflow-hidden">
//             <div id="map" className="w-full h-full" />
//             {locationError && (
//                 <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//                     {locationError}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Maps;

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const socket = io("http://localhost:3000");

const Maps = () => {
    const mapRef = useRef(null);
    const userMarker = useRef(null);
    const markers = useRef({});
    const [locationError, setLocationError] = useState(null);
    const [userId, setUserId] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);

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
            if (!latitude || !longitude) return; // 🔥 FIX: Prevent sending undefined locations

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

        // 🔥 NEW: Emit "user-joined" when connecting
        socket.emit("user-joined", storedUserId);

        socket.emit("request-all-locations");

        return () => {
            socket.off("receive-location");
            socket.off("all-locations");
            socket.off("user-joined");
            socket.off("user-disconnected");
        };
    }, []);

    useEffect(() => {
        socket.on("receive-location", ({ id, latitude, longitude }) => {
            if (!mapRef.current || id === userId || !latitude || !longitude) return; // 🔥 FIX: Ensure valid lat/lng

            if (markers.current[id]) {
                markers.current[id].setLatLng([latitude, longitude]);
            } else {
                markers.current[id] = L.marker([latitude, longitude], {
                    icon: L.icon({
                        iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
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

        // 🔥 FIXED: Notify when a user joins
        socket.on("user-joined", (joinedId) => {
            if (joinedId !== userId) {
                setAlertMessage(`User ${joinedId} has joined the room.`);
                setTimeout(() => setAlertMessage(null), 3000);
            }
        });

        socket.on("user-disconnected", (disconnectedId) => {
            if (markers.current[disconnectedId]) {
                mapRef.current.removeLayer(markers.current[disconnectedId]);
                delete markers.current[disconnectedId];
            }
            setAlertMessage(`User ${disconnectedId} has left the room.`);
            setTimeout(() => setAlertMessage(null), 3000);
        });
    }, [userId]);

    return (
        <div className="fixed inset-0 overflow-hidden">
            <div id="map" className="w-full h-full" />
            {alertMessage && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <Alert>
                        <AlertTitle>Notification</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
            {locationError && (
                <div className="absolute top-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {locationError}
                </div>
            )}
        </div>
    );
};

export default Maps;
