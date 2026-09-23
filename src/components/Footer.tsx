import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, Clock, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Menu', page: 'menu' },
    { label: 'About Us', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Location', page: 'location' },
    { label: 'Contact', page: 'contact' },
    { label: 'Loyalty', page: 'loyalty' }
  ];

  return (
    <footer className="bg-black border-t border-[#d4af37]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-4"
            >
              <div className="text-2xl tracking-wider">
                <span className="text-[#d4af37]">BEVENSEN</span>
                <span className="text-white"> BITES</span>
              </div>
            </motion.div>
            <p className="text-[#f5f5dc]/60 mb-4">
              Fresh taste. Local vibes. Every day at the Bahnhof.
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://instagram.com', '_blank')}
                className="h-10 w-10 bg-[#d4af37]/10 hover:bg-[#d4af37] rounded-lg flex items-center justify-center text-[#d4af37] hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://facebook.com', '_blank')}
                className="h-10 w-10 bg-[#d4af37]/10 hover:bg-[#d4af37] rounded-lg flex items-center justify-center text-[#d4af37] hover:text-black transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => onNavigate(link.page)}
                    className="text-[#f5f5dc]/60 hover:text-[#d4af37] transition-colors"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[#f5f5dc]/60">
                <MapPin className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                <span>Bahnhofstraße 1<br />29549 Bad Bevensen</span>
              </li>
              <li className="flex items-center gap-2 text-[#f5f5dc]/60">
                <Phone className="h-5 w-5 text-[#d4af37]" />
                <a href="tel:+495821123456" className="hover:text-[#d4af37] transition-colors">
                  +49 5821 123456
                </a>
              </li>
              <li className="flex items-center gap-2 text-[#f5f5dc]/60">
                <Mail className="h-5 w-5 text-[#d4af37]" />
                <a href="mailto:hello@bevensenbites.de" className="hover:text-[#d4af37] transition-colors">
                  hello@bevensenbites.de
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white text-lg mb-4">Hours</h3>
            <ul className="space-y-2 text-[#f5f5dc]/60">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#d4af37]" />
                <span>Mon-Fri: 7:00 - 22:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#d4af37]" />
                <span>Saturday: 8:00 - 23:00</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#d4af37]" />
                <span>Sunday: 8:00 - 21:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#d4af37]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#f5f5dc]/40 text-sm">
            <p>
              © {currentYear} Bevensen Bites. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-[#d4af37] fill-current" /> in Bad Bevensen
            </p>
            <div className="flex gap-4">
              <button className="hover:text-[#d4af37] transition-colors">Privacy Policy</button>
              <button className="hover:text-[#d4af37] transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
