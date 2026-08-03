import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-[100] bg-[#0C0C0C] flex flex-col items-center justify-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-heading font-black text-[clamp(2rem,8vw,5rem)] uppercase tracking-tight"
      >
        MOUAD
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-[2px] bg-[#D7E2EA]/30 mt-4"
        style={{ width: 'clamp(80px, 20vw, 200px)', transformOrigin: 'left' }}
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-[#D7E2EA]/50 text-xs uppercase tracking-[0.3em] mt-4 font-light"
      >
        Loading
      </motion.p>
    </motion.div>
  )
}
