import type React from 'react';
import { AnimatedBlock } from './SlideLayout';

/**
 * 訊息塊：一段要跟周圍內文區隔開的話。結論、但書、正解、錯誤示範都走這個。
 *
 * 整框上淡色底加同色邊框，不用左側色條。
 * 色條只在框的一邊，視線掃過去容易漏掉，而且它跟卡片本身的 border 疊在一起會變成
 * 「有一條線比較粗」而不是「這一塊比較重要」。整框微亮才看得出是同一個層級的東西。
 *
 * 語意色跟 CLAUDE.md A-1 的表對齊，不要再自己拼 class：
 *
 *   focus  重點或結論。單一陳述，畫面上沒有對照對象。
 *   good   正反對照裡的「正解」那一側。
 *   warn   風險提示、但書。
 *   bad    錯誤做法的示範。
 *   muted  補充或限制。講的是次要的事，不需要視覺重量，維持灰階。
 *
 * `focus` 的 sky 底色不算新增強調色，因為它取代的就是原本那條 sky 色條。
 */
const TONES = {
  focus: 'bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]',
  good: 'bg-emerald-500/5 border-emerald-500/25 shadow-[0_0_32px_-12px_rgba(16,185,129,0.45)]',
  warn: 'bg-amber-500/5 border-amber-500/25',
  bad: 'bg-rose-500/5 border-rose-500/25',
  muted: 'bg-slate-900 border-slate-800',
} as const;

const LABEL_TONES = {
  focus: 'text-sky-300',
  good: 'text-emerald-300',
  warn: 'text-amber-300',
  bad: 'text-rose-300',
  muted: 'text-slate-500',
} as const;

export type CalloutTone = keyof typeof TONES;

/**
 * 預錄拆頁一頁只講一件事，字級整體比 live 頁大一階，這裡跟著它走。
 * 不要為了「看起來比較有份量」在 live 頁用 rec。
 */
const SIZES = {
  slide: { pad: 'px-6 py-5', label: 'text-sm', body: 'text-base', foot: 'text-sm' },
  rec: { pad: 'px-7 py-5', label: 'text-base', body: 'text-xl', foot: 'text-base' },
} as const;

/** 給內層版面特殊、不方便換成元件的地方直接套的 class。內容自己排。 */
export function calloutClass(tone: CalloutTone = 'focus', size: keyof typeof SIZES = 'slide') {
  return `rounded-2xl border ${SIZES[size].pad} ${TONES[tone]}`;
}

export function Callout({
  tone = 'focus',
  size = 'slide',
  label,
  icon: Icon,
  footnote,
  stepIndex,
  className = '',
  children,
}: {
  tone?: CalloutTone;
  size?: keyof typeof SIZES;
  /** 小標。要標語意時用，例如「但書」「正解」。 */
  label?: string;
  /** 左側圖示，跟 label 一起用。lucide 元件。 */
  icon?: React.ElementType;
  /** 次要的那一段，會加一條分隔線放在下面。 */
  footnote?: React.ReactNode;
  stepIndex?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const s = SIZES[size];
  const head = (label || Icon) && (
    <div className={`mb-2 flex items-center gap-2 font-bold ${s.label} ${LABEL_TONES[tone]}`}>
      {Icon && <Icon aria-hidden="true" size={18} className="shrink-0" />}
      {label}
    </div>
  );

  return (
    <AnimatedBlock stepIndex={stepIndex} className={`${calloutClass(tone, size)} ${className}`}>
      {head}
      <div className={`${s.body} leading-relaxed text-slate-300`}>{children}</div>
      {footnote && (
        <div className={`mt-3 border-t border-slate-100/10 pt-3 ${s.foot} leading-relaxed text-slate-400`}>
          {footnote}
        </div>
      )}
    </AnimatedBlock>
  );
}
