import React, { useState, useEffect } from "react";
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
  Users,
  Copy,
  ArrowRightCircle,
  Trash2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Maps from "./maps";

const API_URL = 'http://localhost:3000/api';

const Rooms = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [adminName, setAdminName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/rooms`);
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const data = await response.json();
      setRooms(data);
    } catch (err) {
      setError('Error fetching rooms');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (adminKey) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/rooms/${adminKey}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete room');
      
      setRooms(rooms.filter(room => room.adminKey !== adminKey));
    } catch (err) {
      setError('Error deleting room');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openCard = (type) => {
    setActiveCard(type);
    setError(null);
  };

  const closeCard = () => {
    setActiveCard(null);
    setAdminName("");
    setRoomName("");
    setAdminKey("");
    setError(null);
  };

  const handleCreateRoom = async () => {
    if (!adminName || !roomName) {
      setError("Please fill in all fields");
      return;
    }
    
    const randomKey = Math.random().toString(36).substring(7);
    const newRoom = { 
      adminName, 
      roomName, 
      adminKey: randomKey 
    };

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom)
      });

      if (!response.ok) throw new Error('Failed to create room');
      
      await fetchRooms();
      closeCard();
    } catch (err) {
      setError('Error creating room');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!adminKey) {
      setError("Please enter an admin key");
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/rooms/${adminKey}`);
      if (!response.ok) throw new Error('Room not found');
      
      const room = await response.json();
      closeCard();
    } catch (err) {
      setError('Invalid admin key');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleEnterRoom = (roomId) => {
    navigate(`/maps/${roomId}`);
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
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Create or Join Room here!</h2>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white" 
              onClick={() => openCard("create")}
              disabled={loading}
            >
              Create room
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white" 
              onClick={() => openCard("join")}
              disabled={loading}
            >
              Join room
            </Button>
          </div>

          {/* Modal */}
          {activeCard && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-zinc-900 rounded-lg shadow-lg p-6 w-80 max-w-md">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {activeCard === "create" ? "Create Room" : "Join Room"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {error && (
                      <div className="mb-4 p-2 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                        {error}
                      </div>
                    )}
                    {activeCard === "create" ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Admin Name
                          </label>
                          <input
                            type="text"
                            value={adminName}
                            onChange={(e) => setAdminName(e.target.value)}
                            placeholder="Enter Admin Name"
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Room Name
                          </label>
                          <input
                            type="text"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            placeholder="Enter Room Name"
                            className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                          Admin Key
                        </label>
                        <input
                          type="text"
                          value={adminKey}
                          onChange={(e) => setAdminKey(e.target.value)}
                          placeholder="Enter Admin Key"
                          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={loading}
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between space-x-2">
                    <Button
                      variant="ghost"
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                      onClick={closeCard}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={activeCard === "create" ? handleCreateRoom : handleJoinRoom}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : (activeCard === "create" ? "Create" : "Join")}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {/* Rooms Display */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {loading && !rooms.length ? (
                <div className="col-span-full text-center text-zinc-400">
                  Loading rooms...
                </div>
              ) : rooms.length === 0 ? (
                <div className="col-span-full text-center text-zinc-400">
                  No rooms available. Create one to get started!
                </div>
              ) : (
                rooms.map((room, index) => (
                  <Card key={index} className="bg-zinc-900/50 border border-zinc-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl font-medium text-white">
                            {room.roomName}
                          </CardTitle>
                          <p className="mt-1.5 flex items-center text-zinc-400">
                            <Users className="w-4 h-4 mr-1.5" />
                            Managed by {room.adminName}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-zinc-800/50 rounded-lg p-3 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-zinc-400">Admin Key</span>
                          <button 
                            onClick={() => copyToClipboard(room.adminKey)}
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                        <code className="block mt-1 text-sm font-mono text-emerald-400">
                          {room.adminKey}
                        </code>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="ghost" 
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                        onClick={() => handleDelete(room.adminKey)}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleEnterRoom(room.adminKey)}
                      >
                        <ArrowRightCircle className="w-4 h-4 mr-2" />
                        Enter Room
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-zinc-400">Need help? Contact support!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;