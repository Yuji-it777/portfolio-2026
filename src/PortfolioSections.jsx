import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

const PortfolioSections = () => {
  return (
    <div className="min-h-screen bg-black">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="h-screen flex flex-col overflow-x-clip"
      >
        {/* Navbar */}
        <nav className="px-6 md:px-10 pt-6 md:pt-8 flex justify-between">
          <div className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            About
          </div>
          <div className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            Price
          </div>
          <div className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            Projects
          </div>
          <div className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
            Contact
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center flex-1">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] text-[#D7E2EA] font-black uppercase tracking-tight whitespace-nowrap"
          >
            Hi, I'm jack
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] mt-6 sm:mt-4 md:-mt-5"
          >
            A 3D creator driven by crafting striking and unforgettable projects
          </motion.p>
          <ContactButton />
        </div>

        {/* Hero Portrait */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Jack"
              className="w-full"
            />
          </Magnet>
        </div>
      </motion.section>

      {/* Marquee Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-black py-10"
      >
        <div className="flex overflow-hidden">
          {/* Row 1 */}
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-[420px] h-[270px] rounded-2xl overflow-hidden">
                <img
                  src="https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif"
                  alt="Project"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-[420px] h-[270px] rounded-2xl overflow-hidden">
                <img
                  src="https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif"
                  alt="Project"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="min-h-screen bg-black px-5 sm:px-8 md:px-10 py-20"
      >
        {/* Decorative 3D Images */}
        <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon"
            className="w-[120px] sm:w-[160px] md:w-[210px]"
          />
        </div>
        <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D Object"
            className="w-[100px] sm:w-[140px] md:w-[180px]"
          />
        </div>
        <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego"
            className="w-[120px] sm:w-[160px] md:w-[210px]"
          />
        </div>
        <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[130px] sm:w-[170px] md:w-[220px]"
          />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0, duration: 0.7 }}
          className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[clamp(3rem, 12vw, 160px)] text-center"
        >
          About me
        </motion.h2>

        {/* Animated Paragraph */}
        <AnimatedText
          text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mx-auto font size clamp(1rem, 2vw, 1.35rem)"
        />

        <div className="flex justify-center gap-10 sm:gap-14 md:gap-16 mt-10 sm:mt-14 md:mt-16">
          <ContactButton />
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0, duration: 0.7 }}
          className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem, 12vw, 160px)] mb-16 sm:mb-20 md:mb-28"
        >
          Services
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-1 px-4 sm:px-6 md:px-8">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.1, duration: 0.7 }}
                className="flex items-start border-b border-[rgba(12, 12, 12, 0.15)] pb-8 sm:pb-10 md:pb-12"
              >
                <div className="text-[#0C0C0C] font-black text-[clamp(3rem, 10vw, 140px)] mr-6">
                  {item}
                </div>
                <div>
                  <div className="text-[#0C0C0C] font-medium uppercase text-[clamp(1rem, 2.2vw, 2.1rem)] mb-2">
                    3D Modeling
                  </div>
                  <div className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl text-[clamp(0.85rem, 1.6vw, 1.25rem)] opacity-60">
                    Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-black rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      >
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0, duration: 0.7 }}
          className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none text-[clamp(3rem, 12vw, 160px)] text-center"
        >
          Project
        </motion.h2>

        <div className="h-[85vh] relative">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0 }}
              custom={index}
              transition={{
                type: "tween",
                duration: 0.8,
                delay: index * 0.2,
              }}
              className="absolute top-24 md:top-32 sticky w-full h-full flex items-center justify-center"
            >
              <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-black p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-[#D7E2EA] font-black text-[clamp(3rem, 10vw, 140px)]">{index}</div>
                  <div className="flex flex-col">
                    <div className="text-[#D7E2EA] font-medium uppercase tracking-widest">
                      Nextlevel Studio
                    </div>
                    <div className="text-[#D7E2EA] font-medium uppercase tracking-widest">
                      Client
                    </div>
                  </div>
                  <LiveProjectButton />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85"
                      alt="Project"
                      className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                    />
                    <img
                      src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85"
                      alt="Project"
                      className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                    />
                  </div>
                  <img
                    src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
                    alt="Project"
                    className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

const ContactButton = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-r from-[#18011F] to-[#B600A8] text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
  >
    Contact Me
  </motion.button>
);

const LiveProjectButton = () => (
  <button className="border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10">
    Live Project
  </button>
);

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30 }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    className="origin-top"
  >
    {children}
  </motion.div>
);

const Magnet = ({ children, padding = 150, strength = 3, activeTransition = "transform 0.3s ease-out", inactiveTransition = "transform 0.6s ease-in-out" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const transform = isHovered
    ? `translate3d(${mousePosition.x / strength - padding}px, ${mousePosition.y / strength - padding}px, 0)`
    : `translate3d(0, 0, 0)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        style={{ transform }}
        transition={{
          type: isHovered ? 'spring' : 'tween',
          stiffness: isHovered ? 100 : 0,
          damping: isHovered ? 10 : 0,
          duration: isHovered ? 0.3 : 0.6,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

const AnimatedText = ({ text, className }) => {
  const [characters, setCharacters] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScrollProgress((prev) => (prev + 0.01) % 1);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setCharacters(text.split(''));
  }, [text]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        {characters.map((char, index) => (
          <span
            key={index}
            className="inline-block"
            style={{
              opacity: Math.max(0.2, 1 - Math.abs(scrollProgress - (index / text.length)) * 2),
            }}
          >
            {char}
          </span>
        ))}
      </div>
      <style jsx>{`@keyframes reveal {
        from { opacity: 0.2; }
        to { opacity: 1; }
      }`}</style>
    </div>
  );
};

export default PortfolioSections;