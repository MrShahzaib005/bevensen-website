import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

export default function Location() {
  const hours = [
    { day: 'Monday - Friday', time: '7:00 AM - 10:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 11:00 PM' },
    { day: 'Sunday', time: '8:00 AM - 9:00 PM' }
  ];

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: 'Address',
      content: 'Bahnhofstraße 1, 29549 Bad Bevensen, Germany'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: 'Phone',
      content: '+49 5821 123456'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: 'Email',
      content: 'hello@bevensenbites.de'
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl mb-4">
            Visit <span className="text-[#d4af37]">Us</span>
          </h1>
          <p className="text-xl text-[#f5f5dc]/60">
            Find us at Bad Bevensen Bahnhof
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 overflow-hidden h-full">
              <div className="relative h-[400px] lg:h-full min-h-[400px]">
                {/* Google Maps Embed - Replace with actual coordinates */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2411.234567890123!2d10.588888888888889!3d53.07777777777778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDA0JzQwLjAiTiAxMMKwMzUnMjAuMCJF!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-2 border-[#d4af37]/10 rounded-lg" />
              </div>
            </Card>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Hours */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-black" />
                </div>
                <h2 className="text-2xl text-white">Opening Hours</h2>
              </div>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-[#d4af37]/10 last:border-0"
                  >
                    <span className="text-[#f5f5dc]/70">{schedule.day}</span>
                    <span className="text-[#d4af37]">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Info */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8">
              <h2 className="text-2xl text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-[#d4af37]/10 rounded-lg flex items-center justify-center text-[#d4af37] flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-[#f5f5dc]/60 text-sm mb-1">{info.title}</p>
                      <p className="text-white">{info.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Direction Button */}
            <Button
              onClick={() => window.open('https://maps.google.com/?q=Bad+Bevensen+Bahnhof', '_blank')}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-black py-6"
            >
              <Navigation className="h-5 w-5 mr-2" />
              Get Directions
            </Button>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8">
            <h2 className="text-2xl text-white mb-4">How to Find Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[#f5f5dc]/70">
              <div>
                <h3 className="text-[#d4af37] mb-2">By Train</h3>
                <p>
                  We're located right at Bad Bevensen Bahnhof. Exit the station and you'll find
                  us immediately to your left.
                </p>
              </div>
              <div>
                <h3 className="text-[#d4af37] mb-2">By Car</h3>
                <p>
                  Parking available at the train station parking lot. Free parking for the first
                  2 hours with any purchase.
                </p>
              </div>
              <div>
                <h3 className="text-[#d4af37] mb-2">By Bike</h3>
                <p>
                  Bike racks available right outside. Bad Bevensen has excellent cycling paths
                  throughout the city.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
