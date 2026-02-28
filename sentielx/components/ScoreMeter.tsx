'use client';
import { useState, useRef } from 'react';
import styles from './ScoreMeter.module.css';

export default function ScoreMeter({ score }: { score: number }) {
  const r      = 54;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color  = score >= 70 ? '#68d391' : score >= 40 ? '#f6e05e' : '#fc8181';
  const grade  = score>=90?'A':score>=80?'B+':score>=70?'B':score>=60?'C+':score>=50?'C':score>=40?'D':'F';

  // 🥚 EGG 4: hover for 3s → secret tooltip
  const [showTip, setShowTip] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onEnter  = () => { timerRef.current = setTimeout(() => setShowTip(true), 3000); };
  const onLeave  = () => { if (timerRef.current) clearTimeout(timerRef.current); setShowTip(false); };

  return (
    <div className={styles.wrap} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <svg viewBox="0 0 120 120" width="130" height="130">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {Array.from({length:20},(_,i) => {
          const a  = (i/20)*2*Math.PI - Math.PI/2;
          const x1 = 60+(r+4)*Math.cos(a), y1 = 60+(r+4)*Math.sin(a);
          const x2 = 60+(r+8)*Math.cos(a), y2 = 60+(r+8)*Math.sin(a);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(99,179,237,0.2)" strokeWidth="1"/>;
        })}
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
          style={{ filter:`drop-shadow(0 0 8px ${color})`, transition:'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <text x="60" y="52" textAnchor="middle" fill={color} fontSize="26" fontFamily="'Syne',sans-serif" fontWeight="800">{score}</text>
        <text x="60" y="68" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="12" fontFamily="'Fira Code',monospace">{grade}</text>
      </svg>
      <p className={styles.label}>QUALITY</p>

      {showTip && (
        <div className={styles.secretTip}>
          <p className={styles.tip1}>🥚 Easter Egg #4</p>
          <p className={styles.tip2}>Powered by <strong>OJASS &apos;26</strong></p>
          <p className={styles.tip3}>Hack de Science · NIT Jamshedpur</p>
        </div>
      )}
    </div>
  );
}