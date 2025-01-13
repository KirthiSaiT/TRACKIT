import React, { useState } from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Github,
  Menu,
  X,
  Twitter,
  LinkedinIcon,
  LightbulbIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen w-[1263px] h-[585px] relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(16,_185,_129,_0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(16,_185,_129,_0.15),transparent_50%)] bg-black">
      {/* Navbar */}
      <Menubar className="sticky top-0 w-full h-16 px-4 md:px-8 shadow-lg z-50 bg-black text-white border-b border-gray-800 flex items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold">TRACK1T</div>
        </div>

        <div className="flex-grow flex justify-end items-center">
          <div className="hidden md:flex items-center space-x-6">
            {["Item One", "Item Two", "How To", "Products", "About Us"].map(
              (item) => (
                <MenubarMenu key={item}>
                  <MenubarTrigger className="text-gray-300">{item}</MenubarTrigger>
                </MenubarMenu>
              )
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Menubar>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-90">
          <div className="flex flex-col items-center pt-20 space-y-6">
            {["Item One", "Item Two", "How To", "Products", "About Us"].map(
              (item) => (
                <button key={item} className="text-white text-lg">
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex px-8 py-16">
        {/* Left Section */}
        <div className="w-1/2 pt-8">
          <h1 className="text-5xl font-bold mb-4 text-white">
            <span className="text-pink-500">TRACK1T</span> landing page
            <br />
            for <span className="text-cyan-400">React</span> developers
          </h1>
          <p className="text-white mb-8 text-lg">
            Build your React landing page effortlessly
          </p>
          <div className="flex gap-4">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8">
              Get Started
            </Button>
          </div>
        </div>

        {/* Right Section - Cards */}
        <div className="relative w-1/2">
          {/* John Doe Card */}
          <Card className="relative bottom-12 right-12 bg-zinc-900/50 border-zinc-800 w-80 rounded-xl backdrop-blur-sm">
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

          {/* Pricing Card */}
          <Card className="relative bottom-7 left-4 bg-zinc-900/50 border-zinc-800 w-64 h-80 rounded-xl backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-xl font-semibold">Free</h3>
                <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">
                  Most popular
                </span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-white">$0</span>
                <span className="text-gray-400">/month</span>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600 mb-6">
                Start Free Trial
              </Button>
              <div className="space-y-3">
                {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
                  (feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-green-500" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Developer Card */}
          <Card className="absolute bottom-52 right-10 bg-zinc-900/50 border-zinc-800 w-64 rounded-xl backdrop-blur-sm">
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
                I really enjoy transforming ideas into functional software that
                exceeds expectations
              </p>
              <div className="flex gap-4">
                <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
