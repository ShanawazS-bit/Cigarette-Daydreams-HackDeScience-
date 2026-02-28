'use client';
import { useEffect, useState } from 'react';

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

export function useKonamiCode(onSuccess: () => void) {
  const [seq, setSeq] = useState<string[]>([]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setSeq(prev => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(',') === KONAMI.join(',')) { onSuccess(); return []; }
        return next;
      });
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSuccess]);
}

export function useSecretWord(word: string, onSuccess: () => void) {
  useEffect(() => {
    let buf = '';
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      buf = (buf + e.key).slice(-word.length);
      if (buf.toLowerCase() === word.toLowerCase()) { onSuccess(); buf = ''; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [word, onSuccess]);
}