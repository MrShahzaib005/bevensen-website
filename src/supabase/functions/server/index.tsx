import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Default Menu Items
const DEFAULT_MENU = [
  // Burgers
  {
    id: 'burger-1',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty, lettuce, tomato, onion, pickles, special sauce',
    price: 8.90,
    image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjExMzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'burgers',
    popular: true
  },
  {
    id: 'burger-2',
    name: 'Bacon Cheese Deluxe',
    description: 'Double beef, crispy bacon, cheddar, caramelized onions',
    price: 10.90,
    image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjExMzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'burgers',
    popular: true
  },
  {
    id: 'burger-3',
    name: 'Veggie Power Burger',
    description: 'Plant-based patty, avocado, sprouts, vegan mayo',
    price: 9.50,
    image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjExMzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'burgers',
    vegan: true
  },
  {
    id: 'burger-4',
    name: 'Chicken Crispy',
    description: 'Crispy chicken breast, coleslaw, ranch dressing',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjExMzg4NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'burgers'
  },
  // Sides
  {
    id: 'side-1',
    name: 'Classic French Fries',
    description: 'Golden crispy fries with sea salt',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'sides',
    popular: true
  },
  {
    id: 'side-2',
    name: 'Sweet Potato Fries',
    description: 'Crispy sweet potato fries with aioli',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'sides'
  },
  {
    id: 'side-3',
    name: 'Onion Rings',
    description: 'Beer-battered crispy onion rings',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjEyMjkwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'sides'
  },
  {
    id: 'side-4',
    name: 'Fresh Garden Salad',
    description: 'Mixed greens, cherry tomatoes, cucumber, vinaigrette',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NjExODEzNDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'sides',
    vegan: true
  },
  // Drinks
  {
    id: 'drink-1',
    name: 'Artisan Coffee',
    description: 'Premium espresso blend',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1596253420615-f54837f5141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhclsxRpc2FuJTIwY29mZmVlfGVufDF8fHx8MTc2MTIzMjk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks',
    popular: true
  },
  {
    id: 'drink-2',
    name: 'Cappuccino',
    description: 'Classic Italian cappuccino with velvety foam',
    price: 3.80,
    image: 'https://images.unsplash.com/photo-1596253420615-f54837f5141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhclsxRpc2FuJTIwY29mZmVlfGVufDF8fHx8MTc2MTIzMjk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks'
  },
  {
    id: 'drink-3',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1649361562904-316e772cf80a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHp1aWNlJTIwZHJpbmtzfGVufDF8fHx8MTc2MTE2ODY0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks',
    vegan: true
  },
  {
    id: 'drink-4',
    name: 'Craft Cocktail',
    description: 'Ask about our daily special cocktails',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1614285344553-fbb89a8e68ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGNvY2t0YWlscyUyMGJhclsxxlbnwxfHx8fDE3NjExNzcxODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks'
  },
  {
    id: 'drink-5',
    name: 'Iced Latte',
    description: 'Cold espresso with milk over ice',
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1596253420615-f54837f5141f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhclsxRpc2FuJTIwY29mZmVlfGVufDF8fHx8MTc2MTIzMjk2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks'
  },
  // Desserts
  {
    id: 'dessert-1',
    name: 'Chocolate Cake',
    description: 'Rich chocolate cake with ganache',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjEyMjM4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
    popular: true
  },
  {
    id: 'dessert-2',
    name: 'Apple Pie',
    description: 'Classic apple pie with vanilla ice cream',
    price: 4.90,
    image: 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjEyMjM4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts'
  },
  {
    id: 'dessert-3',
    name: 'Tiramisu',
    description: 'Italian classic with espresso and mascarpone',
    price: 5.90,
    image: 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjEyMjM4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts'
  }
];

// Health check endpoint
app.get("/make-server-36186c27/health", (c) => {
  return c.json({ status: "ok" });
});

// Menu Endpoint
app.get("/make-server-36186c27/menu", async (c) => {
  try {
    const storedMenu = await kv.get('menu:items');
    if (!storedMenu) {
      // If no menu in DB, return default and initialize
      await kv.set('menu:items', DEFAULT_MENU);
      return c.json(DEFAULT_MENU);
    }
    return c.json(storedMenu);
  } catch (error) {
    console.error("Error fetching menu:", error);
    return c.json(DEFAULT_MENU); // Fallback
  }
});

// Orders Endpoint
app.post("/make-server-36186c27/orders", async (c) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const authHeader = c.req.header('Authorization') || '';
  const token = authHeader.split(' ')[1];

  let userId = null;
  if (token) {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (user) userId = user.id;
  }

  const body = await c.req.json();
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const order = {
    id: orderId,
    userId,
    items: body.items,
    total: body.total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  await kv.set(`order:${orderId}`, order);

  // If user is logged in, award points (1 point per Euro)
  if (userId) {
    const points = Math.floor(body.total);
    const userLoyaltyKey = `user:${userId}:loyalty`;
    const loyalty = await kv.get(userLoyaltyKey) || { points: 0, tier: 'Bronze' };
    loyalty.points += points;
    await kv.set(userLoyaltyKey, loyalty);
  }

  return c.json({ success: true, orderId });
});

// Loyalty Endpoints
app.get("/make-server-36186c27/loyalty", async (c) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const authHeader = c.req.header('Authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (!user || error) return c.json({ error: "Unauthorized" }, 401);

  const userLoyaltyKey = `user:${user.id}:loyalty`;
  const loyalty = await kv.get(userLoyaltyKey) || { points: 0, tier: 'Bronze', joinDate: new Date().toISOString() };
  
  return c.json(loyalty);
});

app.post("/make-server-36186c27/loyalty/join", async (c) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const authHeader = c.req.header('Authorization') || '';
  const token = authHeader.split(' ')[1];

  if (!token) return c.json({ error: "Unauthorized" }, 401);

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (!user || error) return c.json({ error: "Unauthorized" }, 401);

  const body = await c.req.json();
  const tier = body.tier || 'Bronze';

  const userLoyaltyKey = `user:${user.id}:loyalty`;
  const loyalty = await kv.get(userLoyaltyKey) || { points: 0, joinDate: new Date().toISOString() };
  
  loyalty.tier = tier;
  await kv.set(userLoyaltyKey, loyalty);

  return c.json({ success: true, loyalty });
});

// Auth / Signup Endpoint
app.post("/make-server-36186c27/signup", async (c) => {
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { email, password, name } = await c.req.json();

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name },
    email_confirm: true
  });

  if (error) {
    return c.json({ error: error.message }, 400);
  }

  // Initialize loyalty profile
  if (data.user) {
    const userLoyaltyKey = `user:${data.user.id}:loyalty`;
    await kv.set(userLoyaltyKey, { points: 0, tier: 'Bronze', joinDate: new Date().toISOString() });
  }

  return c.json({ user: data.user });
});

Deno.serve(app.fetch);