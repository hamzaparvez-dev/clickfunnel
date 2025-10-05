export const TEMPLATE_CATEGORIES = [
  'All Templates',
  'Sales',
  'Lead Gen',
  'Webinar',
  'Membership',
  'Services',
  'Education',
  'SaaS',
  'E-commerce',
  'Coaching',
  'Agency',
  'Real Estate',
]

export interface TemplateData {
  id: string
  name: string
  description: string
  category: string
  pages: number
  popular: boolean
  premium: boolean
  thumbnail?: string
  avgConversion?: string
  pageDefinitions: Array<{
    name: string
    type: 'landing' | 'sales' | 'checkout' | 'upsell' | 'thankyou' | 'webinar' | 'membership'
    content: {
      html: string
      css: string
    }
  }>
}

export const TEMPLATES: TemplateData[] = [
  // SALES TEMPLATES
  {
    id: 'tpl-product-launch',
    name: 'Product Launch Pro',
    description: 'High-converting product launch funnel with countdown timer and social proof',
    category: 'Sales',
    pages: 4,
    popular: true,
    premium: false,
    avgConversion: '12.5%',
    pageDefinitions: [
      {
        name: 'Landing Page',
        type: 'landing',
        content: {
          html: '<section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4"><div class="max-w-4xl mx-auto text-center"><h1 class="text-5xl font-bold mb-4">Transform Your Life in 30 Days</h1><p class="text-xl mb-8">Join 10,000+ people who achieved their goals</p><button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">Get Started Now</button></div></section>',
          css: '',
        },
      },
      {
        name: 'Sales Page',
        type: 'sales',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto"><h2 class="text-4xl font-bold mb-8">Why Choose Us?</h2><div class="grid md:grid-cols-3 gap-8"><div class="text-center"><div class="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4"></div><h3 class="text-xl font-semibold mb-2">Feature One</h3><p class="text-gray-600">Amazing benefit description</p></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Checkout',
        type: 'checkout',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-2xl mx-auto"><h2 class="text-3xl font-bold mb-8">Complete Your Order</h2><form class="space-y-4"><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><button class="w-full bg-blue-600 text-white py-3 rounded-lg">Complete Purchase</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Thank You',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-4xl font-bold mb-4">Thank You!</h1><p class="text-xl text-gray-600 mb-8">Your order has been confirmed</p></div></section>',
          css: '',
        },
      },
    ],
  },
  {
    id: 'tpl-sales-letter',
    name: 'Long-Form Sales Letter',
    description: 'Classic long-form sales page for high-ticket offers',
    category: 'Sales',
    pages: 2,
    popular: true,
    premium: false,
    avgConversion: '8.9%',
    pageDefinitions: [
      {
        name: 'Sales Letter',
        type: 'sales',
        content: {
          html: '<section class="max-w-4xl mx-auto py-16 px-4"><h1 class="text-5xl font-bold mb-8 text-center">Discover The Secret To...</h1><p class="text-xl leading-relaxed mb-6">Lorem ipsum dolor sit amet...</p></section>',
          css: '',
        },
      },
      {
        name: 'Order Form',
        type: 'checkout',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"><h2 class="text-3xl font-bold mb-6">Secure Your Spot Now</h2><form class="space-y-4"><input type="text" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg" /><button class="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-bold">Yes! I Want This</button></form></div></section>',
          css: '',
        },
      },
    ],
  },
  {
    id: 'tpl-tripwire-offer',
    name: 'Tripwire Offer',
    description: 'Low-ticket offer to convert cold traffic',
    category: 'Sales',
    pages: 3,
    popular: false,
    premium: false,
    avgConversion: '15.2%',
    pageDefinitions: [
      {
        name: 'Offer Page',
        type: 'landing',
        content: {
          html: '<section class="bg-yellow-50 py-16 px-4"><div class="max-w-3xl mx-auto text-center"><div class="bg-red-600 text-white inline-block px-4 py-2 rounded-full mb-4">LIMITED TIME OFFER</div><h1 class="text-4xl font-bold mb-4">Get This For Just $7!</h1><p class="text-xl mb-8">Usually $97 - Save 93% Today Only</p><button class="bg-red-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-red-700">Claim Your Discount</button></div></section>',
          css: '',
        },
      },
      {
        name: 'Checkout',
        type: 'checkout',
        content: {
          html: '<section class="py-12 px-4"><div class="max-w-lg mx-auto"><div class="bg-green-100 border border-green-400 rounded-lg p-4 mb-6"><p class="text-green-800 font-semibold">🎉 Your $7 discount is applied!</p></div><form class="space-y-4"><button class="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-bold">Complete Order - $7</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Upsell',
        type: 'upsell',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-3xl mx-auto text-center"><h1 class="text-4xl font-bold mb-4">Wait! Special One-Time Offer</h1><p class="text-xl mb-8">Add this premium upgrade for just $27 more</p><button class="bg-blue-600 text-white px-8 py-3 rounded-lg mr-4">Yes, Add This!</button><button class="text-gray-600 underline">No thanks, I\'ll pass</button></div></section>',
          css: '',
        },
      },
    ],
  },

  // LEAD GEN TEMPLATES
  {
    id: 'tpl-lead-magnet',
    name: 'Lead Magnet Funnel',
    description: 'Capture emails with a compelling free offer',
    category: 'Lead Gen',
    pages: 3,
    popular: true,
    premium: false,
    avgConversion: '18.2%',
    pageDefinitions: [
      {
        name: 'Opt-in Page',
        type: 'landing',
        content: {
          html: '<section class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-500 to-pink-500"><div class="max-w-2xl mx-auto text-center text-white"><h1 class="text-5xl font-bold mb-6">Download Your Free Guide</h1><p class="text-2xl mb-8">Learn the 7 secrets to success</p><form class="max-w-md mx-auto"><input type="email" placeholder="Enter your email" class="w-full px-6 py-4 rounded-lg text-gray-900 mb-4" /><button class="w-full bg-white text-purple-600 py-4 rounded-lg font-bold text-xl hover:bg-gray-100">Get Instant Access</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Thank You',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-4xl font-bold mb-4">Check Your Email!</h1><p class="text-xl text-gray-600 mb-8">Your free guide is on its way to your inbox</p><div class="bg-blue-50 rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">While you wait...</h3><p class="mb-4">Check out our premium course</p><button class="bg-blue-600 text-white px-8 py-3 rounded-lg">Learn More</button></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Download Page',
        type: 'thankyou',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-3xl mx-auto text-center"><h1 class="text-4xl font-bold mb-8">Your Guide is Ready!</h1><a href="#" class="inline-block bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-green-700">Download Now</a></div></section>',
          css: '',
        },
      },
    ],
  },
  {
    id: 'tpl-quiz-funnel',
    name: 'Quiz Funnel',
    description: 'Interactive quiz to segment and capture leads',
    category: 'Lead Gen',
    pages: 4,
    popular: true,
    premium: true,
    avgConversion: '22.5%',
    pageDefinitions: [
      {
        name: 'Quiz Start',
        type: 'landing',
        content: {
          html: '<section class="min-h-screen flex items-center justify-center px-4"><div class="max-w-2xl mx-auto text-center"><h1 class="text-5xl font-bold mb-6">What\'s Your Business Type?</h1><p class="text-xl mb-8">Take this 2-minute quiz to get personalized recommendations</p><button class="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold">Start Quiz</button></div></section>',
          css: '',
        },
      },
      {
        name: 'Quiz Questions',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-2xl mx-auto"><div class="mb-8"><div class="bg-gray-200 h-2 rounded-full"><div class="bg-blue-600 h-2 rounded-full" style="width: 33%"></div></div><p class="text-sm text-gray-600 mt-2">Question 1 of 3</p></div><h2 class="text-3xl font-bold mb-8">What is your biggest challenge?</h2><div class="space-y-4"><button class="w-full text-left px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-blue-600">Option A</button><button class="w-full text-left px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-blue-600">Option B</button></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Email Capture',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-2xl mx-auto text-center"><h2 class="text-4xl font-bold mb-6">Get Your Personalized Results</h2><p class="text-xl mb-8">Enter your email to see your custom recommendation</p><form class="max-w-md mx-auto"><input type="email" placeholder="Your email" class="w-full px-6 py-4 border-2 rounded-lg mb-4" /><button class="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl">Show My Results</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Results Page',
        type: 'thankyou',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-3xl mx-auto"><h1 class="text-4xl font-bold mb-8">Your Results Are In!</h1><div class="bg-blue-50 rounded-lg p-8 mb-8"><h3 class="text-2xl font-bold mb-4">You are a: Growth-Stage Business</h3><p class="text-lg mb-4">Based on your answers, here\'s what we recommend...</p></div><button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">Get Your Custom Plan</button></div></section>',
          css: '',
        },
      },
    ],
  },
  {
    id: 'tpl-ebook-landing',
    name: 'eBook Landing Page',
    description: 'Professional landing page for eBook downloads',
    category: 'Lead Gen',
    pages: 2,
    popular: false,
    premium: false,
    avgConversion: '14.8%',
    pageDefinitions: [
      {
        name: 'Landing Page',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"><div><img src="https://via.placeholder.com/400x600" alt="eBook Cover" class="rounded-lg shadow-2xl" /></div><div><h1 class="text-5xl font-bold mb-6">Free eBook: The Ultimate Guide</h1><ul class="space-y-3 mb-8"><li>✓ Learn proven strategies</li><li>✓ Step-by-step instructions</li><li>✓ Real-world examples</li></ul><form><input type="email" placeholder="Enter your email" class="w-full px-4 py-3 border rounded-lg mb-4" /><button class="w-full bg-green-600 text-white py-3 rounded-lg font-bold">Download Free eBook</button></form></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Thank You',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-4xl font-bold mb-4">Success! Check Your Email</h1><p class="text-xl text-gray-600 mb-8">Your eBook download link has been sent</p></div></section>',
          css: '',
        },
      },
    ],
  },

  // WEBINAR TEMPLATES
  {
    id: 'tpl-webinar-registration',
    name: 'Webinar Registration',
    description: 'Drive registrations for your webinars and events',
    category: 'Webinar',
    pages: 5,
    popular: true,
    premium: false,
    avgConversion: '15.7%',
    pageDefinitions: [
      {
        name: 'Registration Page',
        type: 'webinar',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12"><div><h1 class="text-5xl font-bold mb-6">Free Live Webinar</h1><h2 class="text-3xl mb-8">How to 10X Your Business in 90 Days</h2><ul class="space-y-4 mb-8"><li class="flex items-start"><span class="text-green-600 mr-2">✓</span><span>Learn the exact system we used to scale to 7 figures</span></li></ul></div><div class="bg-white shadow-xl rounded-lg p-8"><h3 class="text-2xl font-bold mb-6">Reserve Your Spot</h3><form class="space-y-4"><input type="text" placeholder="First Name" class="w-full px-4 py-3 border rounded-lg" /><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><button class="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl">Register Now (FREE)</button></form></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Confirmation',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-3xl mx-auto"><h1 class="text-4xl font-bold mb-4">You\'re Registered!</h1><p class="text-xl mb-8">Check your email for webinar access details</p><div class="bg-blue-50 rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Webinar Details</h3><p class="text-lg mb-2">📅 Tuesday, March 15th</p><p class="text-lg mb-6">🕐 2:00 PM EST</p><button class="bg-blue-600 text-white px-8 py-3 rounded-lg">Add to Calendar</button></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Webinar Room',
        type: 'webinar',
        content: {
          html: '<section class="bg-black min-h-screen"><div class="max-w-7xl mx-auto py-8 px-4"><div class="aspect-video bg-gray-900 rounded-lg mb-8 flex items-center justify-center"><p class="text-white text-2xl">Video Player</p></div><div class="bg-white rounded-lg p-6"><h2 class="text-2xl font-bold mb-4">Live Chat</h2><div class="h-64 bg-gray-50 rounded p-4 mb-4 overflow-y-auto"><p class="text-gray-600">Chat messages appear here...</p></div><input type="text" placeholder="Type your message..." class="w-full px-4 py-2 border rounded-lg" /></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Replay Page',
        type: 'webinar',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-5xl mx-auto"><div class="bg-red-600 text-white text-center py-4 rounded-lg mb-8"><p class="text-xl font-bold">⏰ Replay Available for 48 Hours Only</p></div><div class="aspect-video bg-gray-900 rounded-lg mb-8"></div><h1 class="text-4xl font-bold mb-6">Webinar Replay: 10X Your Business</h1><button class="bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-bold">Get Special Offer</button></div></section>',
          css: '',
        },
      },
      {
        name: 'Offer Page',
        type: 'sales',
        content: {
          html: '<section class="py-16 px-4 bg-gradient-to-b from-blue-50 to-white"><div class="max-w-4xl mx-auto text-center"><h1 class="text-5xl font-bold mb-6">Special Webinar Offer</h1><p class="text-2xl mb-8">Get 50% OFF - Today Only</p><div class="bg-white shadow-2xl rounded-lg p-12 mb-8"><div class="text-6xl font-bold mb-4">$497</div><p class="text-2xl text-gray-600 line-through mb-2">$997</p><p class="text-green-600 font-bold text-xl mb-8">Save $500 Today</p><button class="bg-green-600 text-white px-12 py-4 rounded-lg text-2xl font-bold hover:bg-green-700">Claim Your Discount</button></div></div></section>',
          css: '',
        },
      },
    ],
  },
  {
    id: 'tpl-automated-webinar',
    name: 'Automated Webinar',
    description: 'Evergreen automated webinar funnel',
    category: 'Webinar',
    pages: 4,
    popular: false,
    premium: true,
    avgConversion: '11.3%',
    pageDefinitions: [
      {
        name: 'Registration',
        type: 'webinar',
        content: {
          html: '<section class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white"><div class="max-w-4xl mx-auto text-center"><h1 class="text-6xl font-bold mb-6">Free Training Webinar</h1><p class="text-2xl mb-8">Choose your preferred time slot</p><div class="bg-white text-gray-900 rounded-lg p-8 max-w-md mx-auto"><div class="space-y-3 mb-6"><button class="w-full py-3 border-2 border-blue-600 rounded-lg hover:bg-blue-50">Today at 3:00 PM</button><button class="w-full py-3 border-2 border-blue-600 rounded-lg hover:bg-blue-50">Tomorrow at 11:00 AM</button></div><form><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg mb-4" /><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Save My Spot</button></form></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Webinar Room',
        type: 'webinar',
        content: {
          html: '<section class="bg-gray-900 min-h-screen py-8 px-4"><div class="max-w-6xl mx-auto"><div class="aspect-video bg-black rounded-lg mb-4"></div><div class="text-white text-center py-4"><p class="text-xl">Webinar starts in: <span class="font-bold">05:23</span></p></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Offer Page',
        type: 'sales',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto"><div class="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 mb-8 text-center"><p class="text-2xl font-bold">⏰ This offer expires in 15 minutes!</p></div><h1 class="text-5xl font-bold mb-8 text-center">Exclusive Webinar Offer</h1><div class="bg-white shadow-xl rounded-lg p-12"><button class="w-full bg-red-600 text-white py-6 rounded-lg text-2xl font-bold hover:bg-red-700">Get Instant Access - $297</button></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Thank You',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-5xl font-bold mb-6">Welcome Aboard!</h1><p class="text-xl mb-8">Check your email for access instructions</p></div></section>',
          css: '',
        },
      },
    ],
  },

  // MEMBERSHIP TEMPLATES
  {
    id: 'tpl-membership-site',
    name: 'Membership Site',
    description: 'Complete membership site with content protection',
    category: 'Membership',
    pages: 5,
    popular: true,
    premium: true,
    avgConversion: '9.5%',
    pageDefinitions: [
      {
        name: 'Sales Page',
        type: 'membership',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-5xl mx-auto"><h1 class="text-5xl font-bold text-center mb-12">Join Our Exclusive Community</h1><div class="grid md:grid-cols-3 gap-8 mb-12"><div class="bg-white shadow-lg rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Monthly</h3><div class="text-4xl font-bold mb-6">$49<span class="text-lg text-gray-600">/mo</span></div><ul class="space-y-3 mb-8"><li>✓ All course access</li><li>✓ Community forum</li><li>✓ Monthly Q&A</li></ul><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Start Trial</button></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Checkout',
        type: 'checkout',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-2xl mx-auto"><h2 class="text-3xl font-bold mb-8">Complete Your Membership</h2><div class="bg-blue-50 rounded-lg p-6 mb-8"><p class="font-semibold">Selected Plan: Monthly - $49/mo</p></div><form class="space-y-4"><button class="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl">Join Now</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Member Dashboard',
        type: 'membership',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-6xl mx-auto"><h1 class="text-4xl font-bold mb-8">Welcome Back!</h1><div class="grid md:grid-cols-3 gap-6"><div class="bg-white shadow rounded-lg p-6"><h3 class="text-xl font-bold mb-4">Continue Learning</h3><div class="space-y-3"><div class="flex items-center gap-3"><div class="w-12 h-12 bg-blue-100 rounded"></div><div><p class="font-semibold">Module 1: Getting Started</p><p class="text-sm text-gray-600">50% complete</p></div></div></div></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Course Content',
        type: 'membership',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-5xl mx-auto grid md:grid-cols-4 gap-8"><div class="md:col-span-1"><h3 class="font-bold mb-4">Course Modules</h3><div class="space-y-2"><button class="w-full text-left px-4 py-2 bg-blue-50 rounded">Module 1</button><button class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded">Module 2</button></div></div><div class="md:col-span-3"><div class="aspect-video bg-gray-900 rounded-lg mb-6"></div><h1 class="text-3xl font-bold mb-4">Lesson 1: Introduction</h1><p class="text-lg text-gray-600">Lesson content goes here...</p></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Community Forum',
        type: 'membership',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-5xl mx-auto"><h1 class="text-4xl font-bold mb-8">Community Forum</h1><div class="space-y-4"><div class="bg-white shadow rounded-lg p-6"><div class="flex items-start gap-4"><div class="w-12 h-12 bg-gray-200 rounded-full"></div><div class="flex-1"><h3 class="font-bold mb-2">Discussion Topic Title</h3><p class="text-gray-600 mb-2">Preview of the discussion content...</p><div class="flex gap-4 text-sm text-gray-500"><span>12 replies</span><span>•</span><span>2 hours ago</span></div></div></div></div></div></div></section>',
          css: '',
        },
      },
    ],
  },

  // SAAS TEMPLATES
  {
    id: 'tpl-saas-landing',
    name: 'SaaS Landing Page',
    description: 'Modern SaaS product landing page with free trial',
    category: 'SaaS',
    pages: 3,
    popular: true,
    premium: false,
    avgConversion: '13.8%',
    pageDefinitions: [
      {
        name: 'Landing Page',
        type: 'landing',
        content: {
          html: '<section class="py-20 px-4"><div class="max-w-6xl mx-auto text-center"><h1 class="text-6xl font-bold mb-6">The All-in-One Platform</h1><p class="text-2xl text-gray-600 mb-8">Everything you need to grow your business</p><button class="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700">Start Free Trial</button><p class="text-gray-500 mt-4">No credit card required</p></div></section><section class="py-20 px-4 bg-gray-50"><div class="max-w-6xl mx-auto"><h2 class="text-4xl font-bold text-center mb-12">Powerful Features</h2><div class="grid md:grid-cols-3 gap-8"><div class="bg-white rounded-lg p-8 shadow"><div class="w-16 h-16 bg-blue-100 rounded-lg mb-4"></div><h3 class="text-2xl font-bold mb-3">Feature One</h3><p class="text-gray-600">Description of amazing feature</p></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Pricing',
        type: 'sales',
        content: {
          html: '<section class="py-20 px-4"><div class="max-w-6xl mx-auto"><h1 class="text-5xl font-bold text-center mb-4">Simple, Transparent Pricing</h1><p class="text-xl text-center text-gray-600 mb-12">Choose the plan that fits your needs</p><div class="grid md:grid-cols-3 gap-8"><div class="border-2 rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Starter</h3><div class="text-5xl font-bold mb-6">$29<span class="text-xl text-gray-600">/mo</span></div><ul class="space-y-3 mb-8"><li>✓ Up to 1,000 contacts</li><li>✓ Basic features</li><li>✓ Email support</li></ul><button class="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50">Start Free Trial</button></div><div class="border-4 border-blue-600 rounded-lg p-8 relative"><div class="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-sm rounded-bl-lg">Popular</div><h3 class="text-2xl font-bold mb-4">Professional</h3><div class="text-5xl font-bold mb-6">$79<span class="text-xl text-gray-600">/mo</span></div><ul class="space-y-3 mb-8"><li>✓ Up to 10,000 contacts</li><li>✓ All features</li><li>✓ Priority support</li></ul><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Start Free Trial</button></div><div class="border-2 rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Enterprise</h3><div class="text-5xl font-bold mb-6">$199<span class="text-xl text-gray-600">/mo</span></div><ul class="space-y-3 mb-8"><li>✓ Unlimited contacts</li><li>✓ Custom features</li><li>✓ Dedicated support</li></ul><button class="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-bold hover:bg-blue-50">Contact Sales</button></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Sign Up',
        type: 'checkout',
        content: {
          html: '<section class="min-h-screen flex items-center justify-center px-4 bg-gray-50"><div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8"><h2 class="text-3xl font-bold mb-8 text-center">Start Your Free Trial</h2><form class="space-y-4"><input type="text" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg" /><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><input type="password" placeholder="Password" class="w-full px-4 py-3 border rounded-lg" /><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Create Account</button></form><p class="text-center text-sm text-gray-600 mt-4">14-day free trial • No credit card required</p></div></section>',
          css: '',
        },
      },
    ],
  },

  // E-COMMERCE TEMPLATES
  {
    id: 'tpl-product-page',
    name: 'Product Sales Page',
    description: 'High-converting product page for e-commerce',
    category: 'E-commerce',
    pages: 3,
    popular: true,
    premium: false,
    avgConversion: '10.2%',
    pageDefinitions: [
      {
        name: 'Product Page',
        type: 'sales',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12"><div><img src="https://via.placeholder.com/600x600" alt="Product" class="rounded-lg shadow-lg" /></div><div><h1 class="text-4xl font-bold mb-4">Premium Product Name</h1><div class="flex items-center gap-2 mb-4"><div class="text-yellow-400">★★★★★</div><span class="text-gray-600">(247 reviews)</span></div><div class="text-5xl font-bold mb-6">$99.00</div><p class="text-xl text-gray-600 mb-8">Product description highlighting key benefits and features...</p><button class="w-full bg-green-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-green-700 mb-4">Add to Cart</button><div class="space-y-3 text-gray-600"><p>✓ Free shipping on orders over $50</p><p>✓ 30-day money-back guarantee</p><p>✓ Secure checkout</p></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Cart',
        type: 'checkout',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto"><h1 class="text-4xl font-bold mb-8">Shopping Cart</h1><div class="bg-white shadow rounded-lg p-6 mb-6"><div class="flex items-center gap-6"><img src="https://via.placeholder.com/100x100" alt="Product" class="rounded" /><div class="flex-1"><h3 class="font-bold text-lg">Product Name</h3><p class="text-gray-600">$99.00</p></div><button class="text-red-600">Remove</button></div></div><div class="bg-gray-50 rounded-lg p-6"><div class="flex justify-between text-xl font-bold mb-4"><span>Total:</span><span>$99.00</span></div><button class="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-blue-700">Proceed to Checkout</button></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Checkout',
        type: 'checkout',
        content: {
          html: '<section class="py-16 px-4 bg-gray-50"><div class="max-w-5xl mx-auto grid md:grid-cols-3 gap-8"><div class="md:col-span-2 bg-white rounded-lg shadow p-8"><h2 class="text-2xl font-bold mb-6">Shipping Information</h2><form class="space-y-4"><input type="text" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg" /><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><input type="text" placeholder="Address" class="w-full px-4 py-3 border rounded-lg" /><button class="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700">Complete Order</button></form></div><div class="bg-white rounded-lg shadow p-8"><h3 class="text-xl font-bold mb-6">Order Summary</h3><div class="space-y-3 mb-6"><div class="flex justify-between"><span>Subtotal</span><span>$99.00</span></div><div class="flex justify-between"><span>Shipping</span><span>Free</span></div></div><div class="border-t pt-4"><div class="flex justify-between text-xl font-bold"><span>Total</span><span>$99.00</span></div></div></div></div></section>',
          css: '',
        },
      },
    ],
  },

  // COACHING TEMPLATES
  {
    id: 'tpl-coaching-application',
    name: 'Coaching Application Funnel',
    description: 'High-ticket coaching application and booking funnel',
    category: 'Coaching',
    pages: 4,
    popular: true,
    premium: true,
    avgConversion: '7.5%',
    pageDefinitions: [
      {
        name: 'VSL Page',
        type: 'landing',
        content: {
          html: '<section class="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white"><div class="max-w-4xl mx-auto text-center"><h1 class="text-5xl font-bold mb-8">Transform Your Life with 1-on-1 Coaching</h1><div class="aspect-video bg-gray-700 rounded-lg mb-8"></div><button class="bg-yellow-500 text-gray-900 px-12 py-4 rounded-lg text-xl font-bold hover:bg-yellow-400">Apply for Coaching</button></div></section>',
          css: '',
        },
      },
      {
        name: 'Application Form',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-2xl mx-auto"><h1 class="text-4xl font-bold mb-4 text-center">Coaching Application</h1><p class="text-xl text-center text-gray-600 mb-12">Tell us about yourself and your goals</p><form class="space-y-6"><div><label class="block font-semibold mb-2">What is your biggest challenge?</label><textarea class="w-full px-4 py-3 border rounded-lg" rows="4"></textarea></div><div><label class="block font-semibold mb-2">What are your goals for the next 90 days?</label><textarea class="w-full px-4 py-3 border rounded-lg" rows="4"></textarea></div><div><label class="block font-semibold mb-2">Why do you want to work with me?</label><textarea class="w-full px-4 py-3 border rounded-lg" rows="4"></textarea></div><button class="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700">Submit Application</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Booking Page',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto"><h1 class="text-4xl font-bold mb-4 text-center">Schedule Your Strategy Call</h1><p class="text-xl text-center text-gray-600 mb-12">Choose a time that works for you</p><div class="grid md:grid-cols-2 gap-8"><div class="bg-white shadow-lg rounded-lg p-8"><h3 class="text-2xl font-bold mb-6">Available Times</h3><div class="space-y-3"><button class="w-full text-left px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600">Monday, March 20 - 2:00 PM</button><button class="w-full text-left px-4 py-3 border-2 border-gray-300 rounded-lg hover:border-blue-600">Tuesday, March 21 - 10:00 AM</button></div></div><div class="bg-blue-50 rounded-lg p-8"><h3 class="text-xl font-bold mb-4">What to Expect:</h3><ul class="space-y-3"><li>✓ 45-minute strategy session</li><li>✓ Personalized action plan</li><li>✓ Q&A about the program</li></ul></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Confirmation',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-5xl font-bold mb-6">Your Call is Confirmed!</h1><p class="text-xl text-gray-600 mb-8">Check your email for calendar invite and preparation materials</p><div class="bg-blue-50 rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Call Details</h3><p class="text-lg mb-2">📅 Monday, March 20th</p><p class="text-lg mb-6">🕐 2:00 PM EST</p><button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">Add to Calendar</button></div></div></section>',
          css: '',
        },
      },
    ],
  },

  // AGENCY TEMPLATES
  {
    id: 'tpl-agency-landing',
    name: 'Agency Services Page',
    description: 'Professional services landing page for agencies',
    category: 'Agency',
    pages: 3,
    popular: false,
    premium: false,
    avgConversion: '11.7%',
    pageDefinitions: [
      {
        name: 'Services Page',
        type: 'landing',
        content: {
          html: '<section class="py-20 px-4"><div class="max-w-6xl mx-auto text-center"><h1 class="text-6xl font-bold mb-6">We Grow Businesses</h1><p class="text-2xl text-gray-600 mb-12">Full-service digital marketing agency</p><button class="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700">Get Free Consultation</button></div></section><section class="py-20 px-4 bg-gray-50"><div class="max-w-6xl mx-auto"><h2 class="text-4xl font-bold text-center mb-12">Our Services</h2><div class="grid md:grid-cols-3 gap-8"><div class="bg-white rounded-lg p-8 shadow"><h3 class="text-2xl font-bold mb-4">SEO</h3><p class="text-gray-600 mb-6">Rank higher on Google and get more organic traffic</p><ul class="space-y-2 text-gray-600"><li>✓ Keyword research</li><li>✓ On-page optimization</li><li>✓ Link building</li></ul></div><div class="bg-white rounded-lg p-8 shadow"><h3 class="text-2xl font-bold mb-4">PPC Advertising</h3><p class="text-gray-600 mb-6">Get instant traffic with targeted ad campaigns</p><ul class="space-y-2 text-gray-600"><li>✓ Google Ads</li><li>✓ Facebook Ads</li><li>✓ Campaign management</li></ul></div><div class="bg-white rounded-lg p-8 shadow"><h3 class="text-2xl font-bold mb-4">Web Design</h3><p class="text-gray-600 mb-6">Beautiful, high-converting websites</p><ul class="space-y-2 text-gray-600"><li>✓ Custom design</li><li>✓ Mobile responsive</li><li>✓ Fast loading</li></ul></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Contact Form',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-12"><div><h1 class="text-4xl font-bold mb-6">Let\'s Talk About Your Project</h1><p class="text-xl text-gray-600 mb-8">Fill out the form and we\'ll get back to you within 24 hours</p><div class="space-y-4"><div class="flex items-start gap-3"><span class="text-blue-600 text-2xl">📞</span><div><p class="font-semibold">Phone</p><p class="text-gray-600">(555) 123-4567</p></div></div><div class="flex items-start gap-3"><span class="text-blue-600 text-2xl">📧</span><div><p class="font-semibold">Email</p><p class="text-gray-600">hello@agency.com</p></div></div></div></div><div class="bg-white shadow-lg rounded-lg p-8"><form class="space-y-4"><input type="text" placeholder="Your Name" class="w-full px-4 py-3 border rounded-lg" /><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><input type="text" placeholder="Company" class="w-full px-4 py-3 border rounded-lg" /><textarea placeholder="Tell us about your project" class="w-full px-4 py-3 border rounded-lg" rows="4"></textarea><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Send Message</button></form></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Thank You',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-5xl font-bold mb-6">Thanks for Reaching Out!</h1><p class="text-xl text-gray-600 mb-8">We\'ll review your inquiry and get back to you within 24 hours</p><div class="bg-blue-50 rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">While you wait...</h3><p class="mb-6">Check out our case studies to see how we\'ve helped other businesses grow</p><button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">View Case Studies</button></div></div></section>',
          css: '',
        },
      },
    ],
  },

  // REAL ESTATE TEMPLATES
  {
    id: 'tpl-real-estate-listing',
    name: 'Real Estate Listing',
    description: 'Property listing and lead capture funnel',
    category: 'Real Estate',
    pages: 3,
    popular: false,
    premium: false,
    avgConversion: '16.3%',
    pageDefinitions: [
      {
        name: 'Property Listing',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-6xl mx-auto"><div class="grid md:grid-cols-2 gap-12 mb-12"><div><img src="https://via.placeholder.com/800x600" alt="Property" class="rounded-lg shadow-lg mb-4" /><div class="grid grid-cols-3 gap-2"><img src="https://via.placeholder.com/200x150" class="rounded" /><img src="https://via.placeholder.com/200x150" class="rounded" /><img src="https://via.placeholder.com/200x150" class="rounded" /></div></div><div><h1 class="text-4xl font-bold mb-4">Luxury Modern Home</h1><div class="text-4xl font-bold text-blue-600 mb-6">$850,000</div><div class="grid grid-cols-3 gap-4 mb-8"><div class="text-center"><div class="text-2xl font-bold">4</div><div class="text-gray-600">Bedrooms</div></div><div class="text-center"><div class="text-2xl font-bold">3</div><div class="text-gray-600">Bathrooms</div></div><div class="text-center"><div class="text-2xl font-bold">2,500</div><div class="text-gray-600">Sq Ft</div></div></div><p class="text-lg text-gray-600 mb-8">Beautiful modern home in prime location. Features include...</p><button class="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700 mb-3">Schedule a Tour</button><button class="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-lg font-bold text-xl hover:bg-blue-50">Request More Info</button></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Tour Request',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4 bg-gray-50"><div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"><h2 class="text-3xl font-bold mb-6">Schedule Your Property Tour</h2><form class="space-y-4"><input type="text" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg" /><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><input type="tel" placeholder="Phone" class="w-full px-4 py-3 border rounded-lg" /><select class="w-full px-4 py-3 border rounded-lg"><option>Preferred Time</option><option>Morning (9am-12pm)</option><option>Afternoon (12pm-5pm)</option><option>Evening (5pm-8pm)</option></select><textarea placeholder="Any special requests?" class="w-full px-4 py-3 border rounded-lg" rows="3"></textarea><button class="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700">Schedule Tour</button></form></div></section>',
          css: '',
        },
      },
      {
        name: 'Confirmation',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-5xl font-bold mb-6">Tour Scheduled!</h1><p class="text-xl text-gray-600 mb-8">We\'ll contact you shortly to confirm the details</p><div class="bg-blue-50 rounded-lg p-8 mb-8"><h3 class="text-2xl font-bold mb-4">What to Expect:</h3><ul class="text-left space-y-2 max-w-md mx-auto"><li>✓ Personal tour with our agent</li><li>✓ Answer all your questions</li><li>✓ Discuss financing options</li></ul></div><button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold">View More Properties</button></div></section>',
          css: '',
        },
      },
    ],
  },

  // EDUCATION TEMPLATES
  {
    id: 'tpl-online-course',
    name: 'Online Course Sales',
    description: 'Complete course sales funnel with video',
    category: 'Education',
    pages: 4,
    popular: true,
    premium: false,
    avgConversion: '9.8%',
    pageDefinitions: [
      {
        name: 'Course Landing',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"><div><h1 class="text-5xl font-bold mb-6">Master [Skill] in 30 Days</h1><p class="text-xl text-gray-600 mb-8">Step-by-step video course with lifetime access</p><ul class="space-y-3 mb-8"><li class="flex items-start gap-2"><span class="text-green-600">✓</span><span>50+ video lessons</span></li><li class="flex items-start gap-2"><span class="text-green-600">✓</span><span>Downloadable resources</span></li><li class="flex items-start gap-2"><span class="text-green-600">✓</span><span>Certificate of completion</span></li></ul><button class="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700">Enroll Now</button></div><div><div class="aspect-video bg-gray-900 rounded-lg"></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Curriculum',
        type: 'sales',
        content: {
          html: '<section class="py-16 px-4 bg-gray-50"><div class="max-w-4xl mx-auto"><h2 class="text-4xl font-bold mb-12 text-center">Course Curriculum</h2><div class="space-y-4"><div class="bg-white rounded-lg shadow p-6"><h3 class="text-2xl font-bold mb-4">Module 1: Getting Started</h3><ul class="space-y-2 text-gray-600"><li>• Lesson 1: Introduction (10 min)</li><li>• Lesson 2: Setup (15 min)</li><li>• Lesson 3: First Steps (20 min)</li></ul></div><div class="bg-white rounded-lg shadow p-6"><h3 class="text-2xl font-bold mb-4">Module 2: Core Concepts</h3><ul class="space-y-2 text-gray-600"><li>• Lesson 4: Fundamentals (25 min)</li><li>• Lesson 5: Best Practices (30 min)</li></ul></div></div><div class="text-center mt-12"><button class="bg-green-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-green-700">Enroll in Course - $197</button></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Checkout',
        type: 'checkout',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8"><div class="md:col-span-2 bg-white rounded-lg shadow p-8"><h2 class="text-3xl font-bold mb-8">Complete Your Enrollment</h2><form class="space-y-4"><input type="text" placeholder="Full Name" class="w-full px-4 py-3 border rounded-lg" /><input type="email" placeholder="Email" class="w-full px-4 py-3 border rounded-lg" /><button class="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-green-700">Enroll Now</button></form></div><div class="bg-white rounded-lg shadow p-8"><h3 class="text-xl font-bold mb-6">Order Summary</h3><div class="space-y-3 mb-6"><p class="font-semibold">Master [Skill] Course</p><div class="flex justify-between text-2xl font-bold"><span>Total</span><span>$197</span></div></div><div class="bg-green-50 rounded p-4 text-sm"><p class="font-semibold mb-2">Includes:</p><ul class="space-y-1 text-gray-600"><li>✓ Lifetime access</li><li>✓ All future updates</li><li>✓ Certificate</li></ul></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Welcome',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-3xl mx-auto"><h1 class="text-5xl font-bold mb-6">Welcome to the Course!</h1><p class="text-xl text-gray-600 mb-12">You now have lifetime access to all course materials</p><div class="bg-blue-50 rounded-lg p-8 mb-8"><h3 class="text-2xl font-bold mb-4">Next Steps:</h3><ol class="text-left space-y-3 max-w-md mx-auto"><li>1. Check your email for login credentials</li><li>2. Complete your profile setup</li><li>3. Start with Module 1</li></ol></div><button class="bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold hover:bg-blue-700">Access Course Now</button></div></section>',
          css: '',
        },
      },
    ],
  },

  // SERVICES TEMPLATES
  {
    id: 'tpl-consultation-booking',
    name: 'Consultation Booking',
    description: 'Professional services consultation funnel',
    category: 'Services',
    pages: 3,
    popular: false,
    premium: false,
    avgConversion: '12.4%',
    pageDefinitions: [
      {
        name: 'Services Overview',
        type: 'landing',
        content: {
          html: '<section class="py-20 px-4"><div class="max-w-5xl mx-auto text-center"><h1 class="text-5xl font-bold mb-6">Professional [Service] Services</h1><p class="text-2xl text-gray-600 mb-12">Get expert help for your business</p><div class="grid md:grid-cols-3 gap-8 mb-12"><div class="bg-white shadow-lg rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Consultation</h3><div class="text-4xl font-bold mb-4">$150</div><p class="text-gray-600 mb-6">60-minute strategy session</p><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Book Now</button></div><div class="bg-white shadow-lg rounded-lg p-8 border-4 border-blue-600"><div class="bg-blue-600 text-white px-3 py-1 text-sm rounded-full inline-block mb-4">Most Popular</div><h3 class="text-2xl font-bold mb-4">Package</h3><div class="text-4xl font-bold mb-4">$1,500</div><p class="text-gray-600 mb-6">Complete done-for-you service</p><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Get Started</button></div><div class="bg-white shadow-lg rounded-lg p-8"><h3 class="text-2xl font-bold mb-4">Retainer</h3><div class="text-4xl font-bold mb-4">$5,000/mo</div><p class="text-gray-600 mb-6">Ongoing support & management</p><button class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Contact Us</button></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Booking Calendar',
        type: 'landing',
        content: {
          html: '<section class="py-16 px-4"><div class="max-w-4xl mx-auto"><h1 class="text-4xl font-bold mb-4 text-center">Book Your Consultation</h1><p class="text-xl text-center text-gray-600 mb-12">Choose a time that works for you</p><div class="grid md:grid-cols-2 gap-8"><div class="bg-white shadow-lg rounded-lg p-8"><h3 class="text-2xl font-bold mb-6">Select Date & Time</h3><div class="space-y-3"><button class="w-full text-left px-4 py-3 border-2 rounded-lg hover:border-blue-600">Monday, March 20 - 10:00 AM</button><button class="w-full text-left px-4 py-3 border-2 rounded-lg hover:border-blue-600">Monday, March 20 - 2:00 PM</button><button class="w-full text-left px-4 py-3 border-2 rounded-lg hover:border-blue-600">Tuesday, March 21 - 11:00 AM</button></div></div><div class="bg-blue-50 rounded-lg p-8"><h3 class="text-xl font-bold mb-4">What You\'ll Get:</h3><ul class="space-y-3"><li>✓ 60-minute consultation</li><li>✓ Personalized strategy</li><li>✓ Action plan</li><li>✓ Q&A session</li></ul><div class="mt-6 pt-6 border-t"><p class="font-semibold text-2xl">Investment: $150</p></div></div></div></div></section>',
          css: '',
        },
      },
      {
        name: 'Confirmation',
        type: 'thankyou',
        content: {
          html: '<section class="py-20 px-4 text-center"><div class="max-w-2xl mx-auto"><h1 class="text-5xl font-bold mb-6">Consultation Booked!</h1><p class="text-xl text-gray-600 mb-8">We\'re looking forward to speaking with you</p><div class="bg-blue-50 rounded-lg p-8 mb-8"><h3 class="text-2xl font-bold mb-4">Appointment Details</h3><p class="text-lg mb-2">📅 Monday, March 20th, 2024</p><p class="text-lg mb-6">🕐 10:00 AM EST</p><button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold mb-4">Add to Calendar</button></div><div class="bg-gray-50 rounded-lg p-6"><p class="font-semibold mb-2">Next Steps:</p><p class="text-gray-600">Check your email for the meeting link and preparation guide</p></div></div></section>',
          css: '',
        },
      },
    ],
  },
]

// Helper function to get templates by category
export function getTemplatesByCategory(category: string): TemplateData[] {
  if (category === 'All Templates') {
    return TEMPLATES
  }
  return TEMPLATES.filter((t) => t.category === category)
}

// Helper function to search templates
export function searchTemplates(query: string): TemplateData[] {
  const lowerQuery = query.toLowerCase()
  return TEMPLATES.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description.toLowerCase().includes(lowerQuery) ||
      t.category.toLowerCase().includes(lowerQuery)
  )
}
