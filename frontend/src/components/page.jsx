import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  Archive,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Rooms = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const [activeCard, setActiveCard] = useState(null); // Tracks active card: "create" or "join"
  const [adminName, setAdminName] = useState(""); // For creating room
  const [roomName, setRoomName] = useState(""); // For creating room
  const [adminKey, setAdminKey] = useState(""); // For joining room
  const [rooms, setRooms] = useState([]); // To store created rooms

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openCard = (type) => {
    setActiveCard(type); // Set active card based on button click
  };

  const closeCard = () => {
    setActiveCard(null); // Close active card
  };

  const handleCreateRoom = () => {
    // Create a random admin key
    const randomKey = Math.random().toString(36).substring(7);
    const newRoom = { adminName, roomName, adminKey: randomKey };

    // Add the new room to the list and reset the form
    setRooms([...rooms, newRoom]);
    setAdminName("");
    setRoomName("");
    closeCard();
  };

  const handleJoinRoom = () => {
    // Handle join room logic (for now, just close the modal)
    closeCard();
  };

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] relative">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-zinc-900/50 border-r border-zinc-800 p-4 transition-all duration-300 ease-in-out`}
      >
        <nav className="space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-zinc-800/50 overflow-hidden"
          >
            <Home className="w-5 h-5 min-w-[20px]" />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Home
            </span>
          </Link>
          <Link
            to="/calendar"
            className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-zinc-800/50 overflow-hidden"
          >
            <Calendar className="w-5 h-5 min-w-[20px]" />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Calendar
            </span>
          </Link>
          <Link
            to="/archived"
            className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-zinc-800/50 overflow-hidden"
          >
            <Archive className="w-5 h-5 min-w-[20px]" />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Archived classes
            </span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-3 p-3 rounded-lg text-white hover:bg-zinc-800/50 overflow-hidden"
          >
            <Settings className="w-5 h-5 min-w-[20px]" />
            <span className={`transition-opacity duration-300 ${isSidebarOpen ? "opacity-100" : "opacity-0"}`}>
              Settings
            </span>
          </Link>
        </nav>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute left-0 top-4 transform translate-x-64 z-10 bg-zinc-800 hover:bg-zinc-700 text-white p-2 rounded-r-lg transition-transform duration-300"
        style={{
          transform: isSidebarOpen ? "translateX(15.5rem)" : "translateX(3.5rem)",
        }}
      >
        {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Create or Join Room here!</h2>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => openCard("create")}>
              Create room
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => openCard("join")}>
              Join room
            </Button>
          </div>

          {/* Active Card */}
          {activeCard && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <Card>
                  <CardHeader>
                    <CardTitle>{activeCard === "create" ? "Create Room" : "Join Room"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activeCard === "create" ? (
                      <div>
                        <label className="block mb-2">Admin Name</label>
                        <input
                          type="text"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          placeholder="Enter Admin Name"
                          className="mb-4 w-full p-2 border rounded"
                        />
                        <label className="block mb-2">Room Name</label>
                        <input
                          type="text"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                          placeholder="Enter Room Name"
                          className="mb-4 w-full p-2 border rounded"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block mb-2">Admin Key</label>
                        <input
                          type="text"
                          value={adminKey}
                          onChange={(e) => setAdminKey(e.target.value)}
                          placeholder="Enter Admin Key"
                          className="mb-4 w-full p-2 border rounded"
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={closeCard}>
                      Close
                    </Button>
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={activeCard === "create" ? handleCreateRoom : handleJoinRoom}
                    >
                      {activeCard === "create" ? "Create" : "Submit"}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-6">
            <p className="text-white">Need help? Contact support!</p>
          </div>

          {/* Display Created Rooms */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {rooms.map((room, index) => (
    <Card key={index} className="bg-gradient-to-r from-gray-500 via-green-400 to-gray-600 p-6 w-full max-w-xs rounded-xl shadow-xl backdrop-blur-xl border border-transparent transition-transform hover:scale-105">
      <CardHeader>
        <CardTitle className="text-white font-semibold text-2xl">{room.roomName}</CardTitle>
      </CardHeader>
      <CardContent className="text-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-200">Admin:</p>
          <p className="text-sm">{room.adminName}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-200">Admin Key:</p>
          <p className="text-sm truncate">{room.adminKey}</p>
        </div>
      </CardContent>
    </Card>
  ))}
</div>

           
            
          </div>
        </div>
      </div>
    
  );
};

export default Rooms;
