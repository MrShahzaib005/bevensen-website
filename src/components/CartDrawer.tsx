import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from './CartContext';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    setLoading(true);

    // 👇 SIMULATION: No real backend connection
    setTimeout(() => {
      setLoading(false);
      
      toast.success('Order placed successfully!', {
        description: "We are preparing your gold-standard meal.",
        duration: 3000,
      });
      
      clearCart();
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-l border-[#d4af37]/20 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#d4af37]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-white">Your Cart</h2>
                    <p className="text-sm text-[#f5f5dc]/60">{items.length} items</p>
                  </div>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-[#d4af37]/20 mb-4" />
                  <p className="text-xl text-[#f5f5dc]/40">Your cart is empty</p>
                  <p className="text-sm text-[#f5f5dc]/30 mt-2">Add some delicious items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 bg-black/40 rounded-xl border border-[#d4af37]/10 hover:border-[#d4af37]/20 transition-all"
                    >
                      {/* Image - Using standard img to avoid crashes */}
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border border-[#d4af37]/10">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white mb-1 truncate font-medium">{item.name}</h3>
                        <p className="text-[#d4af37]">€{item.price.toFixed(2)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <Button
                        onClick={() => removeItem(item.id)}
                        size="icon"
                        variant="ghost"
                        className="text-red-400 hover:text-red-500 hover:bg-red-500/10 flex-shrink-0 self-start"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#d4af37]/20 space-y-4 bg-black/40">
                {/* Total */}
                <div className="flex items-center justify-between text-xl font-bold">
                  <span className="text-white">Total:</span>
                  <span className="text-[#d4af37]">€{totalPrice.toFixed(2)}</span>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-black py-6 text-lg font-bold shadow-lg shadow-[#d4af37]/20"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Processing...
                      </div>
                    ) : (
                      'Checkout'
                    )}
                  </Button>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}