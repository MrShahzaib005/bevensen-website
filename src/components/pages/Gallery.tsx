import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Dialog, DialogContent } from '../ui/dialoge';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjExMzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Signature Burgers',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1752006335516-44a0302035de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraW9zayUyMGNhZmV8ZW58MXx8fHwxNzYxMjMyOTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Modern Kiosk Design',
      category: 'Venue'
    },
    {
      src: 'https://images.unsplash.com/photo-1614285344553-fbb89a8e68ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGNvY2t0YWlscyUyMGJhcnxlbnwxfHx8fDE3NjExNzcxODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Craft Cocktails',
      category: 'Drinks'
    },
    {
      src: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NjExODEzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Fresh Salads',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1596253420615-f54837f5141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY29mZmVlfGVufDF8fHx8MTc2MTIzMjk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Artisan Coffee',
      category: 'Drinks'
    },
    {
      src: 'https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzYxMTYyNjIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Interior Design',
      category: 'Venue'
    },
    {
      src: 'https://images.unsplash.com/photo-1659851904977-99ea7cf27b16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjBraXRjaGVufGVufDF8fHx8MTc2MTIzMzA5OHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Kitchen Preparation',
      category: 'Behind the Scenes'
    },
    {
      src: 'https://images.unsplash.com/photo-1566672695417-4e3aadb29ce5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwb3V0ZG9vciUyMHNlYXRpbmd8ZW58MXx8fHwxNzYxMjMzMDk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Outdoor Seating',
      category: 'Venue'
    },
    {
      src: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Golden Fries',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjEyMjM4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Delicious Desserts',
      category: 'Food'
    },
    {
      src: 'https://images.unsplash.com/photo-1649361562904-316e772cf80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGp1aWNlJTIwZHJpbmtzfGVufDF8fHx8MTc2MTE2ODY0NXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Fresh Juices',
      category: 'Drinks'
    },
    {
      src: 'https://images.unsplash.com/photo-1593821915210-e0bac68f370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVhbSUyMHN0YWZmfGVufDF8fHx8MTc2MTE3NjYxOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Our Team',
      category: 'Behind the Scenes'
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
            Our <span className="text-[#d4af37]">Gallery</span>
          </h1>
          <p className="text-xl text-[#f5f5dc]/60">
            A visual journey through Bevensen Bites
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer relative overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="relative aspect-square overflow-hidden">
                <ImageWithFallback
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ZoomIn className="h-8 w-8 text-[#d4af37]" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#d4af37] text-sm mb-1">{image.category}</p>
                    <h3 className="text-white text-xl">{image.title}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl w-full p-0 bg-black border-[#d4af37]/20">
            <div className="relative">
              {selectedImage && (
                <ImageWithFallback
                  src={selectedImage}
                  alt="Gallery Image"
                  className="w-full h-auto max-h-[90vh] object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
