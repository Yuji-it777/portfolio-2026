import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'
import ThreeDecorations from './ThreeDecorations'

const aboutText =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <ThreeDecorations />

      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto z-10">
        <FadeIn as="h2" delay={0} y={40} className="hero-heading font-black uppercase leading-none tracking-tight text-center w-full" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          About me
        </FadeIn>

        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 mt-8 w-full">
          <AnimatedText
            text={aboutText}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] w-full"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          <div className="mt-16 sm:mt-20 md:mt-24">
            <ContactButton />
          </div>
        </div>
      </div>
    </section>
  )
}
