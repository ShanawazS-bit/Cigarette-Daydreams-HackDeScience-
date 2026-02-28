'use client';
import { useState } from 'react';
import type { Report, Issue, FunctionComplexity } from '@/lib/types';
import ScoreMeter from './ScoreMeter';
import styles from './AnalysisPanel.module.css';

const SEV: Record<string,{bg:string;bd:string;col:string}> = {
  critical:{ bg:'rgba(252,129,129,0.12)', bd:'rgba(252,129,129,0.4)',  col:'#fc8181' },
  high:    { bg:'rgba(246,173,85,0.12)',  bd:'rgba(246,173,85,0.4)',   col:'#f6ad55' },
  error:   { bg:'rgba(252,129,129,0.10)', bd:'rgba(252,129,129,0.35)', col:'#fc8181' },
  warning: { bg:'rgba(246,224,94,0.08)',  bd:'rgba(246,224,94,0.35)',  col:'#f6e05e' },
  info:    { bg:'rgba(99,179,237,0.08)',  bd:'rgba(99,179,237,0.35)',  col:'#63b3ed' },
  ok:      { bg:'rgba(104,211,145,0.08)', bd:'rgba(104,211,145,0.35)', col:'#68d391' },
  medium:  { bg:'rgba(246,173,85,0.08)',  bd:'rgba(246,173,85,0.30)',  col:'#f6ad55' },
};

function Badge({ s }: { s: string }) {
  const c = SEV[s] ?? SEV.info;
  return (
    <span style={{ padding:'2px 8px', borderRadius:4, fontSize:10, fontFamily:'var(--font-mono)',
      letterSpacing:'0.1em', fontWeight:700, textTransform:'uppercase' as const, flexShrink:0,
      background:c.bg, border:`1px solid ${c.bd}`, color:c.col }}>
      {s}
    </span>
  );
}

function IssueRow({ item }: { item: Issue }) {
  return (
    <div className={styles.row}>
      <Badge s={item.severity} />
      <div className={styles.rowBody}>
        <p className={styles.rowMsg}>
          {item.msg}
          {item.line && <span className={styles.rowLine}>line {item.line}</span>}
        </p>
        <p className={styles.rowFix}>↳ {item.fix}</p>
      </div>
    </div>
  );
}

