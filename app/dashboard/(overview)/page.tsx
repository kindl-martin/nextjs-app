'use client';

import { useState } from 'react';
import { spring } from 'motion';

export default function CSSGeneration() {
  const [state, setState] = useState(false);

  return (
    <div className="example-container flex flex-col items-center justify-center gap-5">
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
  );
}
