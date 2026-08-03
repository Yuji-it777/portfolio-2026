import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, Moon, Sun, X, Instagram, Facebook, Twitter } from 'lucide-react';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Scroll handler
  const handleScroll = () => {
    const sections = ['hero', 'marquee', 'about', 'services', 'projects'];
    const scrollPosition = window.scrollY;
    const sectionHeight = 100;
    const sectionIndex = sections.findIndex(section => 
      scrollPosition >= document.getElementById(section).offsetTop - sectionHeight
    );
    setActiveSection(sections[sectionIndex]);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      {/* Navbar */}
      <nav className="fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold">Jack</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-sm font-medium hover:text-blue-500 transition-colors"
              >
                Contact
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 p-4">
          <div className="space-y-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative z-10">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white text-center mb-6"
            >
              Hi, I'm Jack
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-lg md:text-xl text-blue-400 text-center max-w-xs md:max-w-md mx-auto font-light tracking-wide leading-snug"
            >
              A 3D creator driven by crafting striking and unforgettable projects
            </motion.p>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              onClick={() => scrollToSection('projects')}
              className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              Contact Me
            </motion.button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <Magnet
            imageSrc="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          />
        </div>
      </section>

      {/* Marquee Section */}
      <section id="marquee" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 z-0"></div>
        <div className="relative z-10 py-10">
          <div className="flex overflow-hidden">
            <div className="flex">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex">
                  {['https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif', 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif', 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif', 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif', 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif', 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif', 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif', 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif', 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif', 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif', 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif', 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif', 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif', 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif', 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif', 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif', 'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif', 'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif', 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif', 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif', 'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'].map((src, index) => (
                    <div key={index} className="w-420 h-270 rounded-2xl object-cover mr-3">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-20 px-5 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0 }}
                className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6"
              >
                About Me
              </motion.h2>
              <AnimatedText text="With more than five years of experience in design, I focus on branding, web design, and user experience, I truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!" />
              <motion.button
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                onClick={() => scrollToSection('contact')}
                className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Contact Me
              </motion.button>
            </div>
            <div className="relative">
              <div className="absolute top-4 left-4">
                <img
                  src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
                  alt=""
                  className="w-12 sm:w-16 md:w-21 rounded-lg"
                />
              </div>
              <div className="absolute bottom-4 left-4">
                <img
                  src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
                  alt=""
                  className="w-10 sm:w-14 md:w-18 rounded-lg"
                />
              </div>
              <div className="absolute top-4 right-4">
                <img
                  src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
                  alt=""
                  className="w-12 sm:w-16 md:w-21 rounded-lg"
                />
              </div>
              <div className="absolute bottom-4 right-4">
                <img
                  src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
                  alt=""
                  className="w-13 sm:w-17 md:w-22 rounded-lg"
                />
              </div>
              <div className="relative z-10">
                <div className="bg-gray-800 p-4 rounded-2xl">
                  <p className="text-white text-sm">3D Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900 mb-16 sm:mb-20 md:mb-28 text-center"
          >
            Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {['3D Modeling', 'Rendering', 'Motion Design', 'Branding', 'Web Design'].map((service, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-colors"
              >
                <div className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl md:text-2xl font-medium uppercase mb-2 text-gray-900">
                  {service}
                </h3>
                <p className="text-gray-600 text-sm opacity-60">
                  {service === '3D Modeling' ? 'Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.' : service === 'Rendering' ? 'High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.' : service === 'Motion Design' ? 'Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.' : service === 'Branding' ? 'Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.' : 'Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen bg-gray-900 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] pt-10 sm:pt-12 md:pt-14">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-16 sm:mb-20 md:mb-28 text-center"
          >
            Projects
          </motion.h2>
          <div className="h-[85vh]">
            <div className="sticky top-24 md:top-32 h-full">
              <div className="flex flex-col gap-4">
                {['Nextlevel Studio', 'Aura Brand Identity', 'Solaris Digital'].map((project, index) => (
                  <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-gray-800 bg-gray-900 p-4 sm:p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <div className="text-4xl md:text-5xl font-black text-white mb-2">
                          {index + 1}
                        </div>
                        <div className="flex items-center">
                          <span className="text-white font-medium uppercase mr-2">{project === 'Nextlevel Studio' ? 'Client' : project === 'Aura Brand Identity' ? 'Personal' : 'Client'}</span>
                          <button className="px-4 py-2 rounded-full border-2 border-gray-700 text-gray-400 hover:bg-gray-800 transition-colors">
                            Live Project
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <h3 className="text-xl md:text-2xl font-medium text-white mb-2">
                          {project}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <img
                              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85"
                              alt=""
                              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            />
                            <img
                              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85"
                              alt=""
                              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            />
                          </div>
                          <div>
                            <img
                              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
                              alt=""
                              className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-20 px-5 sm:px-8 md:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.h2
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0 }}
                className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-6"
              >
                Contact Me
              </motion.h2>
              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg text-gray-400 mb-8"
              >
                Let's build something incredible together!
              </motion.p>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <Instagram size={24} className="text-blue-500" />
                  </div>
                  <a href="https://instagram.com" className="text-white hover:text-blue-500 transition-colors">@jack3dcreator</a>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Facebook size={24} className="text-blue-600" />
                  </div>
                  <a href="https://facebook.com" className="text-white hover:text-blue-600 transition-colors">facebook.com/jack3dcreator</a>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <Twitter size={24} className="text-blue-400" />
                  </div>
                  <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors">@jack3dcreator</a>
                </div>
              </motion.div>
            </div>
            <div>
              <motion.form
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4"
              >
                <input type="text" placeholder="Your Name" className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <textarea placeholder="Your Message" rows="5" className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <button type="submit" className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">Jack</span>
            </div>
            <div className="flex space-x-6">
              <a href="https://instagram.com" className="text-white hover:text-blue-500 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" className="text-white hover:text-blue-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-blue-400 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Jack 3D Creator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

// Magnet Component
const Magnet = ({ imageSrc, padding, strength, activeTransition, inactiveTransition }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const factor = Math.min(1, distance / padding);
      const angle = Math.atan2(dy, dx);
      const translateX = Math.cos(angle) * (distance - factor * padding);
      const translateY = Math.sin(angle) * (distance - factor * padding);
      ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageSrc}
        alt=""
        className="w-full h-full object-cover"
        style={{
          transition: isHovered ? activeTransition : inactiveTransition,
          transform: isHovered ? 'translate(0, 0)' : 'translate(0, 0)',
        }}
      />
    </div>
  );
};

// AnimatedText Component
const AnimatedText = ({ text }) => {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div ref={ref} className="relative">
      <span className="absolute inset-0">
        {text.split('').map((char, index) => (
          <span key={index} className="inline-block">
            <span
              style={{
                opacity: opacity,
                transition: 'opacity 0.5s ease-out',
                transform: `translateY(${scrollY * 0.1}px)`
              }}
            >{char}</span>
          </span>
        ))}
      </span>
    </div>
  );
};

// Framer Motion variants
const fadeIn = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

// Tailwind CSS configuration
// Add this to tailwind.config.js
// module.exports = {
//   content: [
//     './src/**/*.{js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         kanit: ['Kanit', 'sans-serif']
//       }
//     }
//   },
//   plugins: [],
// };