function CplxRow({ fn }: { fn: FunctionComplexity }) {
  const col = fn.status==='high'?'#fc8181':fn.status==='medium'?'#f6ad55':'#68d391';
  return (
    <div className={styles.row} style={{ alignItems:'center' }}>
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--white)' }}>{fn.fn}()</span>
          <span style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:col }}>{fn.complexity}</span>
        </div>
        <div style={{ height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${Math.min((fn.complexity/10)*100,100)}%`, background:col, borderRadius:2, transition:'width 1s ease' }} />
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:10, color:'var(--dim)' }}>{fn.lines} lines</span>
          <Badge s={fn.status} />
        </div>
      </div>
    </div>
  );
}

const TABS = [
  { id:'security',   label:'Security'   },
  { id:'bugs',       label:'Bugs'       },
  { id:'lint',       label:'Lint'       },
  { id:'complexity', label:'Complexity' },
] as const;
type TId = typeof TABS[number]['id'];

interface Props { report:Report|null; loading:boolean; scanStep:number; scanSteps:string[]; }

export default function AnalysisPanel({ report, loading, scanStep, scanSteps }: Props) {
  const [tab, setTab] = useState<TId>('security');

  if (!report && !loading) return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <circle cx="40" cy="40" r="36" stroke="rgba(99,179,237,0.15)" strokeWidth="1.5" strokeDasharray="6 4"/>
          <circle cx="40" cy="40" r="20" stroke="rgba(99,179,237,0.10)" strokeWidth="1"/>
          <circle cx="40" cy="40" r="4"  fill="rgba(99,179,237,0.2)"/>
          <line x1="40" y1="4"  x2="40" y2="20" stroke="rgba(99,179,237,0.15)" strokeWidth="1.5"/>
          <line x1="40" y1="60" x2="40" y2="76" stroke="rgba(99,179,237,0.15)" strokeWidth="1.5"/>
          <line x1="4"  y1="40" x2="20" y2="40" stroke="rgba(99,179,237,0.15)" strokeWidth="1.5"/>
          <line x1="60" y1="40" x2="76" y2="40" stroke="rgba(99,179,237,0.15)" strokeWidth="1.5"/>
        </svg>
      </div>
      <p className={styles.emptyTitle}>Awaiting Analysis</p>
      <p className={styles.emptySub}>Paste code and hit Analyse</p>
    </div>
  );

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.ring} />
      <p className={styles.loadTitle}>Scanning…</p>
      <div className={styles.steps}>
        {scanSteps.map((step, i) => (
          <div key={step} className={`${styles.step} ${i < scanStep ? styles.done : ''}`}>
            <span className={styles.stepIcon}>{i < scanStep ? '✓' : '○'}</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );

  if (!report) return null;

  const isSecret = report.language === 'OjassScript';
  const counts: Record<TId,number> = {
    security:report.security.length, bugs:report.bugs.length,
    lint:report.lint.length, complexity:report.complexity.length,
  };
  const total = report.bugs.length + report.lint.length + report.security.length;

  return (
    <div className={`${styles.panel} ${isSecret ? styles.panelGold : ''}`}>
      <div className={styles.header}>
        <p className={styles.headerLabel} style={isSecret?{color:'var(--gold)'}:{}}>
          {isSecret ? "🥚 SECRET MODE · OJASS '26" : 'OUTPUT'}
        </p>
        <div className={styles.issuePill} style={isSecret?{borderColor:'rgba(246,224,94,0.3)',background:'rgba(246,224,94,0.06)',color:'#f6e05e'}:{}}>
          {isSecret ? '✦ 100 / 100' : <><span style={{color:'#fc8181'}}>⚠</span>{total} issues</>}
        </div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.scoreRow}>
          <ScoreMeter score={report.score} />
          <div className={styles.cards}>
            <div className={styles.card} style={isSecret?{borderColor:'rgba(246,224,94,0.25)',background:'rgba(246,224,94,0.05)'}:{}}>
              <p className={styles.cardLabel}>LANGUAGE</p>
              <p className={styles.cardVal} style={{color:isSecret?'var(--gold)':'var(--cyan)'}}>{report.language}</p>
              <p className={styles.cardSub}>{report.confidence}% confidence</p>
            </div>
            <div className={styles.card} style={{borderColor:'rgba(252,129,129,0.25)',background:'rgba(252,129,129,0.05)'}}>
              <p className={styles.cardLabel}>CRITICAL</p>
              <p className={styles.cardVal} style={{color:'#fc8181'}}>{report.security.filter(s=>s.severity==='critical').length}</p>
              <p className={styles.cardSub}>security issues</p>
            </div>
            <div className={styles.miniRow}>
              {(['bugs','lint','security'] as const).map(k=>(
                <div key={k} className={styles.mini}>
                  <p className={styles.miniNum}>{(report[k] as Issue[]).length}</p>
                  <p className={styles.miniLabel}>{k.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.formula}>
          <p className={styles.formulaLabel}>SCORING FORMULA</p>
          <p className={styles.formulaText}>
            Score = 100 − (w<sub>bug</sub>·P<sub>bug</sub> + w<sub>sec</sub>·P<sub>sec</sub> + w<sub>cplx</sub>·P<sub>cplx</sub> + w<sub>red</sub>·P<sub>red</sub> + w<sub>lint</sub>·P<sub>lint</sub>)
          </p>
          <p className={styles.formulaScore}>
            Your score: <strong style={{color:report.score<40?'#fc8181':report.score<70?'#f6e05e':'#68d391'}}>{report.score} / 100</strong>
          </p>
        </div>

        <div className={styles.tabs}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} className={`${styles.tabBtn} ${tab===t.id?styles.tabActive:''}`}>
              {t.label}
              <span className={`${styles.count} ${tab===t.id?styles.countActive:''}`}>{counts[t.id]}</span>
            </button>
          ))}
        </div>

        <div className={styles.issues}>
          {tab==='security'   && report.security.map((x,i)  => <IssueRow key={i} item={x} />)}
          {tab==='bugs'       && report.bugs.map((x,i)       => <IssueRow key={i} item={x} />)}
          {tab==='lint'       && report.lint.map((x,i)       => <IssueRow key={i} item={x} />)}
          {tab==='complexity' && report.complexity.map((x,i) => <CplxRow  key={i} fn={x}   />)}
          {counts[tab]===0 && (
            <div className={styles.noIssues}>
              <span style={{color:'#68d391',fontSize:20}}>✓</span>
              {isSecret ? `Perfect ${tab} — OJASS '26 certified!` : `No ${tab} issues found`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}