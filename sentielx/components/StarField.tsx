'use client';
import { useMemo } from 'react';

export default function StarField({ count = 80, golden = false }: { count?: number; golden?: boolean }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id:       i,
      top:      `${Math.random() * 100}%`,
      left:     `${Math.random() * 100}%`,
      size:     `${1 + Math.random() * 2}px`,
      delay:    `${Math.random() * 8}s`,
      duration: `${4 + Math.random() * 6}s`,
      opacity:  0.2 + Math.random() * 0.6,
    })), [count]);

  const col  = golden ? 'rgba(246,224,94,0.9)' : 'rgba(99,179,237,0.8)';
  const glow = golden ? 'rgba(246,224,94,0.4)' : 'rgba(99,179,237,0.4)';

  return (
    <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:0, overflow:'hidden' }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position:'absolute', top:s.top, left:s.left,
          width:s.size, height:s.size, borderRadius:'50%',
          background:col, opacity:s.opacity,
          animation:`star-drift ${s.duration} ${s.delay} ease-in-out infinite alternate`,
          boxShadow:`0 0 ${parseInt(s.size)*2}px ${glow}`,
          transition:'background 1s, box-shadow 1s',
        }} />
      ))}
    </div>
  );
}