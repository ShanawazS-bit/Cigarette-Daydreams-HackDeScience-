'use client';
import { useEffect, useState, useMemo } from 'react';
import styles from './KonamiExplosion.module.css';

interface Props { onClose: () => void; }

const PALETTE = ['#63b3ed','#f6e05e','#68d391','#fc8181','#f6ad55','#b794f4','#76e4f7','#fbb6ce'];

export default function KonamiExplosion({ onClose }: Props) {
  const [closing, setClosing] = useState(false);
  const close = () => { setClosing(true); setTimeout(onClose, 500); };

  useEffect(() => {
    const t   = setTimeout(close, 6000);
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', esc);
    return () => { clearTimeout(t); window.removeEventListener('keydown', esc); };
  }, []); // eslint-disable-line

  const particles = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => {
      const angle = (i / 80) * 2 * Math.PI;
      const dist  = 100 + Math.random() * 260;
      return {
        id:    i,
        tx:    `${Math.cos(angle) * dist}px`,
        ty:    `${Math.sin(angle) * dist}px`,
        size:  3 + Math.random() * 11,
        color: PALETTE[i % PALETTE.length],
        delay: Math.random() * 0.5,
        ox:    40 + Math.random() * 20,
        oy:    40 + Math.random() * 20,
      };
    }), []);

  return (
    <div className={`${styles.overlay} ${closing ? styles.out : ''}`} onClick={close}>
      {particles.map(p => (
        <div key={p.id} className={styles.particle} style={{
          left:`${p.ox}%`, top:`${p.oy}%`,
          width:p.size, height:p.size,
          background:p.color,
          boxShadow:`0 0 ${p.size * 2}px ${p.color}`,
          animationDelay:`${p.delay}s`,
          '--tx':p.tx, '--ty':p.ty,
        } as React.CSSProperties} />
      ))}

      <div className={styles.card} onClick={e => e.stopPropagation()}>
        <div className={styles.stripe} />
        <span className={styles.eggBadge}>🥚 EASTER EGG #1 UNLOCKED</span>
        <h2 className={styles.title}>Konami Code!</h2>
        <p className={styles.seq}>↑ ↑ ↓ ↓ ← → ← → B A</p>
        <div className={styles.rule} />
        <p className={styles.dedicatedTo}>✦ Shout-out to</p>
        <h1 className={styles.ojass}>OJASS &apos;26</h1>
        <p className={styles.sub}>NIT Jamshedpur · Hack de Science</p>
        <div className={styles.rule} />
        <p className={styles.msg}>Built with 💙 by <strong>Team Daydream</strong></p>
        <button className={styles.closeBtn} onClick={close}>CLOSE ×</button>
      </div>
    </div>
  );
}