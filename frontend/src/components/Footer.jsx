import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black/50 text-gray-300 py-16 px-4 md:px-8 border-t border-zinc-800">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white">
              <span className="text-pink-500">TRACK</span>1T
            </h2>
            <p className="text-gray-400 mt-2">
              Ensuring safety with real-time tracking & smart alerts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-semibold text-lg">Quick Links</h3>
            <a href="/about" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
              About Us
            </a>
            <a href="/features" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
              Features
            </a>
            <a href="/contact" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
              Contact
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors duration-200">
              Privacy Policy
            </a>
          </div>

          {/* Social Media */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-zinc-900/50 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5 text-gray-400 hover:text-pink-500" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/50 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-pink-500" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/50 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-zinc-900/50 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-pink-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} TRACK1T. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;