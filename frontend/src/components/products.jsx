import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  MapPin, 
  Battery, 
  Shield,
  Package,
  Ruler,
  Weight,
  Radio
} from 'lucide-react';

const Products = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 200;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleOrder = () => {
    alert(`Order placed for ${quantity} TRACK1T keychain tracker(s). Total: ₹${quantity * price}`);
  };

  return (
    <div className="w-full bg-black/50 min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            TRACK1T <span className="text-pink-500">Keychain Tracker</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Advanced location tracking without WiFi - Keep your loved ones safe and connected
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Display */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-8">
              <div className="aspect-square bg-zinc-800/50 rounded-lg mb-8 flex items-center justify-center">
                <div className="w-48 h-48 bg-pink-500/20 rounded-full flex items-center justify-center">
                  <MapPin size={64} className="text-pink-500" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Wifi className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-gray-400">Offline Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Battery className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-gray-400">6-Month Battery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-gray-400">Real-time Location</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Shield className="w-5 h-5 text-pink-500" />
                  </div>
                  <span className="text-gray-400">Encrypted Data</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Section */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Order Now</h2>
                <Badge className="bg-pink-500/20 text-pink-500 text-lg">₹{price}</Badge>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-white font-semibold mb-3">Key Features:</h3>
                  <ul className="space-y-2">
                    {['Compact keychain design', 'Works without WiFi', 'Real-time tracking', '6-month battery life', 'Water-resistant', 'Encrypted data'].map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">
                    Quantity
                  </label>
                  <div className="flex gap-4 items-center">
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-24 bg-zinc-800 border-zinc-700 text-white"
                    />
                    <span className="text-lg font-semibold text-white">
                      Total: ₹{quantity * price}
                    </span>
                  </div>
                </div>

                <Button 
                  onClick={handleOrder}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Place Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4">
                <Package className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Device Specs</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Size: 4.5 x 2.5 x 0.8 cm</li>
                <li className="text-gray-400">Weight: 15g</li>
                <li className="text-gray-400">Battery: CR2032</li>
                <li className="text-gray-400">Water Resistance: IP67</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6">
              <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4">
                <Radio className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Tracking Features</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Accuracy: ±5 meters</li>
                <li className="text-gray-400">Update: Every 1 minute</li>
                <li className="text-gray-400">Range: Up to 1km open area</li>
                <li className="text-gray-400">30-day history storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6">
              <div className="p-3 bg-pink-500/20 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Security</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">End-to-end encryption</li>
                <li className="text-gray-400">Tamper detection</li>
                <li className="text-gray-400">Real-time alerts</li>
                <li className="text-gray-400">Emergency SOS feature</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Products;