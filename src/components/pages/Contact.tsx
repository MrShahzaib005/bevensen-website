import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MessageCircle, Send, Instagram, Facebook, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.', {
      duration: 3000,
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Phone',
      content: '+49 5821 123456',
      action: 'Call Now',
      link: 'tel:+495821123456',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'WhatsApp',
      content: '+49 5821 123456',
      action: 'Message Us',
      link: 'https://wa.me/495821123456',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      content: 'hello@bevensenbites.de',
      action: 'Send Email',
      link: 'mailto:hello@bevensenbites.de',
      color: 'from-[#d4af37] to-[#f4d03f]'
    }
  ];

  const socialLinks = [
    {
      icon: <Instagram className="h-6 w-6" />,
      name: 'Instagram',
      handle: '@bevensenbites',
      link: 'https://instagram.com'
    },
    {
      icon: <Facebook className="h-6 w-6" />,
      name: 'Facebook',
      handle: 'Bevensen Bites',
      link: 'https://facebook.com'
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
            Get in <span className="text-[#d4af37]">Touch</span>
          </h1>
          <p className="text-xl text-[#f5f5dc]/60">
            We'd love to hear from you. Reach out anytime!
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-6 hover:border-[#d4af37]/40 transition-all h-full">
                <div className={`h-14 w-14 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {method.icon}
                </div>
                <h3 className="text-xl text-white mb-2">{method.title}</h3>
                <p className="text-[#f5f5dc]/60 mb-4">{method.content}</p>
                <Button
                  onClick={() => window.open(method.link, '_blank')}
                  variant="outline"
                  className="w-full border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                >
                  {method.action}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8">
              <h2 className="text-3xl text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#f5f5dc]">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="bg-black/40 border-[#d4af37]/30 text-white placeholder:text-[#f5f5dc]/30 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#f5f5dc]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="bg-black/40 border-[#d4af37]/30 text-white placeholder:text-[#f5f5dc]/30 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#f5f5dc]">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 123 456789"
                    className="bg-black/40 border-[#d4af37]/30 text-white placeholder:text-[#f5f5dc]/30 mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-[#f5f5dc]">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind..."
                    required
                    rows={5}
                    className="bg-black/40 border-[#d4af37]/30 text-white placeholder:text-[#f5f5dc]/30 mt-2 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-black py-6"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Social Media */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8">
              <h2 className="text-2xl text-white mb-6">Follow Us</h2>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 8 }}
                    onClick={() => window.open(social.link, '_blank')}
                    className="flex items-center gap-4 w-full p-4 bg-black/40 rounded-lg border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-all"
                  >
                    <div className="h-12 w-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-lg flex items-center justify-center text-black">
                      {social.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-white">{social.name}</p>
                      <p className="text-[#d4af37] text-sm">{social.handle}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* Quick Info */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8">
              <h2 className="text-2xl text-white mb-6">Quick Info</h2>
              <div className="space-y-4 text-[#f5f5dc]/70">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[#d4af37] text-sm mb-1">Address</p>
                    <p>Bahnhofstraße 1<br />29549 Bad Bevensen<br />Germany</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Order Info */}
            <Card className="bg-gradient-to-br from-[#d4af37] to-[#f4d03f] p-8">
              <h2 className="text-2xl text-black mb-4">Ready to Order?</h2>
              <p className="text-black/80 mb-6">
                Call us for pickup or delivery. We're here to serve you delicious food, fast!
              </p>
              <Button
                onClick={() => window.open('tel:+495821123456', '_blank')}
                className="w-full bg-black text-[#d4af37] hover:bg-black/90"
              >
                <Phone className="h-5 w-5 mr-2" />
                Order Now
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Order Online Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8 text-center">
            <h2 className="text-3xl text-white mb-4">Order Online</h2>
            <p className="text-[#f5f5dc]/60 mb-6">
              Find us on your favorite delivery platforms
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => toast.info('Coming soon!')}
                variant="outline"
                className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                Lieferando
              </Button>
              <Button
                onClick={() => toast.info('Coming soon!')}
                variant="outline"
                className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                Uber Eats
              </Button>
              <Button
                onClick={() => toast.info('Coming soon!')}
                variant="outline"
                className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              >
                Wolt
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
