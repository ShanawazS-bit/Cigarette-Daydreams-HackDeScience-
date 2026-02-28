'use client';
export default function ConstellationGrid({ golden = false }: { golden?: boolean }) {
  const col = golden ? 'rgba(246,224,94,0.14)' : 'rgba(99,179,237,0.12)';
  return (
    <div style={{
      position:'fixed', inset:0, pointerEvents:'none', zIndex:0,
      backgroundImage:`radial-gradient(circle, ${col} 1px, transparent 1px)`,
      backgroundSize:'48px 48px',
      maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      WebkitMaskImage:'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      opacity:0.45, transition:'all 1s',
    }} />
  );
}