import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, MapPin, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Premium Quality',
      description: 'Fresh ingredients, locally sourced'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Quick Service',
      description: 'Fast preparation, no compromise'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Perfect Location',
      description: 'Right at Bad Bevensen Bahnhof'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Family Business',
      description: 'Passionate about every bite'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjExMzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Bevensen Bites"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, type: 'spring' }}
              className="mb-6"
            >
              <div className="inline-block px-6 py-2 bg-[#d4af37]/20 border border-[#d4af37] rounded-full backdrop-blur-sm mb-6">
                <span className="text-[#d4af37]">Est. 2025 • Bad Bevensen Bahnhof</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 tracking-tight"
            >
              <span className="text-white">Fresh Taste.</span>
              <br />
              <span className="text-[#d4af37]">Local Vibes.</span>
              <br />
              <span className="text-[#f5f5dc]">Every Day.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-[#f5f5dc]/80 mb-12 max-w-3xl mx-auto"
            >
              Experience the perfect blend of gourmet burgers, artisan coffee, and craft cocktails
              at Bad Bevensen's newest hotspot.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => onNavigate('menu')}
                className="bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-black px-8 py-6 rounded-full group"
              >
                View Menu
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => onNavigate('contact')}
                variant="outline"
                className="border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-8 py-6 rounded-full"
              >
                Order Now
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#d4af37] rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl mb-4">
              Why Choose <span className="text-[#d4af37]">Bevensen Bites</span>?
            </h2>
            <p className="text-xl text-[#f5f5dc]/60">Excellence in every detail</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8 h-full hover:border-[#d4af37]/40 transition-all">
                  <div className="h-12 w-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center text-black mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl text-white mb-2">{feature.title}</h3>
                  <p className="text-[#f5f5dc]/60">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-2xl transform rotate-3" />
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1752006335516-44a0302035de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraW9zayUyMGNhZmV8ZW58MXx8fHwxNzYxMjMyOTY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Bevensen Bites Kiosk"
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl mb-6">
                Your <span className="text-[#d4af37]">Local Hotspot</span> at the Bahnhof
              </h2>
              <p className="text-xl text-[#f5f5dc]/70 mb-6">
                Bevensen Bites is more than just a kiosk – it's where the community meets,
                where travelers refuel, and where every meal is crafted with passion.
              </p>
              <p className="text-lg text-[#f5f5dc]/60 mb-8">
                From early morning coffee to late-night snacks, we're here to serve you
                with premium quality and warm hospitality. Located right at Bad Bevensen
                Bahnhof, we're your perfect stop for delicious food and drinks.
              </p>
              <Button
                onClick={() => onNavigate('about')}
                className="bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black px-8 py-6 rounded-full"
              >
                Our Story
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#d4af37] via-[#f4d03f] to-[#d4af37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl text-black mb-6">
              Ready to Experience the Best?
            </h2>
            <p className="text-xl text-black/80 mb-8">
              Visit us today or place your order for pickup. Fresh taste guaranteed!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => onNavigate('location')}
                className="bg-black text-[#d4af37] hover:bg-black/90 px-8 py-6 rounded-full"
              >
                Find Us
              </Button>
              <Button
                onClick={() => onNavigate('menu')}
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-[#d4af37] px-8 py-6 rounded-full"
              >
                Explore Menu
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
