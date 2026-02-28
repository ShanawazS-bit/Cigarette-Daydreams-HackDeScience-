'use client';
import Link from 'next/link';
import styles from './NavBar.module.css';

interface Props {
  active:       'team' | 'demo';
  onLogoClick?: () => void;
  golden?:      boolean;
}

export default function NavBar({ active, onLogoClick, golden }: Props) {
  return (
    <nav className={`${styles.nav} ${golden ? styles.navGolden : ''}`}>
      <div
        className={styles.logo}
        onClick={onLogoClick}
        style={{ cursor: onLogoClick ? 'pointer' : 'default', userSelect:'none' }}
        title={onLogoClick ? 'Psst… try clicking me a few times 👀' : undefined}
      >
        <div className={`${styles.logoIcon} ${golden ? styles.logoIconGolden : ''}`}>
          <svg viewBox="0 0 28 28" fill="none" width="20" height="20">
            <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="14" r="5"  stroke="currentColor" strokeWidth="1" opacity="0.6" />
            <line x1="14" y1="2"  x2="14" y2="8"  stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="20" x2="14" y2="26" stroke="currentColor" strokeWidth="1.5" />
            <line x1="2"  y1="14" x2="8"  y2="14" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <span className={styles.logoText}>
          Day<span className={`${styles.logoAccent} ${golden ? styles.logoAccentGolden : ''}`}>dream</span>
        </span>
        <span className={styles.logoBadge}>npm pkg</span>
      </div>

      <div className={styles.tabs}>
        <Link href="/"     className={`${styles.tab} ${active==='team' ? styles.tabActive : ''}`}>TEAM</Link>
        <Link href="/demo" className={`${styles.tab} ${active==='demo' ? styles.tabActive : ''}`}>DEMO</Link>
      </div>

      <span className={styles.eventTag}>Hack de Science · Ojass &apos;26</span>
    </nav>
  );
}