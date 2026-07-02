import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn as="h2" delay={0} y={40} className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 w-full" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Contact
      </FadeIn>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <FadeIn delay={0.1} y={20}>
          <div className="flex flex-col gap-6">
            <p className="text-[#D7E2EA] text-lg sm:text-xl font-light leading-relaxed">
              Let&apos;s work together! Feel free to reach out for collaborations or just a friendly chat.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#D7E2EA] border border-[#D7E2EA]/20 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-[#D7E2EA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm sm:text-base">mouadgog7@icloud.com</span>
              </div>

              <div className="flex items-center gap-3 text-[#D7E2EA] border border-[#D7E2EA]/20 rounded-xl px-4 py-3">
                <svg className="w-5 h-5 text-[#D7E2EA] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base">Marrakech, Morocco</span>
              </div>
            </div>

            <a href="https://github.com/Yuji-it777" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#D7E2EA] hover:text-white transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm sm:text-base">GitHub</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <form
            className="flex flex-col gap-4"
            action="https://formspree.io/f/maqvpgqg"
            method="POST"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-transparent border border-[#D7E2EA]/20 rounded-xl text-[#D7E2EA] text-sm sm:text-base outline-none focus:border-[#D7E2EA]/60 transition-colors placeholder:text-[#D7E2EA]/40"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 bg-transparent border border-[#D7E2EA]/20 rounded-xl text-[#D7E2EA] text-sm sm:text-base outline-none focus:border-[#D7E2EA]/60 transition-colors placeholder:text-[#D7E2EA]/40"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-4 py-3 bg-transparent border border-[#D7E2EA]/20 rounded-xl text-[#D7E2EA] text-sm sm:text-base outline-none focus:border-[#D7E2EA]/60 transition-colors placeholder:text-[#D7E2EA]/40 resize-none"
            />
            <button
              type="submit"
              className="self-start rounded-full font-medium uppercase tracking-widest text-white px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid white',
                outlineOffset: '-3px',
              }}
            >
              Send Message
            </button>
          </form>
        </FadeIn>
      </div>
    </section>
  )
}
