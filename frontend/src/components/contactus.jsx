import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, HelpCircle, Map } from "lucide-react";

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
            Have questions about TRACK1T? We're here to help. Send us a message
            and we'll respond as soon as possible.
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
                    <p className="text-gray-400">familytrack1t@gmail.com</p>
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
                    <p className="text-gray-400">
                      RMK College of Engineering and Technology
                    </p>
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

            {/* FAQ Section */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <HelpCircle className="w-6 h-6 text-pink-500" />
                  </div>
                  <h2 className="text-white font-semibold text-xl">FAQs</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold">
                      How do I reset my password?
                    </h3>
                    <p className="text-gray-400">
                      You can reset your password by clicking on the "Forgot
                      Password" link on the login page.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Can I change my email address?
                    </h3>
                    <p className="text-gray-400">
                      Yes, you can update your email address in the account
                      settings section.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">
                      Is my data secure?
                    </h3>
                    <p className="text-gray-400">
                      Absolutely! We use SHA-256 encryption to ensure your data
                      is secure.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form and Map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Form */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <form
                  className="space-y-6"
                  action="https://formsubmit.co/familytrack1t@gmail.com"
                  method="POST"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2" htmlFor="name">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white mb-2" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors"
                        placeholder="your@email.com"
                        required
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
                      name="subject"
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
                      name="message"
                      rows="6"
                      className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-pink-500 transition-colors resize-none"
                      placeholder="Your message..."
                      required
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

            {/* Map Integration */}
            <Card className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Map className="w-6 h-6 text-pink-500" />
                  </div>
                  <h2 className="text-white font-semibold text-xl">
                    Our Location
                  </h2>
                </div>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1944.2053762204797!2d80.1513484!3d13.3220401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526173bfc3f0ed%3A0x0!2zMTPCsDE5JzE5LjMiTiA4MMKwMDknMDUuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full rounded-lg"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
