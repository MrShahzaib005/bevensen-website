import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { useCart } from '../CartContext';
import { toast } from 'sonner';

// 👇 1. STATIC DATA (Replaces the broken database connection)
const MENU_ITEMS = [
  {
    id: '1',
    name: 'Truffle Royal Burger',
    description: 'Wagyu beef patty, black truffle mayo, caramelized onions, 24k gold leaf on a brioche bun.',
    price: 24.00,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: '2',
    name: 'Gold Dust Fries',
    description: 'Crispy french fries dusted with edible gold flakes and parmesan.',
    price: 12.00,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496987-aeb8d547b796?auto=format&fit=crop&w=800&q=80',
    popular: false
  },
  {
    id: '3',
    name: 'Saffron Milkshake',
    description: 'Vanilla bean ice cream blended with premium saffron and crushed pistachios.',
    price: 15.00,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: '4',
    name: 'Lobster Mac & Cheese',
    description: 'Maine lobster tail with three-cheese macaroni and truffle oil.',
    price: 28.00,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1555982105-d25af4182e4e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: '5',
    name: '24k Gold Steaks',
    description: 'Premium ribeye steak wrapped in edible gold.',
    price: 85.00,
    category: 'burgers', // Categorized as main/burger for simplicity
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: '6',
    name: 'Velvet Chocolate Cake',
    description: 'Dark chocolate ganache with raspberry coulis.',
    price: 14.00,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    popular: false
  }
];

export default function Menu() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState('all');

  // 👇 2. NO FETCHING. We just filter the static list.
  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gradient-to-b from-black to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl mb-4 font-bold text-white">
            Our <span className="text-[#d4af37]">Menu</span>
          </h1>
          <p className="text-xl text-[#f5f5dc]/60">Fresh, delicious, and made with love</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-12 flex justify-center">
          <Tabs defaultValue="all" className="w-full max-w-3xl" onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-[#1a1a1a] border border-[#d4af37]/20 p-1 h-auto rounded-xl">
              {['all', 'burgers', 'sides', 'drinks', 'desserts'].map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat} 
                  className="capitalize data-[state=active]:bg-[#d4af37] data-[state=active]:text-black transition-all"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="h-full"
              >
                <Card className="bg-[#1a1a1a] border-[#d4af37]/20 overflow-hidden group hover:border-[#d4af37] transition-all duration-300 h-full flex flex-col shadow-lg">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {item.popular && (
                        <Badge className="bg-[#d4af37] text-black hover:bg-[#c4a030] font-bold shadow-md">
                          <Star className="h-3 w-3 mr-1 fill-black" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{item.name}</h3>
                      <span className="text-xl font-bold text-[#d4af37]">€{item.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-2">
                      {item.description}
                    </p>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-[#d4af37] text-black hover:bg-[#f4d03f] font-bold transition-all transform active:scale-95"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-[#f5f5dc]/40">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}