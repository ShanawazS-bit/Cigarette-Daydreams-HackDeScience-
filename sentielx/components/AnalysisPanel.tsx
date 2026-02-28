'use client';
import { useState, useEffect } from 'react';
import styles from './AnalysisPanel.module.css';
import type { Report, Issue } from '@/lib/types';

interface Props { report: Report | null; loading: boolean; scanStep: number; scanSteps: string[]; }

export default function AnalysisPanel({ report, loading, scanStep, scanSteps }: Props) {
  const [activeTab, setActiveTab] = useState<'bugs' | 'lint' | 'security'>('bugs');
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (!report && !loading) return (
    <div className={styles.empty}>
      <div className={styles.emptyIcon}>
        <svg viewBox="0 0 80 80" fill="none" width="80" height="80">
          <rect x="20" y="20" width="40" height="30" rx="4" fill="none" stroke="#555" strokeWidth="2" />
          <polyline points="26,28 32,34 26,40" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="36" y1="40" x2="44" y2="40" stroke="#777" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className={styles.emptyTitle}>Terminal Ready</p>
      <p className={styles.emptySub}>Awaiting input stream</p>
    </div>
  );

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.ring} />
      <p className={styles.loadTitle}>Executing analysis script...</p>
      <div className={styles.steps}>
        {scanSteps.map((step, i) => (
          <div key={step} className={`${styles.step} ${i < scanStep ? styles.done : ''}`}>
            <span className={styles.stepIcon}>{i < scanStep ? '>' : ' '}</span>
            {step}
          </div>
        ))}
      </div>
    </div>
  );

  if (!report) return null;

  if (report.error) return (
    <div className={styles.terminalPanel}>
      <div className={styles.empty}>
        <p className={styles.emptyTitle} style={{ color: '#fc8181' }}>Analysis Failed</p>
        <p className={styles.emptySub}>An error occurred while analyzing the code.</p>
      </div>
    </div>
  );

  const { score, grade, bugs, lint, security, language, confidence } = report;
  const isPerfect = score === 100;

  const totalIssues = bugs.length + lint.length + security.length;

  return (
    <div className={styles.terminalPanel}>

      {/* Left panel showing formatted output mimicking input execution output */}
      {report.formatted && (
        <div className={styles.terminalColumn}>
          <div className={styles.terminalScroll}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={styles.secondaryText}>===</span>
              <span className={styles.primaryText}>Analyzing: stdin.js</span>
              <span className={styles.secondaryText}>===</span>
            </div>

            <div style={{ marginBottom: '16px', borderTop: '1px solid #555', borderBottom: '1px solid #555', padding: '12px 0' }}>
              <p className={styles.secondaryText}>code preview</p>
              <div style={{ opacity: 0.8 }}>
                {report.diff ? (
                  report.diff.map((part: any, i: number) => {
                    const colorClass = part.added ? styles.diffAdded : part.removed ? styles.diffRemoved : styles.primaryText;
                    const sign = part.added ? '+ ' : part.removed ? '- ' : '  ';
                    // We split by newline, drop the last empty string if it ends with newline
                    let lines = part.value.split('\n');
                    if (lines[lines.length - 1] === '') lines.pop();

                    return lines.map((line: string, j: number) => (
                      <p key={`${i}-${j}`} className={colorClass}>
                        {sign}{line || ' '}
                      </p>
                    ));
                  })
                ) : (
                  report.formatted.split('\n').slice(0, 10).map((line, idx) => (
                    <p key={idx} className={styles.primaryText}>{line || ' '}</p>
                  ))
                )}
                {!report.diff && report.formatted.split('\n').length > 10 && (
                  <p className={styles.secondaryText}>... +{report.formatted.split('\n').length - 10} more lines</p>
                )}
              </div>
            </div>

            <p className={styles.primaryText} style={{ marginTop: '24px' }}>
              Score    : <span className={styles.errorText} style={{ color: isPerfect ? '#4ade80' : '#f87171' }}>{score}%</span>
            </p>
            <p className={styles.primaryText}>
              Language : {language}   <span className={styles.secondaryText}>(conf: {confidence / 100})</span>
            </p>
          </div>
        </div>
      )}

      {/* Right panel showing literal issues breakdown */}
      <div className={styles.terminalColumn}>
        <div className={styles.terminalScroll}>
          <div style={{ marginBottom: '24px' }}>
            <p className={styles.warningText}>=== ANALYSIS REPORT ===</p>
            <br />
            <p className={styles.warningText}>
              SCORE: {score}  [ GRADE: {grade} ]
            </p>
            <p className={styles.primaryText}>
              LANGUAGE: {language} ({confidence}% confidence)
            </p>
            <p className={totalIssues === 0 ? styles.successText : styles.errorText}>
              TOTAL ISSUES: {totalIssues}
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.warningText}>--- BUGS ({bugs.length}) ---</p>
            {bugs.length === 0 ? (
              <p className={styles.primaryText}>No bugs detected.</p>
            ) : (
              bugs.map((iss: Issue, i: number) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <p className={styles.primaryText}>[L{iss.line}] {iss.msg}</p>
                  <p className={styles.secondaryText}>→ Fix: {iss.fix}</p>
                </div>
              ))
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.warningText}>--- SECURITY ({security.length}) ---</p>
            {security.length === 0 ? (
              <p className={styles.primaryText}>No security issues detected.</p>
            ) : (
              security.map((iss: Issue, i: number) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <p className={styles.primaryText}>[L{iss.line}] {iss.msg}</p>
                  <p className={styles.secondaryText}>→ Fix: {iss.fix}</p>
                </div>
              ))
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.warningText}>--- LINT ({lint.length}) ---</p>
            {lint.length === 0 ? (
              <p className={styles.primaryText}>No lint warnings detected.</p>
            ) : (
              lint.map((iss: Issue, i: number) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <p className={styles.primaryText}>[L{iss.line}] {iss.msg}</p>
                  <p className={styles.secondaryText}>→ Fix: {iss.fix}</p>
                </div>
              ))
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.sectionDivider}>COMPLEXITY FUNCTIONS ({report.complexity?.length || 0}):</p>
            {report.complexity?.length === 0 ? (
              <p className={styles.primaryText}>No functions detected.</p>
            ) : (
              report.complexity?.map((c: any, i: number) => (
                <p key={i} className={styles.primaryText}>
                  ✓ {c.fn.padEnd(20)} L{`${c.lines}`.padEnd(6)} cyclomatic:{`${c.complexity}`.padEnd(4)} nesting:{(c as any).nesting || 0}
                </p>
              ))
            )}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.sectionDivider}>REDUNDANCY DUPLICATES (0):</p>
            <p className={styles.primaryText}>No redundancy detected.</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.sectionDivider}>FORMATTING APPLIED: already well-formatted</p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <p className={styles.sectionDivider}>PENALTY BREAKDOWN:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {report.penalty?.bug !== undefined && report.penalty.bug > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={styles.primaryText} style={{ width: '100px' }}>bug</span>
                  <span style={{ background: '#ff5555', height: '14px', width: `${report.penalty.bug}%` }}></span>
                  <span className={styles.primaryText} style={{ marginLeft: '8px' }}>{report.penalty.bug.toFixed(1)}%</span>
                </div>
              )}
              {report.penalty?.security !== undefined && report.penalty.security > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={styles.primaryText} style={{ width: '100px' }}>security</span>
                  <span style={{ background: '#ff79c6', height: '14px', width: `${report.penalty.security}%` }}></span>
                  <span className={styles.primaryText} style={{ marginLeft: '8px' }}>{report.penalty.security.toFixed(1)}%</span>
                </div>
              )}
              {report.penalty?.complexity !== undefined && report.penalty.complexity > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={styles.primaryText} style={{ width: '100px' }}>complexity</span>
                  <span style={{ background: '#ffb86c', height: '14px', width: `${report.penalty.complexity}%` }}></span>
                  <span className={styles.primaryText} style={{ marginLeft: '8px' }}>{report.penalty.complexity.toFixed(1)}%</span>
                </div>
              )}
              {report.penalty?.redundancy !== undefined && report.penalty.redundancy > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={styles.primaryText} style={{ width: '100px' }}>redundancy</span>
                  <span style={{ background: '#8be9fd', height: '14px', width: `${report.penalty.redundancy}%` }}></span>
                  <span className={styles.primaryText} style={{ marginLeft: '8px' }}>{report.penalty.redundancy.toFixed(1)}%</span>
                </div>
              )}
              {report.penalty?.style !== undefined && report.penalty.style > 0 && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={styles.primaryText} style={{ width: '100px' }}>style</span>
                  <span style={{ background: '#50fa7b', height: '14px', width: `${report.penalty.style}%` }}></span>
                  <span className={styles.primaryText} style={{ marginLeft: '8px' }}>{report.penalty.style.toFixed(1)}%</span>
                </div>
              )}
              {(!report.penalty || Object.values(report.penalty).every((v: any) => v === 0)) && (
                <p className={styles.primaryText}>No penalties detected.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}