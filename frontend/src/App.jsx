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
      <Menubar className="sticky top-0 w-full max-w-7xl h-auto min-h-16 px-4 md:px-6 py-3 shadow-lg z-50 bg-white flex flex-wrap items-center justify-between">
        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Navigation */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-center gap-4 mt-4 md:mt-0 ${isOpen ? 'order-last' : ''}`}>
          <NavigationMenu className="w-full md:w-auto">
            <NavigationMenuList className="flex-col md:flex-row">
              <NavigationMenuItem className="w-full md:w-auto">
                <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="w-full md:w-auto">
            <NavigationMenuList className="flex-col md:flex-row">
              <NavigationMenuItem className="w-full md:w-auto">
                <NavigationMenuTrigger>Item Two</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <MenubarMenu className="w-full md:w-auto">
            <MenubarTrigger className="w-full md:w-auto">How To</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu className="w-full md:w-auto">
            <MenubarTrigger className="w-full md:w-auto">Products</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <MenubarMenu className="w-full md:w-auto">
            <MenubarTrigger className="w-full md:w-auto">About Us</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </div>

        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Menubar>
    </>
  );
}

export default App;