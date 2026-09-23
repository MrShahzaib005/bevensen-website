import { motion } from 'motion/react';
import { Menu, X, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export default function Navigation({ currentPage, onNavigate, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'about', label: 'About Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Location' },
    { id: 'cart', label: 'Cart' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-[#d4af37]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="text-2xl tracking-wider">
              <span className="text-[#d4af37]">BEVENSEN</span>
              <span className="text-white"> BITES</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-[#d4af37] text-black'
                    : 'text-[#f5f5dc] hover:text-[#d4af37]'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('loyalty')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                currentPage === 'loyalty'
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black'
                  : 'bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 text-[#d4af37] hover:from-[#d4af37]/30 hover:to-[#f4d03f]/30'
              }`}
            >
              <Crown className="h-4 w-4" />
              Loyalty
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-[#d4af37]">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-[#d4af37]/20 w-[280px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`px-4 py-3 rounded-lg text-left transition-all ${
                      currentPage === item.id
                        ? 'bg-[#d4af37] text-black'
                        : 'text-[#f5f5dc] hover:bg-[#d4af37]/10'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onNavigate('loyalty');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg text-left transition-all flex items-center gap-2 ${
                    currentPage === 'loyalty'
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black'
                      : 'bg-gradient-to-r from-[#d4af37]/20 to-[#f4d03f]/20 text-[#d4af37]'
                  }`}
                >
                  <Crown className="h-4 w-4" />
                  Loyalty Program
                </motion.button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
