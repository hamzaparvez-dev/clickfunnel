// GrapesJS Template Generator
// Generates unique HTML templates for different funnel types

export interface TemplateTheme {
  primary: string
  secondary: string
  gradient: string
  accent: string
  text?: string
  onPrimary?: string
}

export const TEMPLATE_THEMES: Record<string, TemplateTheme> = {
  lead: {
    primary: '#10B981', // green
    secondary: '#059669',
    gradient: 'from-green-600 to-emerald-600',
    accent: '#34D399',
    text: '#FFFFFF',
    onPrimary: '#111827'
  },
  sales: {
    primary: '#8B5CF6', // purple
    secondary: '#7C3AED',
    gradient: 'from-purple-600 to-violet-600',
    accent: '#A78BFA',
    text: '#FFFFFF',
    onPrimary: '#111827'
  },
  // ... (other themes remain the same)
  default: {
    primary: '#6366F1', // indigo
    secondary: '#4F46E5',
    gradient: 'from-indigo-600 to-purple-600',
    accent: '#818CF8',
    text: '#FFFFFF',
    onPrimary: '#111827'
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
    `,
    sales: (theme, name) => `
      <section style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)" class="text-white py-20 px-6">
        <div class="max-w-6xl mx-auto text-center">
          <div class="bg-yellow-400 text-gray-900 inline-block px-8 py-3 rounded-full font-bold text-lg mb-8 animate-pulse">
            ⚡ LIMITED TIME OFFER - 72 HOURS ONLY
          </div>
          <h1 class="text-7xl md:text-8xl font-bold mb-8 leading-tight">${name}</h1>
          <p class="text-4xl mb-6 font-bold" style="color: ${theme.accent}">Save 60% Today Only!</p>
        </div>
      </section>
      <section class="py-24 px-6 bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-20">
            <h2 class="text-6xl font-bold mb-6">Choose Your Perfect Plan</h2>
            <p class="text-2xl opacity-80">Special pricing for early adopters - Limited spots available</p>
          </div>
        </div>
      </section>
    `,
    checkout: (theme, name) => `
      <section class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="bg-white rounded-3xl shadow-2xl overflow-hidden p-12">
            <div class="text-center mb-12">
              <div class="text-6xl mb-4">🔒</div>
              <h1 class="text-6xl font-bold mb-4 text-gray-900">${name}</h1>
              <p class="text-2xl text-gray-600">Complete your secure order</p>
            </div>
          </div>
        </div>
      </section>
    `,
    thankyou: (theme, name) => `
      <section class="min-h-screen flex items-center justify-center py-20 px-6" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)">
        <div class="max-w-4xl mx-auto text-center text-white">
          <div class="text-9xl mb-8 animate-bounce">🎉</div>
          <h1 class="text-8xl font-bold mb-8 leading-tight">${name}!</h1>
          <p class="text-4xl mb-6 font-semibold">Your Order Has Been Confirmed</p>
        </div>
      </section>
    `,
    upsell: (theme, name) => `
      <section class="min-h-screen flex items-center justify-center py-20 px-6" style="background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)">
        <div class="max-w-5xl mx-auto text-center" style="color: ${theme.text || '#FFFFFF'}">
          <div class="inline-block px-10 py-4 rounded-full font-bold text-2xl mb-10 animate-pulse shadow-2xl" style="background-color: ${theme.accent}; color: ${theme.onPrimary || '#111827'}">
            ⏰ WAIT! SPECIAL ONE-TIME OFFER
          </div>
          <h1 class="text-8xl font-bold mb-8 leading-tight">${name}</h1>
        </div>
      </section>
    `,
  }

  const templateFn = templates[pageType] || templates.landing;
  return templateFn(theme, pageName);
}