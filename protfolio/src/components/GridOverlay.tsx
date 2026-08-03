export default function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div className="mx-auto max-w-6xl h-full grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 px-6 md:px-10">
        <div className="border-r border-white/5 max-md:border-l" />
        <div className="border-r border-white/5" />
        <div className="border-r border-white/5 max-md:hidden" />
        <div className="border-r border-white/5 max-lg:hidden" />
      </div>
    </div>
  )
}
