export const theme = {
  bg: '#0E0F13',
  textMain: '#F5F5F4',
  textSub: '#8A8F98',
  accent: '#5B8DEF',
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
