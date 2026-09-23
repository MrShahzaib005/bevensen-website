import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, CheckCircle2, ChefHat, Truck, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from './CartContext';
import { toast } from 'sonner';

// Tracking Steps Simulation
const TRACKING_STEPS = [
  { id: 1, title: "Order Confirmed", icon: CheckCircle2, delay: 0 },
  { id: 2, title: "Preparing", icon: ChefHat, delay: 3000 },
  { id: 3, title: "Quality Check", icon: CheckCircle2, delay: 6000 },
  { id: 4, title: "Out for Delivery", icon: Truck, delay: 9000 },
  { id: 5, title: "Delivered", icon: Clock, delay: 12000 }
];

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [view, setView] = useState<'cart' | 'tracking'>('cart');
  const [trackingStep, setTrackingStep] = useState(1);

  // Simulate Tracking Progress
  useEffect(() => {
    if (view === 'tracking' && trackingStep < 5) {
      const timer = setTimeout(() => {
        setTrackingStep(prev => prev + 1);
        if (trackingStep === 4) toast.success("Order Delivered!");
      }, 3000); // Advances every 3 seconds
      return () => clearTimeout(timer);
    }
  }, [view, trackingStep]);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setView('tracking');
    setTrackingStep(1);
    toast.success("Order Placed Successfully!");
  };

  if (view === 'tracking') {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-black text-white px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#d4af37] mb-4">Order #8821</h1>
            <p className="text-gray-400">Estimated Delivery: <span className="text-white font-mono">15-20 Mins</span></p>
          </motion.div>

          <div className="space-y-8 bg-[#1a1a1a] p-8 rounded-2xl border border-[#d4af37]/20">
            {TRACKING_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = trackingStep >= step.id;
              const isCurrent = trackingStep === step.id;

              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-4 ${isActive ? 'opacity-100' : 'opacity-30'}`}
                >
                  <div className={`
                    h-12 w-12 rounded-full flex items-center justify-center border-2 
                    ${isActive ? 'bg-[#d4af37] border-[#d4af37] text-black' : 'border-gray-600 bg-transparent'}
                    ${isCurrent ? 'animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.5)]' : ''}
                  `}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${isActive ? 'text-[#d4af37]' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                    {isCurrent && <p className="text-xs text-gray-400">In Progress...</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Button 
            onClick={() => {
              clearCart();
              setView('cart');
            }}
            className="mt-8 w-full bg-[#d4af37] text-black hover:bg-[#f4d03f] font-bold"
          >
            Start New Order
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-black text-white px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-8">Shopping <span className="text-[#d4af37]">Cart</span></h1>
          
          {items.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl">
              <p className="text-gray-500 text-xl">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  className="flex gap-6 p-4 bg-[#1a1a1a] rounded-xl border border-[#d4af37]/10"
                >
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">{item.name}</h3>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-400">
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-[#d4af37] text-lg font-bold">€{item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-3 bg-black/50 rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-[#d4af37]">
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-[#d4af37]">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#d4af37]/20 sticky top-32">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (10%)</span>
                <span>€{(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>€5.00</span>
              </div>
              <div className="h-px bg-gray-800 my-4" />
              <div className="flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span className="text-[#d4af37]">€{(totalPrice * 1.1 + 5).toFixed(2)}</span>
              </div>
            </div>

            <Button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full h-14 bg-[#d4af37] text-black hover:bg-[#f4d03f] font-bold text-lg"
            >
              Proceed to Checkout <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}