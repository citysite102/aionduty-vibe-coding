/**
 * Remotion 的色票。2026-10-05 從原本的 #0E0F13／#5B8DEF 一組改成跟投影片同一套，
 * 理由是預告片會把這裡算出來的片段跟投影片的螢幕錄影剪在一起，兩套深藍黑接在一起
 * 看得出色溫不同。值取自根目錄 CLAUDE.md A-1 的 slate／sky 階，對照如下：
 *   bg #020617 = 投影片整頁背景、card #0f172a = slate-900、border #1e293b = slate-800
 *   textMain #f1f5f9 = slate-100、textSub #94a3b8 = slate-400、dim #64748b = slate-500
 *   accent #38bdf8 = sky-400、bad #f87171 = red-400
 * 要再加顏色之前先讀 A-1，這裡只該出現那七個色相。
 */
export const theme = {
  bg: '#020617',
  card: '#0f172a',
  border: '#1e293b',
  textMain: '#f1f5f9',
  textSub: '#94a3b8',
  dim: '#64748b',
  accent: '#38bdf8',
  bad: '#f87171',
  fontSans: '"Noto Sans TC", sans-serif',
  fontMono: '"JetBrains Mono", monospace'
};

export const springConfig = {
  damping: 20,
  stiffness: 100,
  mass: 1,
};

export const fadeInMove = (frame: number, startFrame: number, duration: number = 15) => {
  const progress = Math.max(0, Math.min(1, (frame - startFrame) / duration));
  // easeOutCubic
  const ease = 1 - Math.pow(1 - progress, 3);
  return {
    opacity: ease,
    transform: `translateY(${(1 - ease) * 12}px)`
  };
};
