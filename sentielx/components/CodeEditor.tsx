'use client';
import styles from './CodeEditor.module.css';

interface Props { value: string; onChange: (v: string) => void; filename?: string; }

export default function CodeEditor({ value, onChange, filename = 'snippet.js' }: Props) {
  return (
    <div className={styles.editor}>
      <div className={styles.chrome}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.red}`}    />
          <span className={`${styles.dot} ${styles.yellow}`} />
          <span className={`${styles.dot} ${styles.green}`}  />
        </div>
        <span className={styles.filename}>{filename}</span>
        <span className={styles.langBadge}>JS</span>
      </div>
      <div className={styles.body}>
        <div className={styles.lineNums} aria-hidden>
          {value.split('\n').map((_,i) => <span key={i} className={styles.lineNum}>{i+1}</span>)}
        </div>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={e => onChange(e.target.value)}
          spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="off"
        />
      </div>
    </div>
  );
}