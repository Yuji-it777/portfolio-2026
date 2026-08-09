import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const ABOUT_TEXT =
  "I'm a digital craftsman blending code and design to build meaningful digital experiences. With a background in both web development and graphic design, I bridge the gap between functionality and aesthetics. Based in Marrakech, Morocco, I've worked with local startups and artisans to bring their digital presence to life, focusing on performance, accessibility, and user delight."

const STATS = [
  { value: '10+', label: 'Projects' },
  { value: '50+', label: 'Designs' },
  { value: '2+', label: 'Years Exp.' },
]

const SKILLS = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js',
  'Git', 'Figma', 'Photoshop', 'Illustrator', 'After Effects',
]

export default function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      {/* Decorative images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-0">
        <img
          src="/decor/moon.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-0">
        <img
          src="/decor/art.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-0">
        <img
          src="/decor/lego.png"
          alt=""
          className="w-[120px] sm:w-[160px] md:w-[210px]"
          loading="lazy"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-0">
        <img
          src="/decor/group.png"
          alt=""
          className="w-[130px] sm:w-[170px] md:w-[220px]"
          loading="lazy"
        />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40} className="text-center">
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              About
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[620px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 sm:gap-16 md:gap-20 mt-12 sm:mt-14 md:mt-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
                {stat.value}
              </span>
              <span className="text-[#D7E2EA] text-xs sm:text-sm uppercase tracking-widest mt-1 opacity-60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div id="skills" className="flex flex-wrap items-center justify-center gap-3 mt-12 sm:mt-14 md:mt-16 max-w-2xl">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 text-xs sm:text-sm uppercase tracking-wider rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/80 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-12 sm:mt-14 md:mt-16">
          <ContactButton />
        </div>
      </div>
    </section>
  )
}
