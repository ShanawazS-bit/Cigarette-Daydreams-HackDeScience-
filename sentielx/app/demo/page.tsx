'use client';
import { useState, useEffect, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import CodeEditor from '@/components/CodeEditor';
import AnalysisPanel from '@/components/AnalysisPanel';
import StarField from '@/components/StarField';
import KonamiExplosion from '@/components/KonamiExplosion';
import { useKonamiCode } from '@/lib/easterEggs';
import styles from './demo.module.css';
import DarkVeil from '@/components/DarkVeil';

const SAMPLE = `function fetchUserData(userId) {
  var query = "SELECT * FROM users WHERE id = " + userId;
  eval(query);

  let password = "admin123";
  let apiKey = "sk-prod-abc123xyz789secret";

  for (var i = 0; i <= arr.length; i++) {
    if (true) {
      if (data != null) {
        if (user) {
          process(user.data.info.value);
        }
      }
    }
  }

  function unusedHelper() {
    return "never called";
  }

  return null.toString();
}`;

const OJASS_REPORT = `\x1b[1m\x1b[38;2;255;215;0m🥚 Easter Egg Found: OJASS 26\x1b[0m\n\x1b[32m  Perfect Score: 100/100\x1b[0m\n  No issues found! OJASS '26 certified!`;

const STEPS = ['Detecting language…', 'Running lint rules…', 'Security scan…', 'Complexity analysis…', 'Building report…'];

export default function DemoPage() {
  const [code, setCode] = useState(SAMPLE);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const [showKonami, setShowKonami] = useState(false);
  useKonamiCode(useCallback(() => setShowKonami(true), []));

  useEffect(() => {
    console.log(
      '%c🥚 DEMO HINT: Type "ojass26" anywhere in the code editor, then click Analyse!\n' +
      '   Shout-out to OJASS \'26 — Hack de Science, NIT Jamshedpur',
      'color:#f6e05e;font-family:monospace;font-size:12px;'
    );
  }, []);

  const handleAnalyse = async () => {
    if (!code.trim() || loading) return;
    setLoading(true); setReport(null); setStep(0);
    for (let i = 0; i < STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 200));
      setStep(i + 1);
    }

    if (code.toLowerCase().includes('ojass26')) {
      setReport({ isOjass: true });
    } else {
      try {
        const res = await fetch('/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const data = await res.json();
        setReport(data);
      } catch (err) {
        setReport({ error: true });
      }
    }
    setLoading(false);
  };

  const isOjass = code.toLowerCase().includes('ojass26');

  return (
    <div className={styles.page}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>
      <div className={styles.glowTR} />

      {showKonami && <KonamiExplosion onClose={() => setShowKonami(false)} />}

      {isOjass && (
        <div className={styles.ojassBanner}>
          🥚 <strong>Easter Egg #6 detected!</strong> &nbsp;·&nbsp;
          <code>ojass26</code> found in editor &nbsp;·&nbsp;
          Click Analyse to unlock secret score &nbsp;·&nbsp;
          <strong>Shout-out to OJASS &apos;26!</strong> ✦
        </div>
      )}

      <NavBar active="demo" />

      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.leftHeader}>
            <div>
              <p className={styles.paneLabel}>INPUT</p>
              <p className={styles.paneSub}>Paste any code snippet</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.actionBtn} onClick={() => setCode(SAMPLE)}>SAMPLE</button>
              <button className={styles.actionBtn} onClick={() => { setCode(''); setReport(null); }}>CLEAR</button>
            </div>
          </div>

          <div className={styles.editorWrap}>
            <CodeEditor value={code} onChange={setCode} filename="snippet.js" />
          </div>

          <div className={styles.leftFooter}>
            <span className={styles.lineCount}>{code.split('\n').length} lines</span>
            <button
              className={`${styles.analyseBtn} ${loading ? styles.analyseBtnLoading : ''} ${isOjass ? styles.analyseBtnGold : ''}`}
              onClick={handleAnalyse}
              disabled={loading || !code.trim()}
            >
              {loading ? (
                <><span className={styles.spinner} />{STEPS[step - 1] ?? 'Scanning…'}</>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M2 12l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  {isOjass ? '✦ ANALYSE · SECRET MODE' : 'ANALYSE CODE'}
                </>
              )}
            </button>
          </div>
        </div>

        <div className={styles.right}>
          <AnalysisPanel report={report} loading={loading} scanStep={step} scanSteps={STEPS} />
        </div>
      </div>
    </div>
  );
}