import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * 工具箱的共用零件。視覺跟簡報同一套：slate 底、sky 當唯一強調色，
 * orange 只用在 Claude 的專有名詞（CLAUDE.md、AGENTS.md、斜線指令）。
 */

export function Panel({
  title,
  desc,
  children,
  className = '',
}: {
  title: string;
  desc?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-7 ${className}`}>
      <h2 className="text-lg font-bold text-slate-100 leading-snug">{title}</h2>
      {desc && <p className="text-slate-400 text-base leading-relaxed mt-2 max-w-prose">{desc}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2.5">
        <span className="block text-base font-bold text-slate-200 leading-snug">{label}</span>
        {hint && <span className="block text-sm text-slate-500 leading-relaxed mt-1">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

const INPUT =
  'w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-base text-slate-100 ' +
  'placeholder:text-slate-600 transition-colors focus:border-sky-500/50 focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-sky-500/40';

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={INPUT} />;
}

export function TextArea({
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={rows} {...props} className={`${INPUT} leading-relaxed resize-y`} />;
}

export function Select({
  options,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] }) {
  return (
    <select {...props} className={INPUT}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full text-left rounded-xl border px-4 py-3.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 ${
        checked
          ? 'border-sky-500/40 bg-sky-500/5'
          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
            checked ? 'border-sky-400 bg-sky-500/20 text-sky-300' : 'border-slate-700'
          }`}
        >
          {checked && <Check size={11} strokeWidth={3} />}
        </span>
        <span>
          <span className="block text-base text-slate-200 leading-snug">{label}</span>
          {hint && <span className="block text-sm text-slate-500 leading-relaxed mt-1">{hint}</span>}
        </span>
      </div>
    </button>
  );
}

export function CopyButton({ text, label = '複製' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 沒有剪貼簿權限時退回舊做法，公司配的瀏覽器不一定給
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-lg border border-sky-500/30 bg-sky-500/10 px-3.5 py-2 text-sm font-bold text-sky-300 transition-colors hover:bg-sky-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
    >
      {done ? <Check size={14} /> : <Copy size={14} />}
      {done ? '已複製' : label}
    </button>
  );
}

/** 右側輸出面板，長得像一個檔案視窗 */
export function OutputPane({
  filename,
  body,
  actions,
  children,
}: {
  filename: string;
  body: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col">
      <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-5 py-3">
        <span className="font-mono text-sm text-slate-300">{filename}</span>
        <div className="ml-auto flex items-center gap-2">
          {actions}
          <CopyButton text={body} />
        </div>
      </div>
      <pre className="min-h-[9rem] px-6 py-5 font-mono text-sm leading-[1.75] text-slate-300 whitespace-pre-wrap break-words overflow-x-auto">
        {body}
      </pre>
      {children}
    </div>
  );
}

/** 一行說明，用在需要提醒但不是錯誤的地方 */
export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-800 pt-4 mt-5 max-w-prose">
      {children}
    </p>
  );
}

export function Mono({ children }: { children: React.ReactNode }) {
  return <code className="font-mono text-orange-300">{children}</code>;
}

/** 把多行輸入切成陣列，空行丟掉 */
export function lines(v: string): string[] {
  return v
    .split('\n')
    .map((s) => s.replace(/^[-・·•\s]+/, '').trim())
    .filter(Boolean);
}
