'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import DarkVeil from '@/components/DarkVeil';
import NavBar from '@/components/NavBar';
import KonamiExplosion from '@/components/KonamiExplosion';
import HiddenPixelModal from '@/components/HiddenPixelModal';
import { useKonamiCode, useSecretWord } from '@/lib/easterEggs';
import styles from './page.module.css';

const FEATURES = [
  { label: 'Language Detection', pts: '3/20', desc: 'Auto-detect from syntax & extension. 4+ languages. Confidence score.' },
  { label: 'Bug & Lint Detection', pts: '4/20', desc: 'Null deref, off-by-one, unused vars, type coercions, naming violations.' },
  { label: 'Security Analysis', pts: '4/20', desc: 'SQLi, XSS, hardcoded secrets, eval/exec, CVE/OSV live feed.' },
  { label: 'Complexity & Redundancy', pts: '4/20', desc: 'Cyclomatic complexity, deep nesting, duplicate blocks, dead code.' },
  { label: 'Auto-Formatting & Diff', pts: '2/20', desc: 'Non-destructive format with unified diff: original vs formatted.' },
  { label: 'API Quality & Web Demo', pts: '3/20', desc: 'Configurable weights, plugin system, history graph, score badge.' },
];
const STACK = ['Next.js 14', 'TypeScript', 'Node.js', 'ESLint API', 'Semgrep', 'OSV Feed', 'OpenAI API', 'WebSockets'];

