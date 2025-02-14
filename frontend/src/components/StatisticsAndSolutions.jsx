import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, UserCheck, AlertTriangle, Heart } from 'lucide-react';

const StatisticsAndSolutions = () => {
  const kidnappingData = [
    { name: 'Child Kidnapping', value: 35, color: '#ef4444' },
    { name: 'Adult Kidnapping', value: 25, color: '#f97316' },
    { name: 'Human Trafficking', value: 30, color: '#84cc16' },
    { name: 'Attempted Cases', value: 10, color: '#06b6d4' }
  ];

  // Calculate SVG pie chart segments
  const total = kidnappingData.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const createPieSegment = (percentage) => {
    const angle = (percentage / 100) * 360;
    const x1 = Math.cos((currentAngle * Math.PI) / 180) * 100;
    const y1 = Math.sin((currentAngle * Math.PI) / 180) * 100;
    const x2 = Math.cos(((currentAngle + angle) * Math.PI) / 180) * 100;
    const y2 = Math.sin(((currentAngle + angle) * Math.PI) / 180) * 100;
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const d = [
      `M 0 0`,
      `L ${x1} ${y1}`,
      `A 100 100 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L 0 0`
    ].join(' ');
    
    currentAngle += angle;
    return d;
  };

  const solutions = [
    {
      icon: Shield,
      title: "Real-Time Location Tracking",
      description: "TRACK1T provides continuous monitoring of your loved ones' whereabouts with instant alerts for unusual movements."
    },
    {
      icon: UserCheck,
      title: "Emergency Response System",
      description: "One-tap SOS activation instantly notifies emergency contacts and nearby authorities with precise location data."
    },
    {
      icon: AlertTriangle,
      title: "Geofencing Alerts",
      description: "Set safe zones and receive immediate notifications when someone enters or leaves designated areas."
    },
    {
      icon: Heart,
      title: "Family Safety Network",
      description: "Create private groups for family members to stay connected and protected through our secure platform."
    }
  ];

  return (
    <div className="relative w-full  py-16 px-4 md:px-8 bg-black/50 mt-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Statistics Section */}
          <div className=" relative h-36 top-14  space-y-6">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  Kidnapping Statistics 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="-100 -100 200 200" className="transform -rotate-90">
                      {kidnappingData.map((item, index) => (
                        <path
                          key={index}
                          d={createPieSegment(item.value)}
                          fill={item.color}
                          stroke="#1f1f1f"
                          strokeWidth="1"
                        />
                      ))}
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    {kidnappingData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-400 text-sm">
                          {item.name}: {item.value}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 mt-4 text-center">
                  Based on reported cases in major metropolitan areas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Solutions Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">
              How <span className="text-pink-500">TRACK1T</span> Protects You
            </h2>
            <div className="grid gap-4">
              {solutions.map((solution, index) => (
                <Card key={index} className="bg-zinc-900/50 border-zinc-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <solution.icon className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-white text-lg font-semibold mb-2">
                          {solution.title}
                        </h3>
                        <p className="text-gray-400">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsAndSolutions;