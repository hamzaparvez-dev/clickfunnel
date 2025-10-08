// GrapesJS Template Generator
// Generates unique HTML templates for different funnel types

export interface TemplateTheme {
  primary: string
  secondary: string
  gradient: string
  accent: string
}

export const TEMPLATE_THEMES: Record<string, TemplateTheme> = {
  lead: {
    primary: '#10B981', // green
    secondary: '#059669',
    gradient: 'from-green-600 to-emerald-600',
    accent: '#34D399'
  },
  sales: {
    primary: '#8B5CF6', // purple
    secondary: '#7C3AED',
    gradient: 'from-purple-600 to-violet-600',
    accent: '#A78BFA'
  },
  presentation: {
    primary: '#F59E0B', // orange
    secondary: '#D97706',
    gradient: 'from-orange-600 to-amber-600',
    accent: '#FBBF24'
  },
  phone: {
    primary: '#3B82F6', // blue
    secondary: '#2563EB',
    gradient: 'from-blue-600 to-indigo-600',
    accent: '#60A5FA'
  },
  unboxing: {
    primary: '#EC4899', // pink
    secondary: '#DB2777',
    gradient: 'from-pink-600 to-rose-600',
    accent: '#F472B6'
  },
  default: {
    primary: '#6366F1', // indigo
    secondary: '#4F46E5',
    gradient: 'from-indigo-600 to-purple-600',
    accent: '#818CF8'
  }
}

export function getGrapesJSTemplate(pageType: string, templateCategory: string, pageName: string) {
  const theme = TEMPLATE_THEMES[templateCategory as keyof typeof TEMPLATE_THEMES] || TEMPLATE_THEMES.default
  
  const templates: Record<string, (theme: TemplateTheme, name: string) => string> = {
    landing: (theme, name) => `
      <section class="bg-gradient-to-br ${theme.gradient} text-white py-24 px-6 min-h-screen flex items-center">
        <div class="max-w-6xl mx-auto text-center">
          <div class="bg-yellow-400 text-gray-900 inline-block px-6 py-2 rounded-full font-bold text-sm mb-6 animate-pulse">
            ✨ NEW OPPORTUNITY
          </div>
          <h1 class="text-7xl md:text-8xl font-bold mb-6 leading-tight">${name}</h1>
          <p class="text-3xl mb-4 opacity-90">Discover The Secret To Explosive Growth</p>
          <p class="text-xl mb-10 opacity-80 max-w-3xl mx-auto">Join thousands of successful entrepreneurs who transformed their business using our proven system. Get instant access now!</p>
          <a href="#signup" class="bg-white hover:bg-gray-100 text-gray-900 px-14 py-6 rounded-xl font-bold text-2xl inline-block shadow-2xl transition-all transform hover:scale-105" style="color: ${theme.primary}">
            Get Instant Access - 100% FREE →
          </a>
          <p class="text-sm mt-4 opacity-70">✓ No credit card required • ✓ Instant access • ✓ Cancel anytime</p>
        </div>
      </section>

      <section class="py-24 px-6 bg-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20">
            <h2 class="text-6xl font-bold mb-6 text-gray-900">What You'll Get</h2>
            <p class="text-2xl text-gray-600">Everything you need to succeed, all in one place</p>
          </div>
          <div class="grid md:grid-cols-3 gap-10">
            <div class="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="text-7xl mb-6">🚀</div>
              <h3 class="text-3xl font-bold mb-4 text-gray-900">Lightning Fast Results</h3>
              <p class="text-gray-600 text-xl leading-relaxed">See measurable growth in days, not months. Our proven system delivers results faster than anything else on the market.</p>
            </div>
            <div class="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="text-7xl mb-6">💎</div>
              <h3 class="text-3xl font-bold mb-4 text-gray-900">Premium Quality</h3>
              <p class="text-gray-600 text-xl leading-relaxed">World-class service with 24/7 priority support. We're here to ensure your success every step of the way.</p>
            </div>
            <div class="bg-gradient-to-br from-gray-50 to-white p-10 rounded-3xl shadow-xl border-2 border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div class="text-7xl mb-6">🎯</div>
              <h3 class="text-3xl font-bold mb-4 text-gray-900">Proven System</h3>
              <p class="text-gray-600 text-xl leading-relaxed">Trusted by over 50,000 customers worldwide. Join the ranks of successful entrepreneurs.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 px-6" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h2 class="text-6xl font-bold mb-8">Ready To Transform Your Life?</h2>
          <p class="text-2xl mb-12 opacity-90">Join now and get instant access to everything you need</p>
          <a href="#signup" class="bg-white text-gray-900 px-14 py-6 rounded-xl font-bold text-2xl inline-block shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
            Start Your Free Trial Now →
          </a>
          <p class="text-lg mt-6 opacity-80">🔒 100% Secure • 30-Day Money-Back Guarantee</p>
        </div>
      </section>
    `,
    
    sales: (theme, name) => `
      <section style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)" class="text-white py-20 px-6">
        <div class="max-w-6xl mx-auto text-center">
          <div class="bg-yellow-400 text-gray-900 inline-block px-8 py-3 rounded-full font-bold text-lg mb-8 animate-pulse">
            ⚡ LIMITED TIME OFFER - 72 HOURS ONLY
          </div>
          <h1 class="text-7xl md:text-8xl font-bold mb-8 leading-tight">${name}</h1>
          <p class="text-4xl mb-6 font-bold" style="color: ${theme.accent}">Save 60% Today Only!</p>
          <p class="text-2xl mb-8 opacity-90">This exclusive offer expires in:</p>
          <div class="flex justify-center gap-6 mb-8">
            <div class="bg-white/20 backdrop-blur-lg rounded-xl p-6">
              <div class="text-5xl font-bold">23</div>
              <div class="text-sm opacity-80">HOURS</div>
            </div>
            <div class="bg-white/20 backdrop-blur-lg rounded-xl p-6">
              <div class="text-5xl font-bold">59</div>
              <div class="text-sm opacity-80">MINUTES</div>
            </div>
            <div class="bg-white/20 backdrop-blur-lg rounded-xl p-6">
              <div class="text-5xl font-bold">42</div>
              <div class="text-sm opacity-80">SECONDS</div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-24 px-6 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20">
            <h2 class="text-6xl font-bold mb-6">Choose Your Perfect Plan</h2>
            <p class="text-2xl opacity-80">Special pricing for early adopters - Limited spots available</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-gray-800 rounded-3xl p-10 border-2 border-gray-700 hover:border-gray-600 transition-all">
              <h3 class="text-3xl font-bold mb-3">Starter</h3>
              <div class="flex items-baseline mb-8">
                <span class="text-3xl text-gray-400 line-through mr-4">$297</span>
                <span class="text-6xl font-bold">$97</span>
                <span class="text-2xl text-gray-400 ml-2">/mo</span>
              </div>
              <ul class="space-y-4 mb-10 text-lg">
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>All core features included</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>Email support within 24h</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>30-day money-back guarantee</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>Access to community forum</span>
                </li>
              </ul>
              <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-5 rounded-xl font-bold text-xl transition-all shadow-lg">
                Get Started
              </button>
            </div>

            <div class="rounded-3xl p-10 transform scale-110 shadow-2xl relative" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                  ⭐ MOST POPULAR - BEST VALUE
                </span>
              </div>
              <h3 class="text-3xl font-bold mb-3 mt-4">Professional</h3>
              <div class="flex items-baseline mb-8">
                <span class="text-3xl opacity-60 line-through mr-4">$597</span>
                <span class="text-7xl font-bold">$197</span>
                <span class="text-2xl opacity-60 ml-2">/mo</span>
              </div>
              <ul class="space-y-4 mb-10 text-lg">
                <li class="flex items-start gap-3">
                  <span class="text-yellow-300 text-2xl flex-shrink-0">✓</span>
                  <span><strong>All Starter features</strong></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-yellow-300 text-2xl flex-shrink-0">✓</span>
                  <span><strong>Priority support (1-hour response)</strong></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-yellow-300 text-2xl flex-shrink-0">✓</span>
                  <span><strong>Advanced analytics & reporting</strong></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-yellow-300 text-2xl flex-shrink-0">✓</span>
                  <span><strong>Lifetime updates & new features</strong></span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-yellow-300 text-2xl flex-shrink-0">✓</span>
                  <span><strong>Exclusive training materials ($497 value)</strong></span>
                </li>
              </ul>
              <button class="w-full bg-white text-gray-900 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-lg" style="color: ${theme.primary}">
                Get Started Now →
              </button>
            </div>

            <div class="bg-gray-800 rounded-3xl p-10 border-2 border-gray-700 hover:border-gray-600 transition-all">
              <h3 class="text-3xl font-bold mb-3">Enterprise</h3>
              <div class="flex items-baseline mb-8">
                <span class="text-3xl text-gray-400 line-through mr-4">$1,297</span>
                <span class="text-6xl font-bold">$497</span>
                <span class="text-2xl text-gray-400 ml-2">/mo</span>
              </div>
              <ul class="space-y-4 mb-10 text-lg">
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>All Professional features</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>White label solution</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>API access & webhooks</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>Custom integrations</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-green-400 text-2xl flex-shrink-0">✓</span>
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <button class="w-full bg-gray-700 hover:bg-gray-600 text-white py-5 rounded-xl font-bold text-xl transition-all shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 px-6 bg-white">
        <div class="max-w-5xl mx-auto text-center">
          <div class="bg-green-50 border-4 border-green-500 p-12 rounded-3xl shadow-xl">
            <div class="text-8xl mb-6">🛡️</div>
            <h3 class="text-5xl font-bold text-green-900 mb-6">30-Day Money Back Guarantee</h3>
            <p class="text-green-700 text-2xl mb-4">Try it risk-free for 30 days. If you're not completely satisfied, we'll refund every penny.</p>
            <p class="text-green-600 text-lg font-semibold">No questions asked. No hassles. Just results.</p>
          </div>
        </div>
      </section>
    `,
    
    checkout: (theme, name) => `
      <section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div class="p-12">
              <div class="text-center mb-12">
                <div class="text-6xl mb-4">🔒</div>
                <h1 class="text-6xl font-bold mb-4 text-gray-900">${name}</h1>
                <p class="text-2xl text-gray-600">Complete your secure order</p>
                <p class="text-lg text-gray-500 mt-2">🔐 SSL Encrypted • Safe & Secure Checkout</p>
              </div>
              
              <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-6">
                  <div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <span>👤</span>
                      Billing Information
                    </h3>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                    <input type="text" placeholder="John Doe" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input type="email" placeholder="john@example.com" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
                  </div>
                  
                  <div class="pt-4">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <span>💳</span>
                      Payment Details
                    </h3>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Card Number *</label>
                    <input type="text" placeholder="4242 4242 4242 4242" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
                  </div>
                  
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-bold text-gray-700 mb-2">Expiry Date *</label>
                      <input type="text" placeholder="MM/YY" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
                    </div>
                    <div>
                      <label class="block text-sm font-bold text-gray-700 mb-2">CVC *</label>
                      <input type="text" placeholder="123" class="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none text-lg transition-all" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 sticky top-8">
                    <h3 class="text-2xl font-bold text-gray-900 mb-6">Order Summary</h3>
                    
                    <div class="space-y-4 mb-6">
                      <div class="flex justify-between items-center pb-4 border-b border-gray-300">
                        <span class="text-lg text-gray-700">Professional Plan</span>
                        <span class="text-xl font-bold text-gray-900">$197.00</span>
                      </div>
                      <div class="flex justify-between items-center pb-4 border-b border-gray-300">
                        <span class="text-lg text-gray-700">Discount (60% OFF)</span>
                        <span class="text-xl font-bold text-green-600">-$400.00</span>
                      </div>
                      <div class="flex justify-between items-center pb-4 border-b border-gray-300">
                        <span class="text-lg text-gray-700">Tax</span>
                        <span class="text-xl font-bold text-gray-900">$0.00</span>
                      </div>
                    </div>
                    
                    <div class="bg-white rounded-xl p-6 mb-6 shadow-lg">
                      <div class="flex justify-between items-center">
                        <span class="text-2xl font-bold text-gray-900">Total Today</span>
                        <span class="text-5xl font-bold" style="color: ${theme.primary}">$197</span>
                      </div>
                      <p class="text-sm text-gray-500 mt-2">Then $197/month after trial</p>
                    </div>
                    
                    <button class="w-full text-white py-6 rounded-xl font-bold text-2xl shadow-lg hover:shadow-xl transition-all mb-4" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)">
                      Complete Purchase 🔒
                    </button>
                    
                    <div class="text-center space-y-2 text-sm text-gray-600">
                      <p>✓ 30-Day Money-Back Guarantee</p>
                      <p>✓ Instant Access After Purchase</p>
                      <p>✓ Cancel Anytime</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-100 px-12 py-6 border-t border-gray-200">
              <div class="flex items-center justify-center gap-6 text-gray-600">
                <span class="flex items-center gap-2">
                  <span class="text-xl">🔒</span>
                  <span>SSL Encrypted</span>
                </span>
                <span class="text-gray-400">|</span>
                <span class="flex items-center gap-2">
                  <span class="text-xl">💳</span>
                  <span>Stripe Powered</span>
                </span>
                <span class="text-gray-400">|</span>
                <span class="flex items-center gap-2">
                  <span class="text-xl">🛡️</span>
                  <span>100% Secure</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `,
    
    thankyou: (theme, name) => `
      <section class="min-h-screen flex items-center justify-center py-20 px-6" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%)">
        <div class="max-w-4xl mx-auto text-center text-white">
          <div class="text-9xl mb-8 animate-bounce">🎉</div>
          <h1 class="text-8xl font-bold mb-8 leading-tight">${name}!</h1>
          <p class="text-4xl mb-6 font-semibold">Your Order Has Been Confirmed</p>
          <p class="text-2xl mb-12 opacity-90 max-w-2xl mx-auto">We've sent a confirmation email with all your order details and next steps. Check your inbox now!</p>
          
          <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-12 mb-12 shadow-2xl">
            <h2 class="text-4xl font-bold mb-10">What Happens Next?</h2>
            <div class="space-y-6 text-left max-w-2xl mx-auto">
              <div class="flex items-start gap-6 bg-white/5 p-6 rounded-2xl">
                <span class="text-6xl flex-shrink-0">📧</span>
                <div class="text-left">
                  <h3 class="text-2xl font-bold mb-2">Check Your Email</h3>
                  <p class="text-xl opacity-90">You'll receive order confirmation and login credentials within 2 minutes</p>
                </div>
              </div>
              <div class="flex items-start gap-6 bg-white/5 p-6 rounded-2xl">
                <span class="text-6xl flex-shrink-0">🔐</span>
                <div class="text-left">
                  <h3 class="text-2xl font-bold mb-2">Set Up Your Account</h3>
                  <p class="text-xl opacity-90">Follow the setup wizard to configure your account and preferences</p>
                </div>
              </div>
              <div class="flex items-start gap-6 bg-white/5 p-6 rounded-2xl">
                <span class="text-6xl flex-shrink-0">🚀</span>
                <div class="text-left">
                  <h3 class="text-2xl font-bold mb-2">Start Using Right Away</h3>
                  <p class="text-xl opacity-90">Get instant access to all features and start seeing results today</p>
                </div>
              </div>
            </div>
          </div>

          <a href="/dashboard" class="bg-white text-green-600 px-14 py-6 rounded-xl font-bold text-2xl inline-block shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 mb-6">
            Go to Your Dashboard →
          </a>
          
          <p class="text-lg opacity-80">Need help? Contact support anytime at support@example.com</p>
        </div>
      </section>
    `,
    
    upsell: (theme, name) => `
      <section class="min-h-screen flex items-center justify-center py-20 px-6" style="background: linear-gradient(135deg, #F59E0B 0%, #DC2626 100%)">
        <div class="max-w-5xl mx-auto text-center text-white">
          <div class="bg-yellow-400 text-gray-900 inline-block px-10 py-4 rounded-full font-bold text-2xl mb-10 animate-pulse shadow-2xl">
            ⏰ WAIT! SPECIAL ONE-TIME OFFER
          </div>
          <h1 class="text-8xl font-bold mb-8 leading-tight">${name}</h1>
          <p class="text-4xl mb-8 font-semibold">Before You Go...</p>
          <p class="text-3xl mb-16 opacity-90 max-w-3xl mx-auto">Upgrade your order RIGHT NOW and get exclusive bonuses at an insane discount!</p>
          
          <div class="bg-white text-gray-900 rounded-3xl p-12 mb-12 shadow-2xl max-w-4xl mx-auto">
            <div class="text-8xl mb-8">🎁</div>
            <h2 class="text-5xl font-bold mb-10">Premium Upgrade Package</h2>
            
            <div class="grid md:grid-cols-2 gap-6 text-left mb-10">
              <div class="flex items-start gap-4 bg-green-50 p-6 rounded-2xl border-2 border-green-500">
                <span class="text-green-500 text-3xl flex-shrink-0 font-bold">✓</span>
                <div>
                  <h3 class="font-bold text-xl mb-1">Lifetime Access</h3>
                  <p class="text-gray-600">Never pay monthly fees again</p>
                </div>
              </div>
              <div class="flex items-start gap-4 bg-green-50 p-6 rounded-2xl border-2 border-green-500">
                <span class="text-green-500 text-3xl flex-shrink-0 font-bold">✓</span>
                <div>
                  <h3 class="font-bold text-xl mb-1">Priority Support</h3>
                  <p class="text-gray-600">1-hour response time guaranteed</p>
                </div>
              </div>
              <div class="flex items-start gap-4 bg-green-50 p-6 rounded-2xl border-2 border-green-500">
                <span class="text-green-500 text-3xl flex-shrink-0 font-bold">✓</span>
                <div>
                  <h3 class="font-bold text-xl mb-1">Exclusive Training</h3>
                  <p class="text-gray-600">$997 value of premium courses</p>
                </div>
              </div>
              <div class="flex items-start gap-4 bg-green-50 p-6 rounded-2xl border-2 border-green-500">
                <span class="text-green-500 text-3xl flex-shrink-0 font-bold">✓</span>
                <div>
                  <h3 class="font-bold text-xl mb-1">Done-For-You Templates</h3>
                  <p class="text-gray-600">100+ proven templates & funnels</p>
                </div>
              </div>
              <div class="flex items-start gap-4 bg-green-50 p-6 rounded-2xl border-2 border-green-500">
                <span class="text-green-500 text-3xl flex-shrink-0 font-bold">✓</span>
                <div>
                  <h3 class="font-bold text-xl mb-1">Advanced Analytics</h3>
                  <p class="text-gray-600">Deep insights & tracking tools</p>
                </div>
              </div>
              <div class="flex items-start gap-4 bg-green-50 p-6 rounded-2xl border-2 border-green-500">
                <span class="text-green-500 text-3xl flex-shrink-0 font-bold">✓</span>
                <div>
                  <h3 class="font-bold text-xl mb-1">VIP Community</h3>
                  <p class="text-gray-600">Network with top performers</p>
                </div>
              </div>
            </div>
            
            <div class="border-t-4 border-gray-200 pt-10 mb-10">
              <div class="flex items-center justify-center gap-8 mb-6">
                <div class="text-center">
                  <p class="text-gray-500 text-lg mb-1">Regular Price</p>
                  <span class="text-4xl text-gray-400 line-through">$997</span>
                </div>
                <div class="text-6xl text-orange-500">→</div>
                <div class="text-center">
                  <p class="text-orange-600 text-lg mb-1 font-bold">One-Time Offer</p>
                  <span class="text-7xl font-bold text-orange-600">$97</span>
                </div>
              </div>
              <div class="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-8">
                <p class="text-2xl font-bold text-red-600">🔥 Save $900 - This Offer Expires In 10 Minutes!</p>
              </div>
            </div>

            <button class="w-full text-white py-7 rounded-xl font-bold text-3xl shadow-lg hover:shadow-xl transition-all mb-6" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)">
              YES! Add This Upgrade For Just $97 🚀
            </button>
            <a href="#" class="text-gray-500 text-lg hover:text-gray-700 underline">
              No thanks, I'll pass on this limited offer
            </a>
          </div>
          
          <p class="text-xl opacity-80">⚡ This is a ONE-TIME offer. You won't see this again!</p>
        </div>
      </section>
    `,
  }

  const templateFn = templates[pageType] || templates.landing
  return templateFn(theme, pageName)
}

