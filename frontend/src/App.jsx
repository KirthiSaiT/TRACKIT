import React, { useState } from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./components/ui/menubar.jsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-black text-white min-h-screen relative">
        {/* Navbar */}
        <Menubar className="sticky top-0 w-full max-w-7xl h-12 md:h-16 px-2 md:px-6 py-2 md:py-3 shadow-lg z-50 bg-black text-white border border-black">
        <Avatar className="h-6 w-6 md:h-8 md:w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          <div className="flex items-center justify-between px-4 py-2">
            <div className="text-lg font-semibold">TRACK1T</div>
          </div>
          <div className="flex items-center justify-between w-full">
            

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="hidden md:flex flex-row items-center gap-4 flex-1 justify-end">
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
          </div>
        </Menubar>
        <div>
          <h1>hi</h1>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`
            absolute top-12 left-0 w-full bg-black shadow-lg md:hidden 
            transition-all duration-300 ease-in-out 
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
          `}
        >
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
      </div>
    </>
  );
}

export default App;
