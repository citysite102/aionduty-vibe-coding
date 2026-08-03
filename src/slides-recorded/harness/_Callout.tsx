import type React from 'react';
import { AnimatedBlock } from '../../components/SlideLayout';

/**
 * 左側色條的訊息塊。預錄頁裡這種塊只有三種語意，不要再各自拼 class。
 *
 * focus  重點或結論。單一陳述，畫面上沒有對照對象。
 * good   正反對照裡的「正解」那一側。綠色加微光，跟 DontDo 的綠框同一家族。
 * muted  限制或但書。講的是做不到的事，不需要視覺重量。
 *
 * 微光沿用流程軌選取態的寫法（shadow-[0_0_28px_-8px_...]）。
 * 「被選中的那一個會微微發亮」在這份簡報裡已經是既有語彙，
 * 這裡只是把它從流程軌延伸到內容塊，不是新發明一種效果。
 */
const TONES = {
  focus: 'bg-slate-900 border-slate-800 border-l-sky-500',
  good: 'bg-emerald-950/20 border-emerald-500/20 border-l-emerald-500 shadow-[0_0_28px_-8px_rgba(16,185,129,0.5)]',
  muted: 'bg-slate-900 border-slate-800 border-l-slate-600',
} as const;

const LABEL_TONES = {
  focus: 'text-sky-400',
  good: 'text-emerald-400',
  muted: 'text-slate-500',
} as const;

export function Callout({
  tone = 'focus',
  label,
  stepIndex,
  className = '',
  children,
}: {
  tone?: keyof typeof TONES;
  label?: string;
  stepIndex?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatedBlock
      stepIndex={stepIndex}
      className={`rounded-2xl border border-l-4 px-7 py-5 ${TONES[tone]} ${className}`}
    >
      {label && <div className={`mb-2 font-mono text-base ${LABEL_TONES[tone]}`}>{label}</div>}
      <div className="text-xl leading-relaxed text-slate-300">{children}</div>
    </AnimatedBlock>
  );
}
