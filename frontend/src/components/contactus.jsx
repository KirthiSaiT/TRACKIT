import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="w-full bg-black/50 min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Get in <span className="text-pink-500">Touch</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about TRACK1T? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email Us</h3>
                    <p className="text-gray-400">support@track1t.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Call Us</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <MapPin className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-400">123 Safety Street, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Clock className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Hours</h3>
                    <p className="text-gray-400">24/7 Support Available</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;