export default function HomePage() {

  // 🥚 EGG 1: Konami Code
  const [showKonami, setShowKonami] = useState(false);
  useKonamiCode(useCallback(() => setShowKonami(true), []));

  // 🥚 EGG 2: Logo × 5 clicks
  const [clicks, setClicks] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = useCallback(() => {
    setClicks(prev => {
      const n = prev + 1;
      if (clickTimer.current) clearTimeout(clickTimer.current);
      if (n >= 5) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        return 0;
      }
      clickTimer.current = setTimeout(() => setClicks(0), 2500);
      return n;
    });
  }, []);

  // 🥚 EGG 3: Console ASCII art
  useEffect(() => {
    console.log(
      '%c\n' +
      ' ██████╗     ██╗ █████╗ ███████╗███████╗ \n' +
      ' ██╔══██╗    ██║██╔══██╗██╔════╝██╔════╝ \n' +
      ' ██║  ██║    ██║███████║███████╗███████╗  \n' +
      ' ██║  ██║██  ██║██╔══██║╚════██║╚════██║ \n' +
      ' ██████╔╝╚█████╔╝██║  ██║███████║███████║\n' +
      ' ╚═════╝  ╚════╝ ╚═╝  ╚═╝╚══════╝╚══════╝\n\n' +
      ' 🥚 EASTER EGG #3 — You opened DevTools!\n' +
      ' ✦  Shout-out to OJASS \'26 — Hack de Science\n' +
      '    NIT Jamshedpur\'s Grand Techfest\n' +
      '    Built with 💙 by Team Daydream\n\n' +
      ' More eggs: ↑↑↓↓←→←→BA · click logo 5× · type "ojass26" · hover score 3s · bottom-right pixel\n',
      'color:#63b3ed;font-family:monospace;font-size:12px;line-height:1.5;'
    );
  }, []);

  // 🥚 EGG 4: Type "ojass26" globally → golden mode
  const [golden, setGolden] = useState(false);
  useSecretWord('ojass26', useCallback(() => setGolden(g => !g), []));

  // 🥚 EGG 5: Hidden pixel bottom-right
  const [showPixelModal, setShowPixelModal] = useState(false);

  return (
    <div className={styles.page}>
      <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={2}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      <div className={styles.glowCenter} style={golden ? { background: 'radial-gradient(circle, rgba(246,224,94,0.05) 0%, transparent 65%)' } : {}} />
      <div className={styles.glowLeft} />

      {showKonami && <KonamiExplosion onClose={() => setShowKonami(false)} />}
      {showPixelModal && <HiddenPixelModal onClose={() => setShowPixelModal(false)} />}

      {golden && (
        <div className={styles.goldenBanner}>
          🥚 <strong>GOLDEN MODE</strong> — Shout-out to <strong>OJASS &apos;26</strong>! Type &quot;ojass26&quot; again to toggle
          <button className={styles.goldenX} onClick={() => setGolden(false)}>×</button>
        </div>
      )}

      <NavBar active="team" onLogoClick={handleLogoClick} golden={golden} />

      {clicks > 0 && clicks < 5 && (
        <div className={styles.dots}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`${styles.dot} ${i < clicks ? styles.dotOn : ''}`} />
          ))}
        </div>
      )}

      {showToast && (
        <div className={styles.toast}>
          <span className={styles.toastStar}>🌟</span>
          <div>
            <p className={styles.toastTitle}>Secret Unlocked!</p>
            <p className={styles.toastSub}>✦ OJASS &apos;26 — We coded this for you ✦</p>
          </div>
        </div>
      )}

      <main className={styles.main}>
        <section className={styles.hero}>

          <div className={`${styles.badge} fade-up`}>
            <span className={styles.badgeDot} />
            HACK DE SCIENCE &nbsp;·&nbsp; OJASS &apos;26 &nbsp;·&nbsp; FEB 27 2026
          </div>

          <div className={`${styles.teamBlock} fade-up-1`}>
            <div className={styles.orbitRing}>
              <div className={styles.orbitDot} />
            </div>
            <div>
              <p className={styles.teamLabel}>PRESENTING</p>
              <h1 className={styles.teamName}>
                <span className={`${styles.teamAccent} ${golden ? styles.teamAccentGold : ''}`}>Aegis</span>Engine
              </h1>
              <p className={styles.teamSubText}>made with love by team Daydreams</p>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={`${styles.ctaRow} fade-up-2`} style={{ marginTop: '20px', marginBottom: '60px' }}>
            <Link href="/demo" className={styles.cta}>
              <span>LAUNCH ANALYSER</span>
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <div className={styles.ctaNote}>
              <span className={styles.ctaDot} />
              Live demo available — no install required
            </div>
          </div>

          <div className={`${styles.card} fade-up-3`}>
            <div className={styles.cardTop} />
            <div className={styles.cardHead}>
              <div className={styles.cardIcon}>
                <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
                  <circle cx="20" cy="20" r="18" stroke="var(--cyan)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="20" cy="20" r="10" stroke="var(--cyan)" strokeWidth="1" opacity="0.5" />
                  <circle cx="20" cy="20" r="3" fill="var(--cyan)" />
                  <line x1="20" y1="2" x2="20" y2="10" stroke="var(--cyan)" strokeWidth="1.5" />
                  <line x1="20" y1="30" x2="20" y2="38" stroke="var(--cyan)" strokeWidth="1.5" />
                  <line x1="2" y1="20" x2="10" y2="20" stroke="var(--cyan)" strokeWidth="1.5" />
                  <line x1="30" y1="20" x2="38" y2="20" stroke="var(--cyan)" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <p className={styles.probNum}>PROBLEM STATEMENT 02</p>
                <h2 className={styles.probTitle}>Code Quality Review</h2>
                <p className={styles.probSub}>npm Package + Web Demo</p>
              </div>
              <div className={styles.pts}>
                <span className={styles.ptsNum}>20</span>
                <span className={styles.ptsLabel}>pts</span>
              </div>
            </div>

            <p className={styles.probDesc}>
              Build and publish an npm package that performs automated code quality analysis on any source
              code snippet or file. The analyser must support multiple programming languages, detect real
              issues, and return a structured, actionable report — making it a developer tool of genuine
              utility rather than a superficial linter wrapper.
            </p>

            <div className={styles.featureGrid}>
              {FEATURES.map((f, i) => (
                <div key={f.label} className={`${styles.feature} fade-up-${Math.min(i + 4, 6)}`}>
                  <div className={styles.featureTop}>
                    <span className={styles.featureHex}>⬡</span>
                    <span className={styles.featurePts}>{f.pts}</span>
                  </div>
                  <p className={styles.featureLabel}>{f.label}</p>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.techRow}>
              <span className={styles.techLabel}>STACK</span>
              <div className={styles.techChips}>
                {STACK.map(t => <span key={t} className={styles.chip}>{t}</span>)}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>✦ Daydream &nbsp;·&nbsp; NIT Jamshedpur &nbsp;·&nbsp; Hack de Science</span>
        <span>Problem 2 of 4</span>
      </footer>

      {/* 🥚 EGG 5: invisible 4×4 pixel — bottom-right corner */}
      <div className={styles.hiddenPixel} onClick={() => setShowPixelModal(true)} aria-hidden="true" />
    </div>
  );
}