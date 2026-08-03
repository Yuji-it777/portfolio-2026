export default function Footer() {
  return (
    <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-5 sm:px-8 md:px-10 py-8">
      <div className="flex flex-col items-center gap-4">
        <p className="text-[#D7E2EA]/40 text-xs sm:text-sm font-light tracking-wide text-center">
          &copy; 2026 MOUAD EL GHAZI. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-[#D7E2EA]/30 text-xs tracking-wider uppercase">
          <span>HTML5</span>
          <span>CSS3</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Node.js</span>
          <span>Figma</span>
        </div>
      </div>
    </footer>
  )
}
