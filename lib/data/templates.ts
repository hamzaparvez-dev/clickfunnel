export const TEMPLATE_CATEGORIES = [
  'All Templates',
  'Lead Gen',
  'Unboxing',
  'Presentation',
  'Phone',
  'Sales',
  'Webinar',
  'Membership',
  'Services',
  'Education',
  'SaaS',
  'E-commerce',
  'Coaching',
  'Agency',
  'Real Estate',
];

export interface TemplateData {
  id: string
  name: string
  description: string
  category: string // Main category like 'Lead Gen'
  funnelType?: string // Specific type like 'squeeze' or 'book'
  variation?: 'classic' | 'modern' | 'bold' | 'elegant' | 'minimalist' // Design variation
  pages: number
  popular: boolean
  premium: boolean
  thumbnail?: string
  avgConversion?: string
  pageDefinitions: Array<{
    name: string
    type: 'landing' | 'sales' | 'checkout' | 'upsell' | 'thankyou' | 'webinar' | 'membership' | 'application' | 'cart' | 'confirmation'
  }>
}

export const TEMPLATES: TemplateData[] = [
  // 🎯 Lead Funnels -> Lead "Squeeze" Funnel (5 Templates)
  {
    id: 'squeeze-classic',
    name: 'Classic Squeeze Funnel',
    description: 'A time-tested layout for maximum lead capture with a clean, straightforward design.',
    category: 'Lead Gen',
    funnelType: 'squeeze',
    variation: 'classic',
    pages: 2,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'Squeeze Page', type: 'landing' }, { name: 'Thank You Page', type: 'thankyou' } ]
  },
  {
    id: 'squeeze-modern',
    name: 'Modern Squeeze Funnel',
    description: 'Clean and minimalist design with a focus on typography and whitespace for a professional look.',
    category: 'Lead Gen',
    funnelType: 'squeeze',
    variation: 'modern',
    pages: 2,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'Squeeze Page', type: 'landing' }, { name: 'Thank You Page', type: 'thankyou' } ]
  },
  {
    id: 'squeeze-bold',
    name: 'Bold Squeeze Funnel',
    description: 'High-contrast, dark-themed design that makes your offer pop and grabs attention instantly.',
    category: 'Lead Gen',
    funnelType: 'squeeze',
    variation: 'bold',
    pages: 2,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'Squeeze Page', type: 'landing' }, { name: 'Thank You Page', type: 'thankyou' } ]
  },
  {
    id: 'squeeze-elegant',
    name: 'Elegant Squeeze Funnel',
    description: 'A sophisticated design with serif fonts and refined imagery, perfect for premium lead magnets.',
    category: 'Lead Gen',
    funnelType: 'squeeze',
    variation: 'elegant',
    pages: 2,
    popular: false,
    premium: true,
    pageDefinitions: [ { name: 'Squeeze Page', type: 'landing' }, { name: 'Thank You Page', type: 'thankyou' } ]
  },
  {
    id: 'squeeze-minimalist',
    name: 'Minimalist Squeeze Funnel',
    description: 'An ultra-simple, single-column layout that focuses entirely on one call-to-action.',
    category: 'Lead Gen',
    funnelType: 'squeeze',
    variation: 'minimalist',
    pages: 2,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'Squeeze Page', type: 'landing' }, { name: 'Thank You Page', type: 'thankyou' } ]
  },

  // 🎯 Lead Funnels -> Summit Funnel (5 Templates)
  {
    id: 'summit-classic',
    name: 'Classic Summit Funnel',
    description: 'Feature-packed design with speaker grids and detailed schedules for a professional online event.',
    category: 'Lead Gen',
    funnelType: 'summit',
    variation: 'classic',
    pages: 4,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'Registration', type: 'landing' }, { name: 'Confirmation', type: 'thankyou' }, { name: 'Event Page', type: 'webinar' }, { name: 'Replay Page', type: 'sales' } ]
  },
  {
    id: 'summit-modern',
    name: 'Modern Summit Funnel',
    description: 'A sleek, card-based layout that highlights speakers and topics in a visually engaging way.',
    category: 'Lead Gen',
    funnelType: 'summit',
    variation: 'modern',
    pages: 4,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'Registration', type: 'landing' }, { name: 'Confirmation', type: 'thankyou' }, { name: 'Event Page', type: 'webinar' }, { name: 'Replay Page', type: 'sales' } ]
  },
  {
    id: 'summit-bold',
    name: 'Bold Summit Funnel',
    description: 'Dynamic, dark-themed design that creates excitement and urgency for your summit event.',
    category: 'Lead Gen',
    funnelType: 'summit',
    variation: 'bold',
    pages: 4,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'Registration', type: 'landing' }, { name: 'Confirmation', type: 'thankyou' }, { name: 'Event Page', type: 'webinar' }, { name: 'Replay Page', type: 'sales' } ]
  },
  {
    id: 'summit-elegant',
    name: 'Elegant Summit Funnel',
    description: 'A premium and sophisticated design for high-ticket or exclusive online summits.',
    category: 'Lead Gen',
    funnelType: 'summit',
    variation: 'elegant',
    pages: 4,
    popular: false,
    premium: true,
    pageDefinitions: [ { name: 'Registration', type: 'landing' }, { name: 'Confirmation', type: 'thankyou' }, { name: 'Event Page', type: 'webinar' }, { name: 'Replay Page', type: 'sales' } ]
  },
  {
    id: 'summit-minimalist',
    name: 'Minimalist Summit Funnel',
    description: 'A clean, agenda-focused layout that clearly presents the value and schedule of your event.',
    category: 'Lead Gen',
    funnelType: 'summit',
    variation: 'minimalist',
    pages: 4,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'Registration', type: 'landing' }, { name: 'Confirmation', type: 'thankyou' }, { name: 'Event Page', type: 'webinar' }, { name: 'Replay Page', type: 'sales' } ]
  },

  // 📦 Unboxing Funnels -> Book Funnel (5 Templates)
  {
    id: 'book-classic',
    name: 'Classic Book Funnel',
    description: 'A traditional "free plus shipping" book offer layout with a strong author focus.',
    category: 'Unboxing',
    funnelType: 'book',
    variation: 'classic',
    pages: 3,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'Book Offer Page', type: 'sales' }, { name: 'Order Form', type: 'checkout' }, { name: 'Upsell Page', type: 'upsell' } ]
  },
  {
    id: 'book-modern',
    name: 'Modern Book Funnel',
    description: 'A clean, visually-driven layout with a large book mock-up and benefit-oriented sections.',
    category: 'Unboxing',
    funnelType: 'book',
    variation: 'modern',
    pages: 3,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'Book Offer Page', type: 'sales' }, { name: 'Order Form', type: 'checkout' }, { name: 'Upsell Page', type: 'upsell' } ]
  },
  {
    id: 'book-bold',
    name: 'Bold Book Funnel',
    description: 'A high-impact, dark-themed design that makes your book cover and offer stand out.',
    category: 'Unboxing',
    funnelType: 'book',
    variation: 'bold',
    pages: 3,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'Book Offer Page', type: 'sales' }, { name: 'Order Form', type: 'checkout' }, { name: 'Upsell Page', type: 'upsell' } ]
  },
  {
    id: 'book-elegant',
    name: 'Elegant Book Funnel',
    description: 'A sophisticated design perfect for non-fiction, business, or premium-quality books.',
    category: 'Unboxing',
    funnelType: 'book',
    variation: 'elegant',
    pages: 3,
    popular: false,
    premium: true,
    pageDefinitions: [ { name: 'Book Offer Page', type: 'sales' }, { name: 'Order Form', type: 'checkout' }, { name: 'Upsell Page', type: 'upsell' } ]
  },
  {
    id: 'book-minimalist',
    name: 'Minimalist Book Funnel',
    description: 'A simple, straight-to-the-point layout that focuses on the book and a single CTA.',
    category: 'Unboxing',
    funnelType: 'book',
    variation: 'minimalist',
    pages: 3,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'Book Offer Page', type: 'sales' }, { name: 'Order Form', type: 'checkout' }, { name: 'Upsell Page', type: 'upsell' } ]
  },
  
  // 🎬 Presentation Funnels -> VSL Funnel (5 Templates)
  {
    id: 'vsl-classic',
    name: 'Classic VSL Funnel',
    description: 'A traditional VSL page with a prominent video player and a CTA that appears later.',
    category: 'Presentation',
    funnelType: 'vsl',
    variation: 'classic',
    pages: 4,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'VSL Page', type: 'sales' }, { name: 'Checkout', type: 'checkout' }, { name: 'Upsell', type: 'upsell' }, { name: 'Confirmation', type: 'thankyou' } ]
  },
  {
    id: 'vsl-modern',
    name: 'Modern VSL Funnel',
    description: 'A sleek design with the video integrated into a clean layout with surrounding benefits.',
    category: 'Presentation',
    funnelType: 'vsl',
    variation: 'modern',
    pages: 4,
    popular: true,
    premium: false,
    pageDefinitions: [ { name: 'VSL Page', type: 'sales' }, { name: 'Checkout', type: 'checkout' }, { name: 'Upsell', type: 'upsell' }, { name: 'Confirmation', type: 'thankyou' } ]
  },
  {
    id: 'vsl-bold',
    name: 'Bold VSL Funnel',
    description: 'A high-urgency, dark-themed VSL page designed to maximize focus on the video message.',
    category: 'Presentation',
    funnelType: 'vsl',
    variation: 'bold',
    pages: 4,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'VSL Page', type: 'sales' }, { name: 'Checkout', type: 'checkout' }, { name: 'Upsell', type: 'upsell' }, { name: 'Confirmation', type: 'thankyou' } ]
  },
  {
    id: 'vsl-elegant',
    name: 'Elegant VSL Funnel',
    description: 'A refined VSL page for high-ticket services, coaching, or premium products.',
    category: 'Presentation',
    funnelType: 'vsl',
    variation: 'elegant',
    pages: 4,
    popular: false,
    premium: true,
    pageDefinitions: [ { name: 'VSL Page', type: 'sales' }, { name: 'Checkout', type: 'checkout' }, { name: 'Upsell', type: 'upsell' }, { name: 'Confirmation', type: 'thankyou' } ]
  },
  {
    id: 'vsl-minimalist',
    name: 'Minimalist VSL Funnel',
    description: 'A distraction-free page that puts the entire focus on the video player and nothing else.',
    category: 'Presentation',
    funnelType: 'vsl',
    variation: 'minimalist',
    pages: 4,
    popular: false,
    premium: false,
    pageDefinitions: [ { name: 'VSL Page', type: 'sales' }, { name: 'Checkout', type: 'checkout' }, { name: 'Upsell', type: 'upsell' }, { name: 'Confirmation', type: 'thankyou' } ]
  },
    // 🎓 Webinar Funnels -> Live Webinar Funnel (5 Templates)
    {
      id: 'webinar-classic',
      name: 'Classic Webinar Funnel',
      description: 'Traditional webinar registration funnel with speaker credibility and event details.',
      category: 'Webinar',
      funnelType: 'live-webinar',
      variation: 'classic',
      pages: 5,
      popular: true,
      premium: false,
      avgConversion: '32%',
      pageDefinitions: [
        { name: 'Registration Page', type: 'landing' },
        { name: 'Thank You Page', type: 'thankyou' },
        { name: 'Webinar Room', type: 'webinar' },
        { name: 'Replay Page', type: 'sales' },
        { name: 'Offer Page', type: 'checkout' }
      ]
    },
    {
      id: 'webinar-modern',
      name: 'Modern Webinar Funnel',
      description: 'Sleek, video-first design with countdown timers and social proof elements.',
      category: 'Webinar',
      funnelType: 'live-webinar',
      variation: 'modern',
      pages: 5,
      popular: true,
      premium: false,
      avgConversion: '38%',
      pageDefinitions: [
        { name: 'Registration Page', type: 'landing' },
        { name: 'Thank You Page', type: 'thankyou' },
        { name: 'Webinar Room', type: 'webinar' },
        { name: 'Replay Page', type: 'sales' },
        { name: 'Offer Page', type: 'checkout' }
      ]
    },
    {
      id: 'webinar-bold',
      name: 'Bold Webinar Funnel',
      description: 'High-energy, urgency-driven design perfect for limited-time training events.',
      category: 'Webinar',
      funnelType: 'live-webinar',
      variation: 'bold',
      pages: 5,
      popular: false,
      premium: false,
      avgConversion: '35%',
      pageDefinitions: [
        { name: 'Registration Page', type: 'landing' },
        { name: 'Thank You Page', type: 'thankyou' },
        { name: 'Webinar Room', type: 'webinar' },
        { name: 'Replay Page', type: 'sales' },
        { name: 'Offer Page', type: 'checkout' }
      ]
    },
    {
      id: 'webinar-elegant',
      name: 'Elegant Webinar Funnel',
      description: 'Premium webinar funnel for high-ticket masterclasses and executive training.',
      category: 'Webinar',
      funnelType: 'live-webinar',
      variation: 'elegant',
      pages: 5,
      popular: false,
      premium: true,
      avgConversion: '28%',
      pageDefinitions: [
        { name: 'Registration Page', type: 'landing' },
        { name: 'Thank You Page', type: 'thankyou' },
        { name: 'Webinar Room', type: 'webinar' },
        { name: 'Replay Page', type: 'sales' },
        { name: 'Offer Page', type: 'checkout' }
      ]
    },
    {
      id: 'webinar-minimalist',
      name: 'Minimalist Webinar Funnel',
      description: 'Clean, distraction-free design that focuses on the webinar content and value.',
      category: 'Webinar',
      funnelType: 'live-webinar',
      variation: 'minimalist',
      pages: 5,
      popular: false,
      premium: false,
      avgConversion: '30%',
      pageDefinitions: [
        { name: 'Registration Page', type: 'landing' },
        { name: 'Thank You Page', type: 'thankyou' },
        { name: 'Webinar Room', type: 'webinar' },
        { name: 'Replay Page', type: 'sales' },
        { name: 'Offer Page', type: 'checkout' }
      ]
    },
  
    // 💼 Sales Funnels -> Product Launch Funnel (5 Templates)
    {
      id: 'product-launch-classic',
      name: 'Classic Product Launch Funnel',
      description: 'Complete product launch sequence with early-bird pricing and scarcity elements.',
      category: 'Sales',
      funnelType: 'product-launch',
      variation: 'classic',
      pages: 6,
      popular: true,
      premium: false,
      avgConversion: '24%',
      pageDefinitions: [
        { name: 'Coming Soon Page', type: 'landing' },
        { name: 'Pre-Launch Video 1', type: 'sales' },
        { name: 'Pre-Launch Video 2', type: 'sales' },
        { name: 'Cart Open', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Confirmation', type: 'thankyou' }
      ]
    },
    {
      id: 'product-launch-modern',
      name: 'Modern Product Launch Funnel',
      description: 'Progressive reveal launch with interactive elements and community building.',
      category: 'Sales',
      funnelType: 'product-launch',
      variation: 'modern',
      pages: 6,
      popular: true,
      premium: false,
      avgConversion: '28%',
      pageDefinitions: [
        { name: 'Coming Soon Page', type: 'landing' },
        { name: 'Pre-Launch Video 1', type: 'sales' },
        { name: 'Pre-Launch Video 2', type: 'sales' },
        { name: 'Cart Open', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Confirmation', type: 'thankyou' }
      ]
    },
    {
      id: 'product-launch-bold',
      name: 'Bold Product Launch Funnel',
      description: 'High-impact launch with strong scarcity, countdown timers, and flash sales.',
      category: 'Sales',
      funnelType: 'product-launch',
      variation: 'bold',
      pages: 6,
      popular: false,
      premium: false,
      avgConversion: '26%',
      pageDefinitions: [
        { name: 'Coming Soon Page', type: 'landing' },
        { name: 'Pre-Launch Video 1', type: 'sales' },
        { name: 'Pre-Launch Video 2', type: 'sales' },
        { name: 'Cart Open', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Confirmation', type: 'thankyou' }
      ]
    },
    {
      id: 'product-launch-elegant',
      name: 'Elegant Product Launch Funnel',
      description: 'Sophisticated launch sequence for luxury products and premium services.',
      category: 'Sales',
      funnelType: 'product-launch',
      variation: 'elegant',
      pages: 6,
      popular: false,
      premium: true,
      avgConversion: '22%',
      pageDefinitions: [
        { name: 'Coming Soon Page', type: 'landing' },
        { name: 'Pre-Launch Video 1', type: 'sales' },
        { name: 'Pre-Launch Video 2', type: 'sales' },
        { name: 'Cart Open', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Confirmation', type: 'thankyou' }
      ]
    },
    {
      id: 'product-launch-minimalist',
      name: 'Minimalist Product Launch Funnel',
      description: 'Simple, story-driven launch that builds anticipation through clear messaging.',
      category: 'Sales',
      funnelType: 'product-launch',
      variation: 'minimalist',
      pages: 6,
      popular: false,
      premium: false,
      avgConversion: '25%',
      pageDefinitions: [
        { name: 'Coming Soon Page', type: 'landing' },
        { name: 'Pre-Launch Video 1', type: 'sales' },
        { name: 'Pre-Launch Video 2', type: 'sales' },
        { name: 'Cart Open', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Confirmation', type: 'thankyou' }
      ]
    },
  
    // 🎯 Membership Funnels -> Membership Site Funnel (5 Templates)
    {
      id: 'membership-classic',
      name: 'Classic Membership Funnel',
      description: 'Traditional membership signup with tier options and member benefits showcase.',
      category: 'Membership',
      funnelType: 'membership',
      variation: 'classic',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '18%',
      pageDefinitions: [
        { name: 'Sales Page', type: 'sales' },
        { name: 'Pricing', type: 'checkout' },
        { name: 'Welcome', type: 'thankyou' },
        { name: 'Member Dashboard', type: 'membership' }
      ]
    },
    {
      id: 'membership-modern',
      name: 'Modern Membership Funnel',
      description: 'Community-focused design with social features and member testimonials.',
      category: 'Membership',
      funnelType: 'membership',
      variation: 'modern',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '22%',
      pageDefinitions: [
        { name: 'Sales Page', type: 'sales' },
        { name: 'Pricing', type: 'checkout' },
        { name: 'Welcome', type: 'thankyou' },
        { name: 'Member Dashboard', type: 'membership' }
      ]
    },
    {
      id: 'membership-bold',
      name: 'Bold Membership Funnel',
      description: 'High-value membership with strong exclusivity and community elements.',
      category: 'Membership',
      funnelType: 'membership',
      variation: 'bold',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '20%',
      pageDefinitions: [
        { name: 'Sales Page', type: 'sales' },
        { name: 'Pricing', type: 'checkout' },
        { name: 'Welcome', type: 'thankyou' },
        { name: 'Member Dashboard', type: 'membership' }
      ]
    },
    {
      id: 'membership-elegant',
      name: 'Elegant Membership Funnel',
      description: 'Premium membership funnel for exclusive clubs and high-ticket communities.',
      category: 'Membership',
      funnelType: 'membership',
      variation: 'elegant',
      pages: 4,
      popular: false,
      premium: true,
      avgConversion: '15%',
      pageDefinitions: [
        { name: 'Sales Page', type: 'sales' },
        { name: 'Pricing', type: 'checkout' },
        { name: 'Welcome', type: 'thankyou' },
        { name: 'Member Dashboard', type: 'membership' }
      ]
    },
    {
      id: 'membership-minimalist',
      name: 'Minimalist Membership Funnel',
      description: 'Clean, value-focused membership with straightforward benefits and pricing.',
      category: 'Membership',
      funnelType: 'membership',
      variation: 'minimalist',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '19%',
      pageDefinitions: [
        { name: 'Sales Page', type: 'sales' },
        { name: 'Pricing', type: 'checkout' },
        { name: 'Welcome', type: 'thankyou' },
        { name: 'Member Dashboard', type: 'membership' }
      ]
    },
  
    // 🎓 Coaching Funnels -> Application Funnel (5 Templates)
    {
      id: 'coaching-classic',
      name: 'Classic Coaching Application Funnel',
      description: 'Professional coaching funnel with qualification questions and booking system.',
      category: 'Coaching',
      funnelType: 'application',
      variation: 'classic',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '12%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Application Form', type: 'application' },
        { name: 'Thank You', type: 'thankyou' },
        { name: 'Calendar Booking', type: 'sales' }
      ]
    },
    {
      id: 'coaching-modern',
      name: 'Modern Coaching Application Funnel',
      description: 'Results-driven design with client transformations and interactive quizzes.',
      category: 'Coaching',
      funnelType: 'application',
      variation: 'modern',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '15%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Application Form', type: 'application' },
        { name: 'Thank You', type: 'thankyou' },
        { name: 'Calendar Booking', type: 'sales' }
      ]
    },
    {
      id: 'coaching-bold',
      name: 'Bold Coaching Application Funnel',
      description: 'High-impact coaching funnel emphasizing transformation and results.',
      category: 'Coaching',
      funnelType: 'application',
      variation: 'bold',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '14%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Application Form', type: 'application' },
        { name: 'Thank You', type: 'thankyou' },
        { name: 'Calendar Booking', type: 'sales' }
      ]
    },
    {
      id: 'coaching-elegant',
      name: 'Elegant Coaching Application Funnel',
      description: 'Sophisticated funnel for executive coaching and high-ticket consulting.',
      category: 'Coaching',
      funnelType: 'application',
      variation: 'elegant',
      pages: 4,
      popular: false,
      premium: true,
      avgConversion: '10%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Application Form', type: 'application' },
        { name: 'Thank You', type: 'thankyou' },
        { name: 'Calendar Booking', type: 'sales' }
      ]
    },
    {
      id: 'coaching-minimalist',
      name: 'Minimalist Coaching Application Funnel',
      description: 'Simple, trust-building design that focuses on coach credibility and results.',
      category: 'Coaching',
      funnelType: 'application',
      variation: 'minimalist',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '13%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Application Form', type: 'application' },
        { name: 'Thank You', type: 'thankyou' },
        { name: 'Calendar Booking', type: 'sales' }
      ]
    },
  
    // 🛒 E-commerce Funnels -> Product Cart Funnel (5 Templates)
    {
      id: 'ecommerce-classic',
      name: 'Classic E-commerce Funnel',
      description: 'Traditional product page with cart, checkout, and order confirmation flow.',
      category: 'E-commerce',
      funnelType: 'cart',
      variation: 'classic',
      pages: 5,
      popular: true,
      premium: false,
      avgConversion: '3.5%',
      pageDefinitions: [
        { name: 'Product Page', type: 'sales' },
        { name: 'Shopping Cart', type: 'cart' },
        { name: 'Checkout', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Order Confirmed', type: 'thankyou' }
      ]
    },
    {
      id: 'ecommerce-modern',
      name: 'Modern E-commerce Funnel',
      description: 'One-click checkout with dynamic recommendations and abandoned cart recovery.',
      category: 'E-commerce',
      funnelType: 'cart',
      variation: 'modern',
      pages: 5,
      popular: true,
      premium: false,
      avgConversion: '4.2%',
      pageDefinitions: [
        { name: 'Product Page', type: 'sales' },
        { name: 'Shopping Cart', type: 'cart' },
        { name: 'Checkout', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Order Confirmed', type: 'thankyou' }
      ]
    },
    {
      id: 'ecommerce-bold',
      name: 'Bold E-commerce Funnel',
      description: 'High-conversion design with flash sales, limited inventory, and urgency.',
      category: 'E-commerce',
      funnelType: 'cart',
      variation: 'bold',
      pages: 5,
      popular: false,
      premium: false,
      avgConversion: '3.8%',
      pageDefinitions: [
        { name: 'Product Page', type: 'sales' },
        { name: 'Shopping Cart', type: 'cart' },
        { name: 'Checkout', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Order Confirmed', type: 'thankyou' }
      ]
    },
    {
      id: 'ecommerce-elegant',
      name: 'Elegant E-commerce Funnel',
      description: 'Luxury product funnel with premium packaging and white-glove service.',
      category: 'E-commerce',
      funnelType: 'cart',
      variation: 'elegant',
      pages: 5,
      popular: false,
      premium: true,
      avgConversion: '2.8%',
      pageDefinitions: [
        { name: 'Product Page', type: 'sales' },
        { name: 'Shopping Cart', type: 'cart' },
        { name: 'Checkout', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Order Confirmed', type: 'thankyou' }
      ]
    },
    {
      id: 'ecommerce-minimalist',
      name: 'Minimalist E-commerce Funnel',
      description: 'Clean, fast checkout experience with minimal distractions and friction.',
      category: 'E-commerce',
      funnelType: 'cart',
      variation: 'minimalist',
      pages: 5,
      popular: false,
      premium: false,
      avgConversion: '4.0%',
      pageDefinitions: [
        { name: 'Product Page', type: 'sales' },
        { name: 'Shopping Cart', type: 'cart' },
        { name: 'Checkout', type: 'checkout' },
        { name: 'Upsell', type: 'upsell' },
        { name: 'Order Confirmed', type: 'thankyou' }
      ]
    },
  
    // 💼 Agency Funnels -> Service Application Funnel (5 Templates)
    {
      id: 'agency-classic',
      name: 'Classic Agency Funnel',
      description: 'Professional services funnel with portfolio, case studies, and discovery call.',
      category: 'Agency',
      funnelType: 'service',
      variation: 'classic',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '8%',
      pageDefinitions: [
        { name: 'Services Page', type: 'sales' },
        { name: 'Case Studies', type: 'sales' },
        { name: 'Application', type: 'application' },
        { name: 'Book Call', type: 'thankyou' }
      ]
    },
    {
      id: 'agency-modern',
      name: 'Modern Agency Funnel',
      description: 'Dynamic agency showcase with interactive portfolio and client results.',
      category: 'Agency',
      funnelType: 'service',
      variation: 'modern',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '10%',
      pageDefinitions: [
        { name: 'Services Page', type: 'sales' },
        { name: 'Case Studies', type: 'sales' },
        { name: 'Application', type: 'application' },
        { name: 'Book Call', type: 'thankyou' }
      ]
    },
    {
      id: 'agency-bold',
      name: 'Bold Agency Funnel',
      description: 'Results-focused agency funnel with bold claims and proven ROI showcases.',
      category: 'Agency',
      funnelType: 'service',
      variation: 'bold',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '9%',
      pageDefinitions: [
        { name: 'Services Page', type: 'sales' },
        { name: 'Case Studies', type: 'sales' },
        { name: 'Application', type: 'application' },
        { name: 'Book Call', type: 'thankyou' }
      ]
    },
    {
      id: 'agency-elegant',
      name: 'Elegant Agency Funnel',
      description: 'Sophisticated agency funnel for enterprise clients and high-value contracts.',
      category: 'Agency',
      funnelType: 'service',
      variation: 'elegant',
      pages: 4,
      popular: false,
      premium: true,
      avgConversion: '7%',
      pageDefinitions: [
        { name: 'Services Page', type: 'sales' },
        { name: 'Case Studies', type: 'sales' },
        { name: 'Application', type: 'application' },
        { name: 'Book Call', type: 'thankyou' }
      ]
    },
    {
      id: 'agency-minimalist',
      name: 'Minimalist Agency Funnel',
      description: 'Clean, straightforward agency funnel focusing on process and deliverables.',
      category: 'Agency',
      funnelType: 'service',
      variation: 'minimalist',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '8.5%',
      pageDefinitions: [
        { name: 'Services Page', type: 'sales' },
        { name: 'Case Studies', type: 'sales' },
        { name: 'Application', type: 'application' },
        { name: 'Book Call', type: 'thankyou' }
      ]
    },
  
    // 💻 SaaS Funnels -> Trial Signup Funnel (5 Templates)
    {
      id: 'saas-classic',
      name: 'Classic SaaS Trial Funnel',
      description: 'Traditional SaaS signup with feature comparison and free trial activation.',
      category: 'SaaS',
      funnelType: 'trial',
      variation: 'classic',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '25%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Pricing', type: 'sales' },
        { name: 'Signup', type: 'checkout' },
        { name: 'Onboarding', type: 'thankyou' }
      ]
    },
    {
      id: 'saas-modern',
      name: 'Modern SaaS Trial Funnel',
      description: 'Product-led growth funnel with interactive demos and instant value delivery.',
      category: 'SaaS',
      funnelType: 'trial',
      variation: 'modern',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '30%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Pricing', type: 'sales' },
        { name: 'Signup', type: 'checkout' },
        { name: 'Onboarding', type: 'thankyou' }
      ]
    },
    {
      id: 'saas-bold',
      name: 'Bold SaaS Trial Funnel',
      description: 'High-urgency SaaS funnel with limited trial spots and exclusive beta access.',
      category: 'SaaS',
      funnelType: 'trial',
      variation: 'bold',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '28%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Pricing', type: 'sales' },
        { name: 'Signup', type: 'checkout' },
        { name: 'Onboarding', type: 'thankyou' }
      ]
    },
    {
      id: 'saas-elegant',
      name: 'Elegant SaaS Trial Funnel',
      description: 'Enterprise-grade SaaS funnel with white-glove onboarding and priority support.',
      category: 'SaaS',
      funnelType: 'trial',
      variation: 'elegant',
      pages: 4,
      popular: false,
      premium: true,
      avgConversion: '22%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Pricing', type: 'sales' },
        { name: 'Signup', type: 'checkout' },
        { name: 'Onboarding', type: 'thankyou' }
      ]
    },
    {
      id: 'saas-minimalist',
      name: 'Minimalist SaaS Trial Funnel',
      description: 'Frictionless signup with no-nonsense pricing and instant access.',
      category: 'SaaS',
      funnelType: 'trial',
      variation: 'minimalist',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '27%',
      pageDefinitions: [
        { name: 'Landing Page', type: 'landing' },
        { name: 'Pricing', type: 'sales' },
        { name: 'Signup', type: 'checkout' },
        { name: 'Onboarding', type: 'thankyou' }
      ]
    },
  
    // 🏠 Real Estate Funnels -> Property Listing Funnel (5 Templates)
    {
      id: 'realestate-classic',
      name: 'Classic Real Estate Funnel',
      description: 'Traditional property showcase with virtual tours and contact forms.',
      category: 'Real Estate',
      funnelType: 'listing',
      variation: 'classic',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '5%',
      pageDefinitions: [
        { name: 'Property Page', type: 'sales' },
        { name: 'Virtual Tour', type: 'sales' },
        { name: 'Schedule Viewing', type: 'application' },
        { name: 'Thank You', type: 'thankyou' }
      ]
    },
    {
      id: 'realestate-modern',
      name: 'Modern Real Estate Funnel',
      description: '3D walkthrough funnel with neighborhood insights and mortgage calculator.',
      category: 'Real Estate',
      funnelType: 'listing',
      variation: 'modern',
      pages: 4,
      popular: true,
      premium: false,
      avgConversion: '6.5%',
      pageDefinitions: [
        { name: 'Property Page', type: 'sales' },
        { name: 'Virtual Tour', type: 'sales' },
        { name: 'Schedule Viewing', type: 'application' },
        { name: 'Thank You', type: 'thankyou' }
      ]
    },
    {
      id: 'realestate-bold',
      name: 'Bold Real Estate Funnel',
      description: 'Luxury property funnel with cinematic videos and exclusive showing requests.',
      category: 'Real Estate',
      funnelType: 'listing',
      variation: 'bold',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '5.5%',
      pageDefinitions: [
        { name: 'Property Page', type: 'sales' },
        { name: 'Virtual Tour', type: 'sales' },
        { name: 'Schedule Viewing', type: 'application' },
        { name: 'Thank You', type: 'thankyou' }
      ]
    },
    {
      id: 'realestate-elegant',
      name: 'Elegant Real Estate Funnel',
      description: 'High-end property funnel for luxury estates and exclusive listings.',
      category: 'Real Estate',
      funnelType: 'listing',
      variation: 'elegant',
      pages: 4,
      popular: false,
      premium: true,
      avgConversion: '4%',
      pageDefinitions: [
        { name: 'Property Page', type: 'sales' },
        { name: 'Virtual Tour', type: 'sales' },
        { name: 'Schedule Viewing', type: 'application' },
        { name: 'Thank You', type: 'thankyou' }
      ]
    },
    {
      id: 'realestate-minimalist',
      name: 'Minimalist Real Estate Funnel',
      description: 'Clean property showcase focused on key features and quick contact.',
      category: 'Real Estate',
      funnelType: 'listing',
      variation: 'minimalist',
      pages: 4,
      popular: false,
      premium: false,
      avgConversion: '5.8%',
      pageDefinitions: [
        { name: 'Property Page', type: 'sales' },
        { name: 'Virtual Tour', type: 'sales' },
        { name: 'Schedule Viewing', type: 'application' },
        { name: 'Thank You', type: 'thankyou' }
      ]
    },
  ];



// Helper function to get templates by category and type
export function getTemplatesByFunnelType(funnelType: string): TemplateData[] {
  if (!funnelType) return TEMPLATES;
  return TEMPLATES.filter((t) => t.funnelType === funnelType);
}

// Helper function to get templates by high-level category label
// Example categories include: 'All Templates', 'Lead Gen', 'Unboxing', 'Presentation', etc.
export function getTemplatesByCategory(category: string): TemplateData[] {
  if (!category || category === 'All Templates') return TEMPLATES;
  return TEMPLATES.filter((t) => t.category === category);
}

// Helper function to search templates
export function searchTemplates(query: string): TemplateData[] {
  const lowerQuery = query.toLowerCase();
  return TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  );
}