'use client';

import { useState } from 'react';
import { motion, spring } from 'framer-motion';
import { FadeUp } from '@/app/ui/animate/fadeUp';

export default function Page() {
  const [state, setState] = useState(false);

  return (
    <main className="relative h-[500vh]">
      <section className="mx-auto flex w-full max-w-3xl flex-col justify-center">
        <FadeUp>
          <motion.div
            drag
            style={{
              width: 100,
              height: 100,
              backgroundColor: '#dd00ee',
              borderRadius: 10,
            }}
          />
        </FadeUp>
        <FadeUp>
          <div className="example-container flex flex-col items-center justify-center gap-6 [--color-var:red]">
            <div
              className="box h-[100px] w-[100px] rounded-xl bg-[var(--color-var,yellow)] duration-300"
              style={{
                transition: `transform ${spring(1, 0.5)}`,
                transform: state
                  ? 'translateX(200%) rotate(360deg)'
                  : 'translateX(-200%)',
              }}
            />
            <button
              className="m-3 rounded bg-[#0055ff] p-3"
              onClick={() => setState(!state)}
            >
              Toggle position
            </button>
          </div>
        </FadeUp>
        <FadeUp>
          <motion.button
            className="rounded bg-blue-500 p-3 text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Click me
          </motion.button>
        </FadeUp>
      </section>
    </main>
  );
}
