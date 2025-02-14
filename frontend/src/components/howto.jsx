import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Users, 
  Bell, 
  Lock, 
  Globe, 
  Shield, 
  Clock, 
  Settings,
  AlertTriangle,
  Smartphone,
  UserPlus,
  Radio
} from 'lucide-react';

const HowTo = () => {
  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Monitor location updates instantly with high accuracy and minimal battery consumption",
      steps: [
        "Install TRACK1T on your device",
        "Enable location permissions",
        "Start sharing your location with trusted contacts"
      ]
    },
    {
      icon: Users,
      title: "Room-Based Sharing",
      description: "Create private rooms and invite specific users to share locations within closed groups",
      steps: [
        "Click 'Create Room' in the dashboard",
        "Set room name and privacy settings",
        "Invite members using email or phone number"
      ]
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous tracking with historical data and movement patterns",
      steps: [
        "Access your dashboard",
        "View real-time locations",
        "Check movement history and patterns"
      ]
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "Granular permissions and the ability to pause sharing at any time"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts for geofence entries/exits and important location updates"
    },
    {
      icon: Settings,
      title: "Admin Dashboard",
      description: "Comprehensive controls for room management and user permissions"
    }
  ];

  const globalFeatures = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Tracking system works across borders with seamless connectivity in over 190+ countries"
    },
    {
      icon: Shield,
      title: "End-to-End Encryption",
      description: "Military-grade encryption protects all location data and communications"
    },
    {
      icon: Radio,
      title: "International Response Network",
      description: "Connected with local authorities and emergency services worldwide"
    }
  ];

  return (
    <div className="w-full bg-black/50 min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            How to Use <span className="text-pink-500">TRACK1T</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow our simple guide to set up and start using TRACK1T's powerful tracking and safety features.
          </p>
        </div>

        {/* Getting Started */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="p-3 bg-pink-500/20 rounded-lg w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-500 text-sm">
                          {stepIndex + 1}
                        </div>
                        <p className="text-gray-400">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Global Network */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Global Security Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {globalFeatures.map((feature, index) => (
              <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="p-6">
                  <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
                    <feature.icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Response */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-white">Emergency Response System</h3>
            </div>
            <p className="text-gray-400 mb-6">
              In case of emergency, TRACK1T provides immediate response and support:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Smartphone className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">One-Tap SOS</h4>
                  <p className="text-gray-400">Instantly alert emergency contacts and authorities with your location</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <UserPlus className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">24/7 Support</h4>
                  <p className="text-gray-400">Round-the-clock monitoring and assistance in multiple languages</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowTo;