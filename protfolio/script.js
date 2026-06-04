const translations = {
  en: {
    'site-title': 'Mouad El Ghazi | Digital Craftsman',
    'meta-desc': 'Digital craftsman blending code and design — web developer & graphic designer based in Marrakech, Morocco.',
    'og-title': 'Mouad El Ghazi | Digital Craftsman',
    'og-desc': 'Digital craftsman blending code and design — web developer & graphic designer based in Marrakech, Morocco.',
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-skills': 'Skills',
    'nav-services': 'Services',
    'nav-projects': 'Projects',
    'nav-contact': 'Contact',
    'available': 'Available for work',
    'building': 'Currently building',
    'section-about': 'About',
    'section-skills': 'Skills',
    'section-services': 'Services',
    'section-projects': 'Projects',
    'section-contact': 'Contact',
    'skills-subtitle': 'Development & Design',
    'stat-projects': 'Projects',
    'stat-designs': 'Designs',
    'stat-exp': 'Years Exp.',
    'service-web': 'Web Development',
    'service-uiux': 'UI/UX Design',
    'service-branding': 'Branding',
    'service-motion': 'Motion Graphics',
    'price-prefix': 'Starting at',
    'contact-heading': "Let's Work Together!",
    'contact-desc': 'Feel free to reach out for collaborations or just a friendly chat!',
    'send-btn': 'Send Message',
    'footer-rights': 'All rights reserved.',
    'role-text': 'Developer & Graphic Designer crafting creative digital experiences',
  },
  fr: {
    'site-title': 'Mouad El Ghazi | Artisan du Numérique',
    'meta-desc': 'Artisan du numérique alliant code et design — développeur web & graphiste basé à Marrakech, Maroc.',
    'og-title': 'Mouad El Ghazi | Artisan du Numérique',
    'og-desc': 'Artisan du numérique alliant code et design — développeur web & graphiste basé à Marrakech, Maroc.',
    'nav-home': 'Accueil',
    'nav-about': 'À propos',
    'nav-skills': 'Compétences',
    'nav-services': 'Services',
    'nav-projects': 'Projets',
    'nav-contact': 'Contact',
    'available': 'Disponible pour travailler',
    'building': 'En cours de création',
    'section-about': 'À propos',
    'section-skills': 'Compétences',
    'section-services': 'Services',
    'section-projects': 'Projets',
    'section-contact': 'Contact',
    'skills-subtitle': 'Développement & Design',
    'stat-projects': 'Projets',
    'stat-designs': 'Designs',
    'stat-exp': "Ans d'exp.",
    'service-web': 'Développement Web',
    'service-uiux': 'Design UI/UX',
    'service-branding': 'Identité de Marque',
    'service-motion': 'Motion Design',
    'price-prefix': 'À partir de',
    'contact-heading': 'Travaillons Ensemble !',
    'contact-desc': "N'hésitez pas à me contacter pour des collaborations ou juste pour discuter !",
    'send-btn': 'Envoyer un Message',
    'footer-rights': 'Tous droits réservés.',
    'role-text': 'Développeur & Graphiste créant des expériences numériques créatives',
  },
}

const currencyData = {
  USD: { symbol: '$', label: 'USD', flag: '🇺🇸', rate: 1 },
  MAD: { symbol: '', label: 'MAD', flag: '🇲🇦', rate: 10 },
}

let currentLang = localStorage.getItem('portfolio-lang') || 'en'
let currentCurrency = localStorage.getItem('portfolio-currency') || 'USD'

const cursor = document.querySelector('.custom-cursor')
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .stat, .social-btn, .service-card, .testimonial-card, .case-study')

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`
  cursor.style.top = `${e.clientY}px`
})

hoverTargets.forEach(target => {
  target.addEventListener('mouseenter', () => cursor.classList.add('hover'))
  target.addEventListener('mouseleave', () => cursor.classList.remove('hover'))
})

const heroName = document.getElementById('hero-name')
const nameText = heroName.textContent
heroName.textContent = ''

nameText.split('').forEach((char, index) => {
  const span = document.createElement('span')
  span.textContent = char
  span.className = char === ' ' ? 'space' : 'letter'
  span.style.transitionDelay = `${index * 0.05}s`
  heroName.appendChild(span)
})

window.addEventListener('load', () => {
  document.querySelectorAll('.hero-name .letter').forEach(letter => {
    setTimeout(() => letter.classList.add('visible'), 500)
  })
})

const roleElement = document.getElementById('hero-role')
let roleIndex = 0
let roleTimer = null

function typeRole(text) {
  if (roleTimer) clearTimeout(roleTimer)
  roleElement.textContent = ''
  roleIndex = 0
  const chars = text.split('')

  function typeNext() {
    if (roleIndex < chars.length) {
      roleElement.textContent += chars[roleIndex]
      roleIndex++
      roleTimer = setTimeout(typeNext, 50)
    }
  }

  setTimeout(typeNext, 500 + nameText.replace(/ /g, '').length * 50 + 500)
}

const heroContent = document.querySelector('.hero-content')
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20
  heroContent.style.transform = `translate(${x}px, ${y}px)`
})

const contactForm = document.querySelector('.contact-form')
const formFeedback = document.createElement('div')
formFeedback.className = 'form-feedback'
contactForm.appendChild(formFeedback)

contactForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(contactForm)
  const submitBtn = contactForm.querySelector('.btn')
  submitBtn.textContent = 'Sending...'
  submitBtn.disabled = true

  fetch(contactForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  }).then(() => {
    formFeedback.textContent = "Thanks! I'll get back to you soon."
    formFeedback.className = 'form-feedback success'
    contactForm.reset()
  }).catch(() => {
    formFeedback.textContent = 'Oops! Something went wrong. Please try again.'
    formFeedback.className = 'form-feedback error'
  }).finally(() => {
    const btnText = currentLang === 'fr' ? 'Envoyer un Message' : 'Send Message'
    submitBtn.textContent = btnText
    submitBtn.disabled = false
  })
})

document.querySelectorAll('.rail-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const target = document.querySelector(link.getAttribute('href'))
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
})

const scrollElements = document.querySelectorAll('.section, .service-card, .testimonial-card, .skill-card, .project-card, .case-study, .stat')

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
}

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      const progress = entry.target.querySelector('.skill-progress')
      if (progress) {
        const targetWidth = progress.getAttribute('data-width')
        progress.style.width = targetWidth
      }
      scrollObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

scrollElements.forEach(el => scrollObserver.observe(el))

function applyLanguage(lang) {
  currentLang = lang
  localStorage.setItem('portfolio-lang', lang)
  document.documentElement.lang = lang

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'META') {
        el.setAttribute('content', translations[lang][key])
      } else {
        el.textContent = translations[lang][key]
      }
    }
  })

  const thumb = document.querySelector('.lang-thumb')
  const label = document.getElementById('lang-label')
  const labelMobile = document.getElementById('lang-label-mobile')
  const toggle = document.getElementById('lang-toggle')
  const toggleMobile = document.getElementById('lang-toggle-mobile')
  const nextLang = lang === 'en' ? 'fr' : 'en'
  const nextFlag = nextLang === 'en' ? '🇬🇧' : '🇫🇷'

  thumb.textContent = lang === 'en' ? '🇬🇧' : '🇫🇷'
  const labelText = lang.toUpperCase()
  if (label) label.textContent = labelText
  if (labelMobile) labelMobile.textContent = labelText

  const isActive = lang === 'fr'
  toggle?.classList.toggle('active', isActive)
  toggleMobile?.classList.toggle('active', isActive)

  if (roleElement) {
    const roleText = translations[lang]['role-text']
    if (roleText) typeRole(roleText)
  }
}

function getCurrencySymbol(currency) {
  if (currency === 'MAD') return ''
  return '$'
}

function applyCurrency(currency) {
  currentCurrency = currency
  localStorage.setItem('portfolio-currency', currency)
  const data = currencyData[currency]

  document.querySelectorAll('.price-amount').forEach(el => {
    const usd = parseFloat(el.getAttribute('data-price-usd'))
    if (isNaN(usd)) return
    let value
    if (currency === 'MAD') {
      value = usd * 10
      el.textContent = value.toLocaleString() + ' MAD'
    } else {
      el.textContent = '$' + usd
    }
  })

  const thumb = document.querySelector('.currency-thumb')
  const label = document.getElementById('currency-label')
  const labelMobile = document.getElementById('currency-label-mobile')
  const toggle = document.getElementById('currency-toggle')
  const toggleMobile = document.getElementById('currency-toggle-mobile')
  const nextCurrency = currency === 'USD' ? 'MAD' : 'USD'

  thumb.textContent = currency === 'USD' ? '🇺🇸' : '🇲🇦'
  if (label) label.textContent = currency
  if (labelMobile) labelMobile.textContent = currency

  const isActive = currency === 'MAD'
  toggle?.classList.toggle('active', isActive)
  toggleMobile?.classList.toggle('active', isActive)
}

function toggleLang() {
  const next = currentLang === 'en' ? 'fr' : 'en'
  applyLanguage(next)
}

function toggleCurrency() {
  const next = currentCurrency === 'USD' ? 'MAD' : 'USD'
  applyCurrency(next)
}

document.getElementById('lang-toggle')?.addEventListener('click', toggleLang)
document.getElementById('lang-toggle-mobile')?.addEventListener('click', toggleLang)
document.getElementById('currency-toggle')?.addEventListener('click', toggleCurrency)
document.getElementById('currency-toggle-mobile')?.addEventListener('click', toggleCurrency)

applyLanguage(currentLang)
applyCurrency(currentCurrency)
