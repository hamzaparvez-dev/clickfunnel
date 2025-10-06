// Puck-ready template data with actual component configurations

export const getPuckTemplateData = (templateType: string) => {
  const templates: Record<string, any> = {
    // PRODUCT LAUNCH PRO
    'landing-product-launch': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-1',
            title: 'Transform Your Business in 30 Days',
            subtitle: 'Join 10,000+ successful entrepreneurs who achieved their goals with our proven system',
            buttonText: 'Get Started Now - Limited Spots',
            buttonLink: '#order',
            backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-1',
            title: 'Everything You Need to Succeed',
            subtitle: 'Comprehensive tools and training to transform your business',
            features: [
              { icon: '🚀', title: 'Fast Implementation', description: 'Get results in days, not months. Our streamlined system is designed for quick wins.' },
              { icon: '📈', title: 'Proven Results', description: 'Over 10,000 businesses have grown using our exact framework.' },
              { icon: '🎯', title: 'Expert Support', description: '24/7 support from our team of experts to guide you every step.' },
              { icon: '💰', title: 'ROI Guarantee', description: 'See positive ROI within 60 days or get your money back.' },
              { icon: '📚', title: 'Complete Training', description: 'Step-by-step video tutorials and downloadable resources.' },
              { icon: '🏆', title: 'Community Access', description: 'Join our exclusive community of successful entrepreneurs.' },
            ],
          },
        },
        {
          type: 'PricingSection',
          props: {
            id: 'pricing-1',
            title: 'Choose Your Plan',
            subtitle: 'Special launch pricing - Save up to 50%',
            plans: [
              { name: 'Starter', price: '$97', features: 'Core training modules\nEmail support\n30-day money-back guarantee\nCommunity access', popular: 'no' },
              { name: 'Professional', price: '$297', features: 'Everything in Starter\nPriority support\n1-on-1 coaching call\nBonus templates\nLifetime updates', popular: 'yes' },
              { name: 'Enterprise', price: '$997', features: 'Everything in Professional\nDone-for-you setup\nWeekly coaching calls\nCustom strategy\nDedicated account manager', popular: 'no' },
            ],
          },
        },
      ],
      root: {},
    },

    'sales-product-launch': {
      content: [
        {
          type: 'HeadingBlock',
          props: {
            id: 'heading-1',
            children: 'Why Thousands Choose Our System',
            align: 'center',
            size: 'text-4xl',
          },
        },
        {
          type: 'TextBlock',
          props: {
            id: 'text-1',
            text: 'After helping over 10,000 businesses transform their results, we\'ve perfected a system that works for anyone, regardless of experience level.',
            align: 'center',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-2',
            title: 'What Makes Us Different',
            subtitle: 'Not just another course - a complete business transformation system',
            features: [
              { icon: '✅', title: 'Step-by-Step Process', description: 'No guesswork. Follow our proven roadmap to success.' },
              { icon: '✅', title: 'Real Results', description: 'See actual case studies from businesses like yours.' },
              { icon: '✅', title: 'Ongoing Updates', description: 'Get lifetime access to all future improvements.' },
            ],
          },
        },
        {
          type: 'ButtonBlock',
          props: {
            id: 'cta-1',
            text: 'Yes! I Want This System',
            href: '#checkout',
            variant: 'primary',
            size: 'lg',
          },
        },
      ],
      root: {},
    },

    // LEAD MAGNET FUNNEL
    'optin-lead-magnet': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-2',
            title: 'Download Your Free Guide',
            subtitle: 'Learn the 7 proven strategies that helped 10,000+ businesses double their revenue',
            buttonText: 'Get Instant Access (100% Free)',
            buttonLink: '#',
            backgroundColor: 'bg-gradient-to-br from-pink-600 to-rose-600',
          },
        },
        {
          type: 'FormSection',
          props: {
            id: 'form-1',
            title: 'Enter Your Email to Download',
            subtitle: 'Join 50,000+ subscribers getting weekly tips',
            buttonText: 'Send Me The Guide',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-3',
            title: 'What You\'ll Learn Inside',
            subtitle: 'This comprehensive guide covers everything you need',
            features: [
              { icon: '📖', title: 'Strategy #1', description: 'The secret to finding your ideal customers' },
              { icon: '📖', title: 'Strategy #2', description: 'How to create irresistible offers' },
              { icon: '📖', title: 'Strategy #3', description: 'The conversion optimization framework' },
            ],
          },
        },
      ],
      root: {},
    },

    // WEBINAR REGISTRATION
    'registration-webinar': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-3',
            title: 'Free Live Training: How to 10X Your Business',
            subtitle: 'Join us for an exclusive masterclass revealing the exact system we used to scale from $0 to $10M',
            buttonText: 'Save My Seat (FREE)',
            buttonLink: '#register',
            backgroundColor: 'bg-gradient-to-br from-blue-600 to-cyan-600',
          },
        },
        {
          type: 'HeadingBlock',
          props: {
            id: 'heading-2',
            children: 'What You\'ll Discover in This Training',
            align: 'center',
            size: 'text-4xl',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-4',
            title: '',
            subtitle: '',
            features: [
              { icon: '✓', title: 'The 3-Step Framework', description: 'Our proven system for rapid business growth' },
              { icon: '✓', title: 'Real Case Studies', description: 'See exactly how we helped 100+ businesses scale' },
              { icon: '✓', title: 'Live Q&A', description: 'Get your specific questions answered live' },
            ],
          },
        },
        {
          type: 'FormSection',
          props: {
            id: 'form-2',
            title: 'Register for Free Webinar',
            subtitle: 'Tuesday, March 21st at 2:00 PM EST',
            buttonText: 'Reserve My Spot Now',
          },
        },
      ],
      root: {},
    },

    // SAAS LANDING PAGE
    'landing-saas': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-4',
            title: 'The All-in-One Platform for Modern Teams',
            subtitle: 'Everything you need to manage, grow, and scale your business in one powerful platform',
            buttonText: 'Start Free 14-Day Trial',
            buttonLink: '#signup',
            backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-5',
            title: 'Everything You Need, Nothing You Don\'t',
            subtitle: 'Powerful features that actually help you grow',
            features: [
              { icon: '⚡', title: 'Lightning Fast', description: 'Built for speed. Load times under 1 second guaranteed.' },
              { icon: '🔒', title: 'Bank-Level Security', description: 'Enterprise-grade encryption and compliance.' },
              { icon: '📊', title: 'Advanced Analytics', description: 'Real-time insights into your business performance.' },
              { icon: '🔄', title: 'Seamless Integrations', description: 'Connect with 1000+ tools you already use.' },
              { icon: '👥', title: 'Team Collaboration', description: 'Work together in real-time from anywhere.' },
              { icon: '📱', title: 'Mobile Apps', description: 'Native iOS and Android apps included.' },
            ],
          },
        },
        {
          type: 'PricingSection',
          props: {
            id: 'pricing-2',
            title: 'Simple, Transparent Pricing',
            subtitle: 'Choose the plan that fits your team',
            plans: [
              { name: 'Starter', price: '$29', features: 'Up to 5 team members\n10,000 records\nBasic features\nEmail support', popular: 'no' },
              { name: 'Professional', price: '$79', features: 'Up to 25 team members\n100,000 records\nAll features\nPriority support\nAdvanced analytics', popular: 'yes' },
              { name: 'Enterprise', price: '$199', features: 'Unlimited team members\nUnlimited records\nCustom features\nDedicated support\nSLA guarantee', popular: 'no' },
            ],
          },
        },
      ],
      root: {},
    },

    // E-COMMERCE PRODUCT PAGE
    'product-ecommerce': {
      content: [
        {
          type: 'HeadingBlock',
          props: {
            id: 'heading-3',
            children: 'Premium Wireless Headphones',
            align: 'center',
            size: 'text-6xl',
          },
        },
        {
          type: 'TextBlock',
          props: {
            id: 'text-2',
            text: '⭐⭐⭐⭐⭐ 4.9/5 from 2,847 reviews',
            align: 'center',
          },
        },
        {
          type: 'ImageBlock',
          props: {
            id: 'image-1',
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            alt: 'Premium Headphones',
            width: 'max-w-2xl',
          },
        },
        {
          type: 'HeadingBlock',
          props: {
            id: 'price-1',
            children: '$299.00',
            align: 'center',
            size: 'text-4xl',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-6',
            title: 'Premium Features',
            subtitle: 'Experience audio like never before',
            features: [
              { icon: '🎵', title: 'Studio Quality Sound', description: '40mm drivers with Hi-Res audio certification' },
              { icon: '🔋', title: '30-Hour Battery', description: 'All-day listening with fast charging' },
              { icon: '🎧', title: 'Active Noise Cancellation', description: 'Block out the world and focus on your music' },
            ],
          },
        },
        {
          type: 'ButtonBlock',
          props: {
            id: 'cta-2',
            text: 'Add to Cart - Free Shipping',
            href: '#cart',
            variant: 'primary',
            size: 'lg',
          },
        },
      ],
      root: {},
    },

    // COACHING APPLICATION
    'vsl-coaching': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-5',
            title: 'Transform Your Life with 1-on-1 Coaching',
            subtitle: 'Work directly with me to achieve breakthrough results in 90 days',
            buttonText: 'Apply for Coaching',
            buttonLink: '#apply',
            backgroundColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
          },
        },
        {
          type: 'HeadingBlock',
          props: {
            id: 'heading-4',
            children: 'What You\'ll Achieve',
            align: 'center',
            size: 'text-4xl',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-7',
            title: '',
            subtitle: '',
            features: [
              { icon: '🎯', title: 'Crystal Clear Vision', description: 'Define exactly what you want and create your roadmap' },
              { icon: '💪', title: 'Breakthrough Mindset', description: 'Overcome limiting beliefs holding you back' },
              { icon: '📈', title: 'Measurable Results', description: 'Track your progress with concrete metrics' },
            ],
          },
        },
        {
          type: 'FormSection',
          props: {
            id: 'form-3',
            title: 'Apply for 1-on-1 Coaching',
            subtitle: 'Limited spots available - Apply now',
            buttonText: 'Submit Application',
          },
        },
      ],
      root: {},
    },

    // AGENCY SERVICES
    'services-agency': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-6',
            title: 'We Grow Businesses',
            subtitle: 'Full-service digital marketing agency delivering real results',
            buttonText: 'Get Free Consultation',
            buttonLink: '#contact',
            backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-8',
            title: 'Our Services',
            subtitle: 'Comprehensive solutions for modern businesses',
            features: [
              { icon: '🔍', title: 'SEO Services', description: 'Rank #1 on Google and drive organic traffic' },
              { icon: '📱', title: 'Social Media Marketing', description: 'Build your brand and engage your audience' },
              { icon: '💻', title: 'Web Design & Development', description: 'Beautiful, high-converting websites' },
              { icon: '📧', title: 'Email Marketing', description: 'Nurture leads and increase customer lifetime value' },
              { icon: '📊', title: 'PPC Advertising', description: 'Get instant traffic with optimized ad campaigns' },
              { icon: '📈', title: 'Analytics & Reporting', description: 'Data-driven insights to grow your business' },
            ],
          },
        },
        {
          type: 'FormSection',
          props: {
            id: 'form-4',
            title: 'Get Your Free Marketing Audit',
            subtitle: 'We\'ll analyze your current marketing and show you opportunities',
            buttonText: 'Request Free Audit',
          },
        },
      ],
      root: {},
    },

    // REAL ESTATE LISTING
    'listing-real-estate': {
      content: [
        {
          type: 'HeadingBlock',
          props: {
            id: 'heading-5',
            children: 'Luxury Modern Home',
            align: 'center',
            size: 'text-6xl',
          },
        },
        {
          type: 'HeadingBlock',
          props: {
            id: 'price-2',
            children: '$850,000',
            align: 'center',
            size: 'text-4xl',
          },
        },
        {
          type: 'ImageBlock',
          props: {
            id: 'image-2',
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
            alt: 'Luxury Home',
            width: 'w-full',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-9',
            title: 'Property Features',
            subtitle: 'Everything you need for modern living',
            features: [
              { icon: '🛏️', title: '4 Bedrooms', description: 'Spacious rooms with walk-in closets' },
              { icon: '🛁', title: '3 Bathrooms', description: 'Modern fixtures and finishes' },
              { icon: '📐', title: '2,500 Sq Ft', description: 'Open floor plan with high ceilings' },
              { icon: '🚗', title: '2-Car Garage', description: 'Attached with storage space' },
              { icon: '🏡', title: 'Large Backyard', description: 'Perfect for entertaining' },
              { icon: '📍', title: 'Prime Location', description: 'Top-rated schools and shopping' },
            ],
          },
        },
        {
          type: 'ButtonBlock',
          props: {
            id: 'cta-3',
            text: 'Schedule a Tour',
            href: '#tour',
            variant: 'primary',
            size: 'lg',
          },
        },
      ],
      root: {},
    },

    // ONLINE COURSE
    'landing-course': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-7',
            title: 'Master Digital Marketing in 30 Days',
            subtitle: 'Complete step-by-step video course with lifetime access and certificate',
            buttonText: 'Enroll Now - $197',
            buttonLink: '#enroll',
            backgroundColor: 'bg-gradient-to-br from-blue-600 to-cyan-600',
          },
        },
        {
          type: 'FeatureGrid',
          props: {
            id: 'features-10',
            title: 'What\'s Included',
            subtitle: 'Everything you need to become a digital marketing expert',
            features: [
              { icon: '🎥', title: '50+ Video Lessons', description: 'Over 20 hours of high-quality video content' },
              { icon: '📚', title: 'Downloadable Resources', description: 'Templates, checklists, and worksheets' },
              { icon: '🏆', title: 'Certificate', description: 'Shareable certificate of completion' },
              { icon: '💬', title: 'Community Access', description: 'Join our private student community' },
              { icon: '🔄', title: 'Lifetime Updates', description: 'Get all future course updates free' },
              { icon: '✅', title: 'Assignments & Quizzes', description: 'Practice what you learn' },
            ],
          },
        },
        {
          type: 'PricingSection',
          props: {
            id: 'pricing-3',
            title: 'Enroll Today',
            subtitle: 'One-time payment, lifetime access',
            plans: [
              { name: 'Course Only', price: '$197', features: 'All video lessons\nDownloadable resources\nCertificate of completion\nLifetime access', popular: 'no' },
              { name: 'Course + Coaching', price: '$497', features: 'Everything in Course Only\n4 group coaching calls\nPersonalized feedback\nPriority support\nBonus templates', popular: 'yes' },
            ],
          },
        },
      ],
      root: {},
    },

    // CONSULTATION BOOKING
    'services-consultation': {
      content: [
        {
          type: 'HeroSection',
          props: {
            id: 'hero-8',
            title: 'Professional Consulting Services',
            subtitle: 'Get expert guidance to solve your biggest business challenges',
            buttonText: 'Book Consultation',
            buttonLink: '#book',
            backgroundColor: 'bg-gradient-to-br from-indigo-600 to-purple-600',
          },
        },
        {
          type: 'PricingSection',
          props: {
            id: 'pricing-4',
            title: 'Choose Your Service Level',
            subtitle: 'Flexible options to fit your needs',
            plans: [
              { name: 'Strategy Call', price: '$150', features: '60-minute consultation\nPersonalized strategy\nAction plan\nEmail follow-up', popular: 'no' },
              { name: 'Done-For-You', price: '$1,500', features: 'Complete implementation\nCustom strategy\nOngoing support\n30-day guarantee', popular: 'yes' },
              { name: 'Retainer', price: '$5,000/mo', features: 'Unlimited consultations\nDedicated account manager\nPriority support\nMonthly strategy sessions', popular: 'no' },
            ],
          },
        },
        {
          type: 'FormSection',
          props: {
            id: 'form-5',
            title: 'Book Your Consultation',
            subtitle: 'Choose a time that works for you',
            buttonText: 'Schedule Now',
          },
        },
      ],
      root: {},
    },
  }

  return templates[templateType] || { content: [], root: {} }
}
