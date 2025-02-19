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
  Settings,
  LogIn
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Rooms from './components/page.jsx';
import StatisticsAndSolutions from './components/StatisticsAndSolutions';
import Maps from './components/maps.jsx';
import GlobalSecurity from './components/GlobalSecurity';
import FirebaseAuth from './components/login.jsx';
import Login from './components/login.jsx';
import Footer from './components/footer.jsx';
import ContactUs from './components/contactus.jsx';
import HowTo from './components/howto.jsx';
import Products from './components/products.jsx';
import Sos from './components/sos.jsx';

// Placeholder components
const ItemOne = () => <div>Item One Content</div>;
const ItemTwo = () => <div>Item Two Content</div>;
const HowIs = () => <div>How To Content</div>;
const Pro = () => <div>Products Content</div>;
const AboutUs = () => <div>About Us Content</div>;

const FeatureCard = ({ icon: Icon, title, description }) => (
  <Card className="bg-zinc-900/50 border-zinc-800 rounded-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-green-500/20 rounded-lg">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
        </div>
        <h3 className="text-white text-base sm:text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
    </CardContent>
  </Card>
);

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const features = [
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Monitor location updates instantly with high accuracy and minimal battery consumption",
    },
    {
      icon: Users,
      title: "Room-Based Sharing",
      description: "Create private rooms and invite specific users to share locations within closed groups",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous tracking with historical data and movement patterns",
    },
    {
      icon: Shield,
      title: "Privacy Controls",
      description: "Granular permissions and the ability to pause sharing at any time",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts for geofence entries/exits and important location updates",
    },
    {
      icon: Settings,
      title: "Admin Dashboard",
      description: "Comprehensive controls for room management and user permissions",
    },
  ];

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(16,_185,_129,_0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(16,_185,_129,_0.15),transparent_50%)] bg-black">
        <Menubar className="sticky top-0 w-full h-16 px-4 md:px-8 shadow-lg z-50 bg-black/95 text-white border-b border-gray-800 flex items-center backdrop-blur-sm">
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
                <MenubarTrigger className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/howto">How To</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/Rooms">Rooms</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/Products">Products</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/Contactus">Contact Us</Link>
                </MenubarTrigger>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-gray-300 hover:text-white transition-colors">
                  <Link to="/Login">Login</Link>
                </MenubarTrigger>
              </MenubarMenu>
            </div>

            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </Menubar>

        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm">
            <div className="flex flex-col items-center pt-20 space-y-6">
              <Link to="/howto" className="text-white text-lg hover:text-green-500 transition-colors" onClick={() => setIsOpen(false)}>How To</Link>
              <Link to="/Rooms" className="text-white text-lg hover:text-green-500 transition-colors" onClick={() => setIsOpen(false)}>Rooms</Link>
              <Link to="/Products" className="text-white text-lg hover:text-green-500 transition-colors" onClick={() => setIsOpen(false)}>Products</Link>
              <Link to="/Contactus" className="text-white text-lg hover:text-green-500 transition-colors" onClick={() => setIsOpen(false)}>Contact Us</Link>
              <Link to="/Login" className="text-white text-lg hover:text-green-500 transition-colors" onClick={() => setIsOpen(false)}>Login</Link>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/" element={
            <>
              <div className="flex flex-col md:flex-row px-4 md:px-8 py-8 md:py-16 gap-8 md:gap-0">
                <div className="w-full md:w-1/2 pt-4 md:pt-8">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
                    <span className="text-pink-500">TRACK1T</span> Redefining<br />
                    Safety <span className="text-cyan-400">With</span> Real-Time
                  </h1>
                  <p className="text-white mb-6 md:mb-8 text-base md:text-lg">
                    Track your Safety with us 
                  </p>
                  <div className="flex gap-4">
                    <Button className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 text-sm md:text-base">
                      Get Started
                    </Button>
                  </div>
                </div>

                <div className="relative w-full md:w-1/2 mt-12 md:mt-0 space-y-4 md:space-y-0">
                  <Card className="relative md:bottom-12 md:right-12 bg-zinc-900/50 border-zinc-800 w-full md:w-80 rounded-xl backdrop-blur-sm transition-transform hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="./src/assets/vemkat raghavan.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-semibold">Venkat Raghav</h3>
                          <p className="text-gray-400 text-sm">@Venkat_ragh</p>
                        </div>
                      </div>
                      <p className="text-white mt-3">It has completely changed how my family is tracked and stay connected</p>
                    </CardContent>
                  </Card>

                  <Card className="relative md:bottom-7 md:left-4 bg-zinc-900/50 border-zinc-800 w-full md:w-64 h-auto md:h-80 rounded-xl backdrop-blur-sm transition-transform hover:scale-105">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-lg sm:text-xl font-semibold">Track1t</h3>
                        <span className="px-2 sm:px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-xs sm:text-sm">Most popular</span>
                      </div>
                      <div className="mb-4">
                        <span className="text-2xl sm:text-3xl font-bold text-white">FREE </span>
                        <span className="text-gray-400">of cost</span>
                      </div>
                      <Button className="w-full bg-green-500 hover:bg-green-600 mb-6">
                        GET STARTED FOR FREE
                      </Button>
                      <div className="space-y-3">
                        {['Shared rooms', 'Auth based security', 'SOS Alerts'].map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                            <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="relative md:absolute md:bottom-64 md:right-10 bg-zinc-900/50 border-zinc-800 w-full md:w-64 rounded-xl backdrop-blur-sm transition-transform hover:scale-105">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="./src/assets/vemkat raghavan.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-white font-semibold">H4CK_077</h3>
                          <p className="text-green-500 text-xs sm:text-sm">RMKCET</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4 text-sm sm:text-base">
                        Track1t is a 24/7 tracking platform created by team H4CK_077 of RMKCET
                      </p>
                      <div className="flex gap-4">
                        <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="relative md:absolute md:bottom-8 md:right-2 bg-zinc-900/50 border-zinc-800 w-full md:w-72 rounded-xl backdrop-blur-sm transition-transform hover:scale-105">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <LightbulbIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                        </div>
                        <h3 className="text-white text-base sm:text-lg font-semibold">SHA 256 based encryption</h3>
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base">
                        The admin key and other security features are encrypted using SHA-256.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="w-full py-12 sm:py-16 px-4 md:px-8 border-t border-gray-800">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                    Why Choose <span className="text-pink-500">TRACK1T</span>
                  </h2>
                  <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
                  Advanced location tracking features designed for teams and organizations
                    that need reliable, real-time monitoring solutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
                  {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                </div>

                {/* <div className="mt-12 sm:mt-16">
                  <StatisticsAndSolutions />
                </div> */}

                <div className="mt-12 sm:mt-16">
                  <GlobalSecurity />
                </div>

                <div className="mt-12 sm:mt-16">
                  <Footer />
                </div>
              </div>
            </>
          } />

          <Route path="/howto" element={<HowTo />} />
          <Route path="/Rooms" element={<Rooms />} />
          <Route path="/Rooms/:RoomId" element={<Maps />} />
          <Route path="/Contactus" element={<ContactUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;