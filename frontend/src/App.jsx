import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Github, 
  Menu, 
  X, 
  Twitter, 
  LinkedinIcon, 
  LightbulbIcon, 
  CheckIcon,
  MapPin,
  Users,
  Clock,
  Shield,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Icon className="w-6 h-6 text-green-500" />
        </div>
        <div>
          <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ItemOne = () => <div className="p-8 text-white">Item One Content</div>;
const ItemTwo = () => <div className="p-8 text-white">Item Two Content</div>;
const HowTo = () => <div className="p-8 text-white">How To Content</div>;
const Products = () => <div className="p-8 text-white">Products Content</div>;
const AboutUs = () => <div className="p-8 text-white">About Us Content</div>;

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Monitor location updates instantly with high accuracy and minimal battery consumption"
    },
    {
      icon: Users,
      title: "Room-Based Sharing",
      description: "Create private rooms and invite specific users to share locations within closed groups"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous tracking with historical data and movement patterns"
    },
    {
      icon: Shield,
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

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(16,_185,_129,_0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(16,_185,_129,_0.15),transparent_50%)] bg-black">
        <Menubar className="sticky top-0 w-full h-16 px-4 md:px-8 shadow-lg z-50 bg-black text-white border-b border-gray-800 flex items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Link to="/" className="text-lg font-semibold">TRACK1T</Link>
          </div>

          <div className="flex-grow flex justify-end items-center">
            <div className="hidden md:flex items-center space-x-6">
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300">
                  <Link to="/item-one">Item One</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300">
                  <Link to="/item-two">Item Two</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300">
                  <Link to="/how-to">How To</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300">
                  <Link to="/products">Products</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300">
                  <Link to="/about">About Us</Link>
                </MenubarTrigger>
              </MenubarMenu>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Menubar>

        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-90">
            <div className="flex flex-col items-center pt-20 space-y-6">
              <Link to="/item-one" className="text-white text-lg" onClick={() => setIsOpen(false)}>Item One</Link>
              <Link to="/item-two" className="text-white text-lg" onClick={() => setIsOpen(false)}>Item Two</Link>
              <Link to="/how-to" className="text-white text-lg" onClick={() => setIsOpen(false)}>How To</Link>
              <Link to="/products" className="text-white text-lg" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/about" className="text-white text-lg" onClick={() => setIsOpen(false)}>About Us</Link>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={
            <>
              <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 md:py-16">
                <div className="w-full md:w-1/2 pt-4 md:pt-8">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                    <span className="text-pink-500">TRACK1T</span> Redefining<br />
                    Safety <span className="text-cyan-400">With</span> Real-Time
                  </h1>
                  <p className="text-white mb-6 md:mb-8 text-base md:text-lg">
                    Track your Safety with us 
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8">
                      Get Started
                    </Button>
                  </div>
                </div>

                <div className="relative w-full md:w-1/2 mt-12 md:mt-0">
                  <Card className="relative md:bottom-12 md:right-12 bg-zinc-900/50 border-zinc-800 w-full md:w-80 rounded-xl backdrop-blur-sm mb-4 md:mb-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="./src/assets/vemkat raghavan.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-semibold">John Doe React</h3>
                          <p className="text-gray-400 text-sm">@john_doe</p>
                        </div>
                      </div>
                      <p className="text-white mt-3">This landing page is awesome!</p>
                    </CardContent>
                  </Card>

                  <Card className="relative md:bottom-7 md:left-4 bg-zinc-900/50 border-zinc-800 w-full md:w-64 h-auto md:h-80 rounded-xl backdrop-blur-sm mb-4 md:mb-0">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-xl font-semibold">Free</h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">Most popular</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-white">$0</span>
                        <span className="text-gray-400">/month</span>
                      </div>
                      <Button className="w-full bg-green-500 hover:bg-green-600 mb-6">
                        Start Free Trial
                      </Button>
                      <div className="space-y-3">
                        {['4 Team member', '4 GB Storage', 'Upto 6 pages'].map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckIcon className="w-5 h-5 text-green-500" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="relative md:absolute md:bottom-52 md:right-10 bg-zinc-900/50 border-zinc-800 w-full md:w-64 rounded-xl backdrop-blur-sm mb-4 md:mb-0">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="./src/assets/vemkat raghavan.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-semibold">Sudesh Govindh</h3>
                          <p className="text-green-500 text-sm">Frontend Developer</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4">
                        I really enjoy transforming ideas into functional software that exceeds expectations
                      </p>
                      <div className="flex gap-4">
                        <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                        <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="relative md:absolute md:bottom-8 md:right-2 bg-zinc-900/50 border-zinc-800 w-full md:w-72 rounded-xl backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <LightbulbIcon className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-white text-lg font-semibold">Light & dark mode</h3>
                      </div>
                      <p className="text-gray-400">
                        Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur natasum.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="w-full py-16 px-4 md:px-8 border-t border-gray-800">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Why Choose <span className="text-pink-500">TRACK1T</span>
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
                    Advanced location tracking features designed for teams and organizations
                    that need reliable, real-time monitoring solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>
              </div>
            </>
          } />
          <Route path="/item-one" element={<ItemOne />} />
          <Route path="/item-two" element={<ItemTwo />} />
          <Route path="/how-to" element={<HowTo />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;