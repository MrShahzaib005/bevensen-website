import { motion } from 'motion/react';
import { Heart, Users, Award, Target } from 'lucide-react';
import { Card } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export default function About() {
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Passion',
      description: 'We pour our heart into every dish we create'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Family',
      description: 'A family business built on trust and togetherness'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Quality',
      description: 'Only the finest ingredients make it to your plate'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Community',
      description: 'Serving our local community with pride'
    }
  ];

  const team = [
    {
      name: 'Michael Schmidt',
      role: 'Founder & Head Chef',
      image: 'https://images.unsplash.com/photo-1593821915210-e0bac68f370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVhbSUyMHN0YWZmfGVufDF8fHx8MTc2MTE3NjYxOHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Sarah Schmidt',
      role: 'Co-Founder & Manager',
      image: 'https://images.unsplash.com/photo-1593821915210-e0bac68f370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVhbSUyMHN0YWZmfGVufDF8fHx8MTc2MTE3NjYxOHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Lucas Schmidt',
      role: 'Barista & Mixologist',
      image: 'https://images.unsplash.com/photo-1593821915210-e0bac68f370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVhbSUyMHN0YWZmfGVufDF8fHx8MTc2MTE3NjYxOHww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl sm:text-6xl mb-6">
              Our <span className="text-[#d4af37]">Story</span>
            </h1>
            <p className="text-xl text-[#f5f5dc]/60 max-w-3xl mx-auto">
              A family dream that became a reality at Bad Bevensen Bahnhof
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl mb-6">
                The <span className="text-[#d4af37]">Beginning</span>
              </h2>
              <div className="space-y-4 text-lg text-[#f5f5dc]/70">
                <p>
                  It all started with a simple dream: to bring quality food and warm hospitality
                  to the heart of Bad Bevensen. As a family, we've always believed that the best
                  meals are made with love, fresh ingredients, and a genuine care for the people
                  we serve.
                </p>
                <p>
                  When we discovered the perfect location at the Bahnhof, we knew it was meant to be.
                  A place where travelers, locals, and families could come together to enjoy
                  delicious burgers, artisan coffee, and craft cocktails in a modern yet cozy
                  atmosphere.
                </p>
                <p>
                  Every recipe, every ingredient, and every detail has been carefully chosen by our
                  family to ensure that your experience at Bevensen Bites is nothing short of
                  exceptional.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-2xl transform -rotate-3" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1593821915210-e0bac68f370e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwdGVhbSUyMHN0YWZmfGVufDF8fHx8MTc2MTE3NjYxOHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Our Team"
                className="relative rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl mb-4">
                Our <span className="text-[#d4af37]">Values</span>
              </h2>
              <p className="text-xl text-[#f5f5dc]/60">What we stand for every single day</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8 h-full hover:border-[#d4af37]/40 transition-all text-center">
                    <div className="h-14 w-14 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-full flex items-center justify-center text-black mx-auto mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl text-white mb-2">{value.title}</h3>
                    <p className="text-[#f5f5dc]/60">{value.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl mb-4">
                Meet the <span className="text-[#d4af37]">Family</span>
              </h2>
              <p className="text-xl text-[#f5f5dc]/60">The passionate team behind Bevensen Bites</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 overflow-hidden hover:border-[#d4af37]/40 transition-all">
                    <div className="relative h-80 overflow-hidden">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl text-white mb-1">{member.name}</h3>
                        <p className="text-[#d4af37]">{member.role}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-[#d4af37] via-[#f4d03f] to-[#d4af37]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl text-black mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-black/80">
              To create memorable dining experiences that bring people together, one delicious
              meal at a time. We're not just serving food – we're building a community hub where
              everyone feels welcome and every visit feels special.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
