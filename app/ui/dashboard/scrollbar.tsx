'use client';

import { motion, useScroll } from 'framer-motion';

export default function Scrollbar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="bg-primary fixed bottom-0 left-0 h-2 w-full origin-left transform"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
