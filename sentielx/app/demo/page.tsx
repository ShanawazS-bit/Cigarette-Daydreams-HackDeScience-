'use client';
import { useState, useEffect, useCallback } from 'react';
import NavBar from '@/components/NavBar';
import CodeEditor from '@/components/CodeEditor';
import AnalysisPanel from '@/components/AnalysisPanel';
import StarField from '@/components/StarField';
import KonamiExplosion from '@/components/KonamiExplosion';
import { analyzeCode } from '@/lib/mockAnalyzer';
import { useKonamiCode } from '@/lib/easterEggs';
import type { Report } from '@/lib/types';
import styles from './demo.module.css';

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

// 🥚 EGG 6: Perfect report when code contains "ojass26"
const OJASS_REPORT: Report = {
  language:   'OjassScript',
  confidence: 100,
  score:      100,
  grade:      'A+',
  bugs:       [],
  lint:       [],
  security:   [],
  complexity: [
    { fn:'ojassRocks',    complexity:1, lines:4, status:'ok' },
    { fn:'hackDeScience', complexity:1, lines:6, status:'ok' },
    { fn:'teamDaydream',  complexity:1, lines:8, status:'ok' },
  ],
};

const STEPS = ['Detecting language…','Running lint rules…','Security scan…','Complexity analysis…','Building report…'];

export default function DemoPage() {
  const [code,    setCode]    = useState(SAMPLE);
  const [report,  setReport]  = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [step,    setStep]    = useState(0);

  const [showKonami, setShowKonami] = useState(false);
  useKonamiCode(useCallback(() => setShowKonami(true), []));

  useEffect(() => {
    console.log(
      '%c🥚 DEMO HINT: Type "ojass26" anywhere in the code editor, then click Analyse!\n' +
      '   Shout-out to OJASS \'26 — Hack de Science, NIT Jamshedpur',
      'color:#f6e05e;font-family:monospace;font-size:12px;'
    );
  }, []);

  const isOjass = code.toLowerCase().includes('ojass26');

  const handleAnalyse = async () => {
    if (!code.trim() || loading) return;
    setLoading(true); setReport(null); setStep(0);
    for (let i = 0; i < STEPS.length; i++) {
      await new Promise(r => setTimeout(r, 340));
      setStep(i + 1);
    }
    await new Promise(r => setTimeout(r, 400));
    setReport(isOjass ? OJASS_REPORT : analyzeCode(code));
    setLoading(false);
  };

  return (
    <div className={styles.page}>
      <StarField count={55} golden={isOjass} />
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
                <><span className={styles.spinner} />{STEPS[step-1] ?? 'Scanning…'}</>
              ) : (
                <>
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M2 12l8 5 8-5"           stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
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