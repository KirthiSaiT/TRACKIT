import React, { useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from './components/ui/menubar.jsx';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button.jsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx"
import {  Twitter, LinkedinIcon, LightbulbIcon, CheckIcon } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Menubar className="sticky top-0 w-full h-16 px-4 md:px-8 shadow-lg z-50 bg-black text-white border-b border-gray-800 flex items-center">
        {/* Left Section: Avatar and Logo */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold">TRACK1T</div>
        </div>

        {/* Right Section */}
        <div className="flex-grow flex justify-end items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <MenubarMenu>
              <MenubarTrigger>How To</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Products</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>About Us</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarItem>Print</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Menubar>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-black border-t border-gray-800 md:hidden">
          <div className="flex flex-col p-4 space-y-4">
            <button className="text-sm font-medium hover:bg-gray-800 p-2 rounded-md text-left transition-colors">
              Item One
            </button>
            <button className="text-sm font-medium hover:bg-gray-800 p-2 rounded-md text-left transition-colors">
              Item Two
            </button>
            <button className="text-sm font-medium hover:bg-gray-800 p-2 rounded-md text-left transition-colors">
              How To
            </button>
            <button className="text-sm font-medium hover:bg-gray-800 p-2 rounded-md text-left transition-colors">
              Products
            </button>
            <button className="text-sm font-medium hover:bg-gray-800 p-2 rounded-md text-left transition-colors">
              About Us
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className=" flex-grow p-8 bg-black">
        <div className="relative top-32 right-80 max-w-2xl h-72 mx-auto text-center">
          <h1 className="border- text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-pink-500">Simplify Safety</span>{' '}
            <span className="text-white">And</span>{' '}
            <br className="md:hidden" />
            <span className="text-white">Security </span>{' '}
            <span className="text-white">- </span>{''}
            <span className="text-cyan-400">TRACK1T</span>{' '}
            {/* <span className="text-white">Track1T</span> */}
          </h1>
          <p className="text-gray-400 mb-8 text-lg">
          Track Together, Stay Safer with Track1T
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm font-medium">
              Get Started
            </button>
            {/* <button  className="px-6 py-3 bg-transparent border border-gray-800 text-white rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium">
              <Github className="w-5 h-5" />
              Github Repository
            </button> */}
          </div>
        </div>
        
      </div>
      
      <div className="relative border border-red-800 w-96 space-y-4 max-w-sm ml-auto">
      {/* Venkat Card */}
      <Card className=" relative bg-zinc-900/50 border-zinc-800 p-4 w-72 bottom-80 right-72">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/api/placeholder/40/40" alt="John Doe" className="rounded-full" />
          </Avatar>
          <div>
            <h3 className="text-white font-semibold">Venkat Raghav</h3>
            <p className="text-gray-400 text-sm">@Venkat_raghav</p>
          </div>
        </div>
        <p className="relative  text-white mt-3">This landig page is awesome!</p>
      </Card>

      {/* Leo Miranda Card */}
      <Card className="relative bottom-96 bg-zinc-900/50 border-zinc-800 w-80  left-8 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src="/api/placeholder/40/40" alt="Leo Miranda" className="rounded-full" />
          </Avatar>
          <div>
            <h3 className="text-white font-semibold">Leo Miranda</h3>
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
      </Card>

      {/* Pricing Card */}
      <Card className="relative bottom-96 right-72 w-72  bg-zinc-900/50 border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-xl font-semibold">Free</h3>
          <span className="px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm">Most popular</span>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold text-white">$0</span>
          <span className="text-gray-400">/month</span>
        </div>
        <p className="text-gray-400 mb-6">
          Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
        </p>
        <button className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors mb-6">
          Start Free Trial
        </button>
        <div className="space-y-3">
          {['4 Team member', '4 GB Storage', 'Upto 6 pages'].map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Light & Dark Mode Card */}
      <Card className="relative bottom-96 bg-zinc-900/50 border-zinc-800 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <LightbulbIcon className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-white text-lg font-semibold">Light & dark mode</h3>
        </div>
        <p className="text-gray-400">
          Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur natasum.
        </p>
      </Card>
    </div>
    </div>
  );
}

export default App;