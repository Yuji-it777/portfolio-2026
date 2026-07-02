import FadeIn from './FadeIn'

const services = [
  {
    id: '01',
    name: 'Web Development',
    description:
      'Custom, performant websites and web apps built with modern technologies like React, Node.js, and TypeScript.',
  },
  {
    id: '02',
    name: 'UI/UX Design',
    description:
      'User-centered design solutions that balance aesthetics and functionality, from wireframes to high-fidelity prototypes.',
  },
  {
    id: '03',
    name: 'Branding',
    description:
      'Complete brand identity packages including logo design, style guides, and marketing collateral.',
  },
  {
    id: '04',
    name: 'Motion Graphics',
    description:
      'Engaging animations and motion graphics for social media, ads, and product demos using After Effects.',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Services
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col">
        {services.map((service, i) => (
          <FadeIn
            key={service.id}
            delay={i * 0.1}
            y={20}
            className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12 border-b border-[rgba(12,12,12,0.15)] last:border-b-0"
          >
            <span
              className="font-black text-[#0C0C0C] flex-shrink-0 leading-none"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {service.id}
            </span>
            <div className="flex flex-col pt-2 sm:pt-3 md:pt-4">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="font-light leading-relaxed opacity-60 text-[#0C0C0C] max-w-2xl"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
