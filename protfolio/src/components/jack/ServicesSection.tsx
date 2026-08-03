import FadeIn from './FadeIn'

const SERVICES = [
  {
    number: '01',
    name: 'Web Development',
    description:
      'Custom, performant websites and web apps built with modern technologies like React, Node.js, and TypeScript.',
    price: '$500',
  },
  {
    number: '02',
    name: 'UI/UX Design',
    description:
      'User-centered design solutions that balance aesthetics and functionality, from wireframes to high-fidelity prototypes.',
    price: '$300',
  },
  {
    number: '03',
    name: 'Branding',
    description:
      'Complete brand identity packages including logo design, style guides, and marketing collateral.',
    price: '$400',
  },
  {
    number: '04',
    name: 'Motion Graphics',
    description:
      'Engaging animations and motion graphics for social media, ads, and product demos using After Effects.',
    price: '$200',
  },
  {
    number: '05',
    name: 'Automation & Workflow',
    description:
      'Custom automation pipelines using n8n, AI, and APIs to streamline repetitive tasks, integrate tools, and boost productivity.',
    price: '$350',
  },
  {
    number: '06',
    name: 'API Development',
    description:
      'Design and build RESTful APIs and backend services to power web apps, mobile apps, and third-party integrations.',
    price: '$450',
  },
]

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>

        <div className="flex flex-col">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.1}>
              <div className="flex items-start gap-4 sm:gap-6 md:gap-10 py-8 sm:py-10 md:py-12 border-b" style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}>
                {/* Number */}
                <span
                  className="text-[#0C0C0C] font-black leading-none flex-shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </span>

                {/* Name + Description + Price */}
                <div className="flex flex-col pt-2 sm:pt-3 md:pt-4 flex-1">
                  <span
                    className="text-[#0C0C0C] font-medium uppercase"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.name}
                  </span>
                  <p
                    className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl opacity-60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                  <span className="text-[#0C0C0C] font-semibold mt-3" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                    Starting at {service.price}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
