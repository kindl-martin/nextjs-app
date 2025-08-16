'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function FadeUp({
  children,
  duration = 0.5,
  delay = 0,
}: {
  children: ReactNode;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 15,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ type: 'spring', duration, delay }}
    >
      {children}
    </motion.div>
  );
}
