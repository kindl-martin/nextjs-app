'use client';

import { useState } from 'react';
import { spring } from 'motion';
import { FadeUp } from '@/app/ui/animate/fadeUp';

export default function Page() {
  const [state, setState] = useState(false);

  return (
    <FadeUp>
      <div className="example-container flex flex-col items-center justify-center gap-6">
        <div
          className="box h-[100px] w-[100px] rounded-xl bg-[#0055ff] duration-300"
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
  );
}
