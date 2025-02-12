import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  MessageSquare,
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Settings,
} from "lucide-react";

const API_URL = 'http://localhost:3000/api';

const Maps = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetchRoomDetails();
  }, [roomId]);

  const fetchRoomDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/rooms/${roomId}`);
      if (!response.ok) throw new Error('Room not found');
      const data = await response.json();
      setRoom(data);
      // Simulated participants - replace with actual API call
      setParticipants([
        { id: 1, name: "User 1", isMuted: false, isVideoOff: false },
        { id: 2, name: "User 2", isMuted: true, isVideoOff: false },
      ]);
    } catch (err) {
      setError('Error loading room');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveRoom = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <p className="text-white">Loading room...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <p className="text-red-400">{error}</p>
            <Button
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate('/')}
            >
              Return to Rooms
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-950">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-zinc-900/50 border-b border-zinc-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">{room?.roomName}</h1>
              <p className="text-zinc-400">Managed by {room?.adminName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-900/30"
                onClick={handleLeaveRoom}
              >
                <PhoneOff className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 gap-4">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="bg-zinc-800 rounded-lg aspect-video relative"
            >
              <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                <span className="text-white">{participant.name}</span>
                {participant.isMuted && <MicOff className="w-4 h-4 text-red-400" />}
                {participant.isVideoOff && <VideoOff className="w-4 h-4 text-red-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Chat/Participants Sidebar */}
        <div className="w-80 bg-zinc-900/50 border-l border-zinc-800">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Participants</h2>
              <span className="text-zinc-400">{participants.length}</span>
            </div>
            <div className="space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800"
                >
                  <span className="text-white">{participant.name}</span>
                  <div className="flex items-center space-x-2">
                    {participant.isMuted && <MicOff className="w-4 h-4 text-red-400" />}
                    {participant.isVideoOff && <VideoOff className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;