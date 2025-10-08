import React from 'react'

// Testimonial Component
export const Testimonial = ({ props }: any) => {
  const { 
    name = 'John Doe',
    role = 'CEO, Company',
    quote = 'This product completely transformed my business!',
    image = 'https://ui-avatars.com/api/?name=John+Doe&size=200',
    rating = 5,
    backgroundColor = 'bg-white',
    style = 'card' // card, quote, minimal
  } = props

  const stars = Array.from({ length: 5 }, (_, i) => i < rating)

  if (style === 'quote') {
    return (
      <div className={`${backgroundColor} p-8 rounded-2xl relative`}>
        <div className="text-6xl text-indigo-600 opacity-20 absolute top-4 left-4">"</div>
        <p className="text-xl text-gray-700 italic mb-6 pl-12">{quote}</p>
        <div className="flex items-center space-x-4">
          <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <div className="font-bold text-gray-900">{name}</div>
            <div className="text-gray-600">{role}</div>
            <div className="flex space-x-1 mt-1">
              {stars.map((filled, i) => (
                <span key={i} className={filled ? 'text-yellow-400' : 'text-gray-300'}>★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${backgroundColor} p-8 rounded-2xl shadow-lg`}>
      <div className="flex items-center space-x-4 mb-4">
        <img src={image} alt={name} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <div className="font-bold text-xl text-gray-900">{name}</div>
          <div className="text-gray-600">{role}</div>
          <div className="flex space-x-1 mt-1">
            {stars.map((filled, i) => (
              <span key={i} className={filled ? 'text-yellow-400' : 'text-gray-300'}>★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed">{quote}</p>
    </div>
  )
}

// FAQ Component
export const FAQ = ({ props }: any) => {
  const { 
    title = 'Frequently Asked Questions',
    items = [
      { question: 'How does it work?', answer: 'Our system is designed to be simple and effective.' },
      { question: 'Is there a guarantee?', answer: 'Yes, we offer a 30-day money-back guarantee.' }
    ],
    backgroundColor = 'bg-gray-50'
  } = props

  return (
    <div className={`${backgroundColor} py-16 px-6`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        <div className="space-y-4">
          {items.map((item: any, index: number) => (
            <details key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                {item.question}
                <span className="text-indigo-600 text-2xl">+</span>
              </summary>
              <p className="mt-4 text-gray-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

// Countdown Timer Component
export const CountdownTimer = ({ props }: any) => {
  const { 
    title = 'Limited Time Offer Ends In:',
    backgroundColor = 'bg-red-600',
    textColor = 'text-white'
  } = props

  return (
    <div className={`${backgroundColor} ${textColor} py-8 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="flex justify-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
            <div className="text-4xl font-bold">23</div>
            <div className="text-sm opacity-90">Hours</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
            <div className="text-4xl font-bold">59</div>
            <div className="text-sm opacity-90">Minutes</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[100px]">
            <div className="text-4xl font-bold">45</div>
            <div className="text-sm opacity-90">Seconds</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats/Numbers Component
export const StatsSection = ({ props }: any) => {
  const {
    stats = [
      { number: '10K+', label: 'Happy Customers' },
      { number: '50M+', label: 'Revenue Generated' },
      { number: '99%', label: 'Satisfaction Rate' }
    ],
    backgroundColor = 'bg-indigo-600',
    textColor = 'text-white'
  } = props

  return (
    <div className={`${backgroundColor} ${textColor} py-16 px-6`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Video Section Component
export const VideoSection = ({ props }: any) => {
  const {
    title = 'Watch This Video',
    subtitle = 'Discover how our system works',
    videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail = '',
    backgroundColor = 'bg-gray-900',
    textColor = 'text-white'
  } = props

  return (
    <div className={`${backgroundColor} ${textColor} py-20 px-6`}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-90">{subtitle}</p>
        </div>
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-sm opacity-75">Click to play video</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Progress Bar Component
export const ProgressBar = ({ props }: any) => {
  const {
    title = 'Your Progress',
    percentage = 75,
    showPercentage = true,
    color = 'bg-green-500',
    backgroundColor = 'bg-gray-200'
  } = props

  return (
    <div className="py-8 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {showPercentage && <span className="text-sm font-medium text-gray-600">{percentage}%</span>}
        </div>
        <div className={`w-full ${backgroundColor} rounded-full h-4 overflow-hidden`}>
          <div
            className={`${color} h-full transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Guarantee Badge Component
export const GuaranteeBadge = ({ props }: any) => {
  const {
    title = '30-Day Money Back Guarantee',
    description = 'If you\'re not satisfied, get a full refund. No questions asked.',
    icon = '🛡️',
    style = 'badge' // badge, banner, card
  } = props

  if (style === 'banner') {
    return (
      <div className="bg-green-50 border-l-4 border-green-500 p-6">
        <div className="flex items-center space-x-4">
          <span className="text-5xl">{icon}</span>
          <div>
            <h3 className="text-xl font-bold text-green-900">{title}</h3>
            <p className="text-green-700">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center py-8">
      <div className="bg-white rounded-full shadow-lg px-8 py-4 flex items-center space-x-3 border-2 border-green-500">
        <span className="text-3xl">{icon}</span>
        <div>
          <div className="font-bold text-gray-900">{title}</div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
    </div>
  )
}

// Comparison Table Component
export const ComparisonTable = ({ props }: any) => {
  const {
    title = 'Choose Your Plan',
    plans = [
      {
        name: 'Basic',
        price: '$29',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        highlighted: false
      },
      {
        name: 'Pro',
        price: '$99',
        features: ['All Basic', 'Feature 4', 'Feature 5', 'Feature 6'],
        highlighted: true
      }
    ]
  } = props

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{title}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan: any, index: number) => (
            <div
              key={index}
              className={`rounded-2xl p-8 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white transform scale-105'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    BEST VALUE
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-5xl font-bold mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-green-400">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-lg font-bold ${
                  plan.highlighted
                    ? 'bg-white text-indigo-600'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Social Proof Component
export const SocialProof = ({ props }: any) => {
  const {
    message = '1,247 people are viewing this offer right now',
    type = 'viewers', // viewers, sales, countdown
    backgroundColor = 'bg-orange-500',
    textColor = 'text-white'
  } = props

  return (
    <div className={`${backgroundColor} ${textColor} py-3 px-6 text-center`}>
      <div className="flex items-center justify-center space-x-2">
        <span className="animate-pulse">🔥</span>
        <span className="font-semibold">{message}</span>
      </div>
    </div>
  )
}

// Logo Cloud Component
export const LogoCloud = ({ props }: any) => {
  const {
    title = 'Trusted by leading companies',
    logos = [
      { name: 'Company 1', url: 'https://via.placeholder.com/150x50?text=Logo1' },
      { name: 'Company 2', url: 'https://via.placeholder.com/150x50?text=Logo2' },
      { name: 'Company 3', url: 'https://via.placeholder.com/150x50?text=Logo3' },
    ],
    backgroundColor = 'bg-gray-100'
  } = props

  return (
    <div className={`${backgroundColor} py-12 px-6`}>
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-gray-600 font-semibold mb-8">{title}</h3>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {logos.map((logo: any, index: number) => (
            <div key={index} className="opacity-50 hover:opacity-100 transition-opacity">
              <img src={logo.url} alt={logo.name} className="h-12 grayscale hover:grayscale-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Alert/Banner Component
export const AlertBanner = ({ props }: any) => {
  const {
    message = 'Limited time offer - Save 50% today!',
    type = 'warning', // success, warning, error, info
    dismissible = true
  } = props

  const colors = {
    success: 'bg-green-100 border-green-500 text-green-900',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-900',
    error: 'bg-red-100 border-red-500 text-red-900',
    info: 'bg-blue-100 border-blue-500 text-blue-900'
  }

  return (
    <div className={`${colors[type as keyof typeof colors]} border-l-4 p-4`}>
      <div className="flex items-center justify-between">
        <p className="font-medium">{message}</p>
        {dismissible && (
          <button className="text-xl opacity-50 hover:opacity-100">×</button>
        )}
      </div>
    </div>
  )
}


