import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./components/CartContext";
import Navigation from "./components/Navigation";
import Home from "./components/pages/Home";
import Menu from "./components/pages/Menu";
import About from "./components/pages/About";
import Gallery from "./components/pages/Gallery";
import Location from "./components/pages/Location";
import Contact from "./components/pages/Contact";
import Loyalty from "./components/pages/Loyalty";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import CartDrawer from "./components/CartDrawer";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

import { AuthProvider } from "./components/AuthProvider";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // THE FIX: Do everything in one function. No useEffect needed.
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close menu instantly
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll instantly
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home onNavigate={handleNavigate} />;
      case "menu":
        return <Menu />;
      case "about":
        return <About />;
      case "gallery":
        return <Gallery />;
      case "location":
        return <Location />;
      case "contact":
        return <Contact />;
      case "loyalty":
        return <Loyalty />;
      case "cart":
        return <Cart />; // No props needed for this one
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      {/* NOTE: If CartProvider complains about 'onCartUpdate', 
         you might need to remove that prop depending on your CartContext implementation. 
      */}
      <CartProvider onCartUpdate={setCartItemCount}>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#1a1a1a",
              color: "#ffffff",
              border: "1px solid rgba(212, 175, 55, 0.2)",
            },
          }}
        />
        <div className="min-h-screen bg-[#0a0a0a] text-white">
          {/* Navigation */}
          <Navigation
            currentPage={currentPage}
            onNavigate={handleNavigate}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          {/* Floating Cart Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              onClick={() => setIsCartOpen(true)}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] shadow-2xl relative group"
            >
              <ShoppingCart className="h-6 w-6 text-black" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center bg-red-500 text-white border-2 border-black">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </motion.div>

          {/* Page Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>

          {/* Footer */}
          <Footer onNavigate={handleNavigate} />

          {/* Cart Drawer */}
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
