import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Crown, Star, Gift, Zap, Check, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { useAuth } from '../AuthProvider';
import { supabase } from '../../utils/supabase/client';
import { projectId } from '../../utils/supabase/info';

export default function Loyalty() {
  const { user } = useAuth();
  const [loyaltyData, setLoyaltyData] = useState<any>(null);
  
  // Auth State
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchLoyaltyData();
    }
  }, [user]);

  const fetchLoyaltyData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-36186c27/loyalty`, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setLoyaltyData(data);
      }
    } catch (error) {
      console.error("Error fetching loyalty:", error);
    }
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast.success('Welcome back!');
      } else {
        // Sign up via server to create profile
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-36186c27/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        });
        
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Signup failed');
        
        // Auto login after signup
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (loginError) throw loginError;
        
        toast.success('Account created successfully!');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTier = async (tierName: string) => {
    if (!user) {
      toast.error("Please sign in to join a membership tier.");
      const element = document.getElementById('auth-section');
      element?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    // Call server to update tier
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-36186c27/loyalty/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tier: tierName })
      });

      if (response.ok) {
        toast.success(`You have joined the ${tierName} tier!`);
        fetchLoyaltyData();
      }
    } catch (error) {
      toast.error("Failed to update membership.");
    }
  };

  const tiers = [
    {
      name: 'Bronze',
      icon: <Star className="h-8 w-8" />,
      price: 'Free',
      color: 'from-orange-600 to-orange-700',
      benefits: [
        'Earn 1 point per €1 spent',
        'Birthday surprise',
        'Exclusive member deals',
        'Early access to new menu items'
      ]
    },
    {
      name: 'Silver',
      icon: <Gift className="h-8 w-8" />,
      price: '€9.99/month',
      color: 'from-gray-400 to-gray-500',
      popular: true,
      benefits: [
        'Earn 2 points per €1 spent',
        'Free drink every week',
        'Priority order processing',
        '10% off all orders',
        'All Bronze benefits'
      ]
    },
    {
      name: 'Gold',
      icon: <Crown className="h-8 w-8" />,
      price: '€19.99/month',
      color: 'from-[#d4af37] to-[#f4d03f]',
      premium: true,
      benefits: [
        'Earn 3 points per €1 spent',
        'Free meal every month',
        'VIP customer support',
        '20% off all orders',
        'Exclusive Gold member events',
        'Free delivery',
        'All Silver & Bronze benefits'
      ]
    }
  ];

  const rewards = [
    { points: 100, reward: 'Free Side Dish', icon: <Gift className="h-5 w-5" /> },
    { points: 250, reward: 'Free Burger', icon: <Star className="h-5 w-5" /> },
    { points: 500, reward: 'Free Meal Combo', icon: <Zap className="h-5 w-5" /> },
    { points: 1000, reward: 'VIP Dinner for 2', icon: <Crown className="h-5 w-5" /> }
  ];

  const stats = [
    { value: '5,000+', label: 'Active Members', icon: <Users className="h-6 w-6" /> },
    { value: '€50K+', label: 'Rewards Redeemed', icon: <Gift className="h-6 w-6" /> },
    { value: '15%', label: 'Average Savings', icon: <TrendingUp className="h-6 w-6" /> },
    { value: '4.9★', label: 'Member Rating', icon: <Star className="h-6 w-6" /> }
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
          <div className="inline-block mb-6">
            <div className="h-20 w-20 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-2xl flex items-center justify-center mx-auto">
              <Crown className="h-10 w-10 text-black" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl mb-4">
            Loyalty <span className="text-[#d4af37]">Program</span>
          </h1>
          <p className="text-xl text-[#f5f5dc]/60 max-w-2xl mx-auto">
            Join our premium membership and enjoy exclusive rewards, discounts, and VIP perks
          </p>
        </motion.div>

        {/* User Stats or Login Prompt */}
        {user && loyaltyData && (
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="mb-16"
           >
             <Card className="bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] border-[#d4af37] p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Crown className="h-48 w-48 text-[#d4af37]" />
                </div>
                <h2 className="text-3xl text-white mb-2">Welcome Back!</h2>
                <div className="text-[#d4af37] text-xl mb-6">Current Tier: {loyaltyData.tier}</div>
                
                <div className="inline-block p-6 bg-black/50 rounded-2xl border border-[#d4af37]/30 backdrop-blur-sm">
                  <div className="text-sm text-[#f5f5dc]/60 uppercase tracking-widest mb-1">Your Points</div>
                  <div className="text-5xl font-bold text-white">{loyaltyData.points}</div>
                </div>
                
                <div className="mt-6 text-[#f5f5dc]/60">
                  You are {100 - (loyaltyData.points % 100)} points away from your next reward!
                </div>
             </Card>
           </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-6 text-center">
              <div className="h-12 w-12 bg-[#d4af37]/10 rounded-lg flex items-center justify-center text-[#d4af37] mx-auto mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[#f5f5dc]/60">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Membership Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl text-center mb-12">
            Choose Your <span className="text-[#d4af37]">Membership</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
              >
                <Card className={`bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-8 h-full relative overflow-hidden ${
                  tier.popular || tier.premium ? 'border-[#d4af37]/60' : ''
                }`}>
                  {tier.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  {tier.premium && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] text-black">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}

                  <div className={`h-16 w-16 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                    {tier.icon}
                  </div>

                  <h3 className="text-2xl text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl text-[#d4af37] mb-6">{tier.price}</div>

                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[#f5f5dc]/70">
                        <Check className="h-5 w-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleJoinTier(tier.name)}
                    className={`w-full ${
                      tier.premium
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#f4d03f] hover:from-[#f4d03f] hover:to-[#d4af37] text-black'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    {user && loyaltyData?.tier === tier.name ? 'Current Plan' : (tier.price === 'Free' ? 'Join Free' : 'Subscribe Now')}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rewards Catalog */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl text-center mb-12">
            Rewards <span className="text-[#d4af37]">Catalog</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-[#d4af37]/20 p-6 text-center hover:border-[#d4af37]/40 transition-all">
                  <div className="h-14 w-14 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] rounded-xl flex items-center justify-center text-black mx-auto mb-4">
                    {reward.icon}
                  </div>
                  <div className="text-2xl text-[#d4af37] mb-2">{reward.points} pts</div>
                  <h3 className="text-white">{reward.reward}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sign Up / Login Form */}
        {!user && (
          <motion.div
            id="auth-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] p-8 md:p-12 text-center overflow-hidden relative">
              <div className="max-w-md mx-auto relative z-10">
                <h2 className="text-4xl text-black mb-4 font-bold">
                  {isLogin ? 'Welcome Back' : 'Join the Club'}
                </h2>
                <p className="text-xl text-black/80 mb-8">
                  {isLogin ? 'Sign in to view your points and rewards' : 'Start earning rewards today and enjoy exclusive member benefits!'}
                </p>
                
                <div className="bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl">
                  {!isLogin && (
                    <div className="mb-4">
                      <Label htmlFor="name" className="text-left block text-black mb-2">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white text-black border-gray-300 focus:border-[#d4af37]"
                      />
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <Label htmlFor="email" className="text-left block text-black mb-2">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white text-black border-gray-300 focus:border-[#d4af37]"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="password" className="text-left block text-black mb-2">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white text-black border-gray-300 focus:border-[#d4af37]"
                    />
                  </div>

                  <Button
                    onClick={handleAuth}
                    disabled={loading}
                    className="w-full bg-black text-[#d4af37] hover:bg-black/90 h-12 text-lg font-medium mb-4"
                  >
                    {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="font-bold underline text-black hover:text-[#d4af37] transition-colors"
                    >
                      {isLogin ? 'Sign Up' : 'Log In'}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Integration Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-[#f5f5dc]/40 text-sm">
            Powered by Lightspeed Loyalty • Secure & Easy to Use
          </p>
        </motion.div>
      </div>
    </div>
  );
}
