

import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Clock, Phone, Mail, Shield, Bell, Map, Activity } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold tracking-wider">
              <span className="text-[#FF69B4]">TRACK</span>1T
            </h2>
            <p className="text-[#4A5568] mt-4 text-lg">
              Ensuring safety with real-time tracking & smart alerts.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-[#4A5568]">
                <MapPin className="w-5 h-5 text-[#FF69B4]" />
                <p>123 Security Ave, Tech City</p>
              </div>
              <div className="flex items-center gap-3 text-[#4A5568]">
                <Clock className="w-5 h-5 text-[#FF69B4]" />
                <p>24/7 Support Available</p>
              </div>
              <div className="flex items-center gap-3 text-[#4A5568]">
                <Phone className="w-5 h-5 text-[#FF69B4]" />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3 text-[#4A5568]">
                <Mail className="w-5 h-5 text-[#FF69B4]" />
                <p>support@track1t.com</p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-medium mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-4">
              <a href="/about" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                About Us
              </a>
              <a href="/features" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Features
              </a>
              <a href="/contact" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Contact 
              </a>
              <a href="/privacy" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/careers" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Careers
              </a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-medium mb-6">Resources</h3>
            <div className="grid grid-cols-1 gap-4">
              <a href="/blog" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Blog
              </a>
              <a href="/documentation" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Documentation
              </a>
              <a href="/support" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Support Center
              </a>
              <a href="/faq" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                FAQ
              </a>
              <a href="/partners" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Partners
              </a>
              <a href="/security" className="text-[#4A5568] hover:text-[#FF69B4] transition-colors duration-300">
                Security
              </a>
            </div>
          </div>

          {/* Column 4: Social & Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-white text-xl font-medium mb-6">Stay Connected</h3>
            <p className="text-[#4A5568] mb-4">Follow us on social media for updates and news</p>
            <div className="flex gap-3 mb-8">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#111111] p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors duration-300"
              >
                <Facebook className="w-5 h-5 text-[#4A5568] hover:text-[#FF69B4]" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#111111] p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors duration-300"
              >
                <Twitter className="w-5 h-5 text-[#4A5568] hover:text-[#FF69B4]" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#111111] p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors duration-300"
              >
                <Instagram className="w-5 h-5 text-[#4A5568] hover:text-[#FF69B4]" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#111111] p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5 text-[#4A5568] hover:text-[#FF69B4]" />
              </a>
            </div>
            <h4 className="text-white font-medium mb-4">Subscribe to Newsletter</h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <form action="https://formsubmit.co/familytrack1t@gmail.com" method="POST">
                <input 
                  type="email" 
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="bg-[#111111] text-[#4A5568] px-4 py-2 rounded-lg flex-grow focus:outline-none focus:ring-2 focus:ring-[#FF69B4]"
                />
                <button 
                  type="submit" 
                  className="bg-[#FF69B4] text-white px-4 py-2 rounded-lg hover:bg-[#FF69B4]/90 transition-colors duration-300 mt-2 sm:mt-0"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#4A5568]">
          <p>© {new Date().getFullYear()} TRACK1T. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-[#FF69B4] transition-colors duration-300">Terms</a>
            <a href="/privacy" className="hover:text-[#FF69B4] transition-colors duration-300">Privacy</a>
            <a href="/cookies" className="hover:text-[#FF69B4] transition-colors duration-300">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
