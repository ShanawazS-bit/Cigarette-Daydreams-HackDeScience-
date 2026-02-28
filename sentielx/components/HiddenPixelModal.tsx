'use client';
import { useEffect } from 'react';
import styles from './HiddenPixelModal.module.css';

interface Props { onClose: () => void; }

export default function HiddenPixelModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.topStripe} />
        <div className={styles.stars}>
          {['✦','✧','✦','✧','✦','✧','✦'].map((s, i) => (
            <span key={i} className={styles.star} style={{ animationDelay:`${i*0.12}s` }}>{s}</span>
          ))}
        </div>
        <span className={styles.badge}>🔍 EASTER EGG #5 — THE HIDDEN PIXEL</span>
        <h2 className={styles.title}>You found it.</h2>
        <p className={styles.body}>
          There&apos;s an invisible 4×4 pixel hidden in the very corner of this page.
          Most people walk right past it. You didn&apos;t.<br /><br />
          That&apos;s the kind of curiosity that wins hackathons.
        </p>
        <div className={styles.rule} />
        <div className={styles.ojassBox}>
          <p className={styles.ojassLabel}>THIS DEMO IS DEDICATED TO</p>
          <p className={styles.ojassName}>OJASS &apos;26</p>
          <p className={styles.ojassSub}>Hack de Science · NIT Jamshedpur</p>
        </div>
        <div className={styles.rule} />
        <p className={styles.quote}>&ldquo;Great code, like great art, hides its complexity.&rdquo;</p>
        <p className={styles.quoteBy}>— Team Daydream</p>
        <button className={styles.closeBtn} onClick={onClose}>← BACK TO THE STARS</button>
      </div>
    </div>
  );
}