import type React from 'react';
import { AnimatedBlock } from '../../components/SlideLayout';

type Row = [React.ReactNode, React.ReactNode];

/**
 * 左右對應的表格。三列以上的「A 對應到 B」都走這個，不要自己用 gap 加固定寬度拼。
 *
 * 只靠間距分欄的版本在投影幕上讀不出配對關係：左欄短、右欄長的時候，
 * 觀眾要自己連線。這裡補上表頭底色帶、列與列的橫線、兩欄之間的直線，
 * 讓每一組對應都有明確的框。
 *
 * 兩列以下的正反對照不要用這個，那種要的是左右並置的重量差，不是表格。
 */
export function PairTable({
  rows,
  headers,
  ratio = 'even',
  density = 'normal',
  stepIndex,
  className = '',
}: {
  rows: Row[];
  /** 表頭。省略就只有列，適合欄位意義已經寫在標題裡的情況 */
  headers?: [string, string];
  /** even 兩欄等寬；narrow 左欄窄一半，適合左邊是編號或短標籤 */
  ratio?: 'even' | 'narrow';
  /** 五列以上用 compact，否則整張表會把後面的結語擠出畫面 */
  density?: 'normal' | 'compact';
  stepIndex?: number;
  className?: string;
}) {
  const grid =
    ratio === 'narrow' ? 'grid-cols-[minmax(0,1fr)_minmax(0,2fr)]' : 'grid-cols-2';
  const cellY = density === 'compact' ? 'py-3.5' : 'py-5';

  return (
    <AnimatedBlock
      stepIndex={stepIndex}
      className={`overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 ${className}`}
    >
      {headers && (
        <div className={`grid ${grid} border-b border-slate-800 bg-slate-950/60 font-mono text-base text-slate-500`}>
          <div className="px-7 py-3.5">{headers[0]}</div>
          <div className="border-l border-slate-800 px-7 py-3.5">{headers[1]}</div>
        </div>
      )}

      {rows.map(([left, right], i) => (
        <div
          key={i}
          className={`grid ${grid} ${i > 0 || headers ? 'border-t border-slate-800' : ''}`}
        >
          <div className={`px-7 ${cellY} text-xl text-slate-200`}>{left}</div>
          <div className={`border-l border-slate-800 px-7 ${cellY} text-xl text-slate-400`}>{right}</div>
        </div>
      ))}
    </AnimatedBlock>
  );
}
