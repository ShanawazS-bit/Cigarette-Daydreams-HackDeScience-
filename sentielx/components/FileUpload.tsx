'use client';
import { useState, useCallback, useRef } from 'react';
import styles from './FileUpload.module.css';

interface Props {
  file: File | null;
  onFile: (f: File) => void;
}

const ACCEPT = '.js,.ts,.jsx,.tsx,.py,.java,.cpp,.c,.cs,.go,.rs,.php,.rb,.swift,.kt,.html,.css,.json';

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const LANG_ICONS: Record<string, string> = {
  js:'🟨', ts:'🟦', jsx:'⚛️', tsx:'⚛️', py:'🐍', java:'☕', cpp:'⚙️',
  c:'⚙️', cs:'💜', go:'🐹', rs:'🦀', php:'🐘', rb:'💎', swift:'🦅',
  kt:'🎯', html:'🌐', css:'🎨', json:'📋',
};

export default function FileUpload({ file, onFile }: Props) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = useCallback((f: File) => { onFile(f); }, [onFile]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0]; if (f) accept(f);
  }, [accept]);

  const ext  = file?.name.split('.').pop()?.toLowerCase() ?? '';
  const icon = LANG_ICONS[ext] ?? '📄';

  return (
    <div className={styles.wrap}>
      {!file ? (
        <div
          className={`${styles.dropzone} ${dragging ? styles.dragOver : ''}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className={styles.dropIcon}>
            <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
              <rect x="8" y="12" width="36" height="44" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
              <path d="M44 12v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M36 12l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M26 38l-6-6 6-6M34 26l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <p className={styles.dropTitle}>{dragging ? 'Drop it!' : 'Drop your file here'}</p>
          <p className={styles.dropSub}>or <span className={styles.browse}>browse files</span></p>
          <div className={styles.accepts}>
            {['JS','TS','PY','JAVA','C++','GO','RS','PHP'].map(l => (
              <span key={l} className={styles.extTag}>{l}</span>
            ))}
            <span className={styles.extTag}>+ more</span>
          </div>
          <input ref={inputRef} type="file" accept={ACCEPT} className={styles.hidden}
            onChange={e => { const f = e.target.files?.[0]; if (f) accept(f); }} />
        </div>
      ) : (
        <div className={styles.fileCard}>
          <div className={styles.fileTop}>
            <span className={styles.fileIcon}>{icon}</span>
            <div className={styles.fileMeta}>
              <p className={styles.fileName}>{file.name}</p>
              <p className={styles.fileSize}>{formatSize(file.size)} · .{ext.toUpperCase()}</p>
            </div>
            <button className={styles.changeBtn} onClick={() => inputRef.current?.click()}>Change</button>
          </div>
          <input ref={inputRef} type="file" accept={ACCEPT} className={styles.hidden}
            onChange={e => { const f = e.target.files?.[0]; if (f) accept(f); }} />
          <FilePreview file={file} />
        </div>
      )}
    </div>
  );
}

function FilePreview({ file }: { file: File }) {
  const [text, setText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const load = useCallback(() => {
    if (text !== null || loading) return;
    setLoading(true);
    const r = new FileReader();
    r.onload = e => { setText(e.target?.result as string ?? ''); setLoading(false); };
    r.onerror = () => { setText('(could not read file)'); setLoading(false); };
    r.readAsText(file);
  }, [file, text, loading]);
  return (
    <div className={styles.preview}>
      {text === null
        ? <button className={styles.previewBtn} onClick={load}>{loading ? 'Loading…' : '👁 Preview file'}</button>
        : <pre className={styles.previewCode}>{text.slice(0, 3000)}{text.length > 3000 ? '\n… (truncated)' : ''}</pre>
      }
    </div>
  );
}