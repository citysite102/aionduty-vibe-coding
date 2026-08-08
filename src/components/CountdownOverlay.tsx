import { useCallback, useEffect, useRef, useState } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Plus, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { LetterField } from './LetterField';

/**
 * 現場用的倒數計時器。跟投影片是分開的一層，任何一頁都能叫出來。
 *
 * 三個狀態：
 *   hidden  只有操作列上那顆按鈕
 *   panel   設定時間
 *   run     整面黑底的字母場，就是那個參考影格
 *
 * 叫出來的時候會把投影片的左右鍵接管掉（App.tsx 靠 onActiveChange 收到通知），
 * 否則講者按空白鍵想暫停音樂，投影片會偷偷跳頁。
 */

const OPEN_EVENT = 'countdown:open';

/** 給操作列那顆按鈕用。用事件而不是把狀態拉到 App，是為了不讓計時器的內部狀態外流 */
export function openCountdown() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

const TRACKS = [
  { file: 'soft-conference-drift.mp3', title: 'Soft Conference Drift' },
  { file: 'code-fi-drift.mp3', title: 'Code-Fi Drift' },
  { file: 'code-fi-drift-ii.mp3', title: 'Code-Fi Drift II' },
  { file: 'neon-breakpoint.mp3', title: 'Neon Breakpoint' },
  { file: 'neon-breakpoint-ii.mp3', title: 'Neon Breakpoint II' },
];

const PRESETS = [1, 3, 5, 10, 15];
const FADE_MS = 900;

function trackUrl(file: string) {
  return `${import.meta.env.BASE_URL}music/${file}`;
}

function clock(total: number) {
  const m = Math.floor(Math.max(0, total) / 60);
  const s = Math.max(0, total) % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** 唱片。溝紋是一圈圈的 border，中間那張標籤放曲名 */
function Vinyl({ playing, title }: { playing: boolean; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 shrink-0">
        <div
          className="animate-spin absolute inset-0 rounded-full border border-slate-700 bg-[#08080c] shadow-[0_0_30px_-8px_rgba(56,189,248,0.5)]"
          style={{ animationDuration: '3.6s', animationPlayState: playing ? 'running' : 'paused' }}
        >
          {[86, 72, 58, 44].map((p) => (
            <div
              key={p}
              className="absolute rounded-full border border-slate-800/80"
              style={{ inset: `${(100 - p) / 2}%` }}
            />
          ))}
          <div className="absolute inset-[30%] rounded-full bg-sky-500/80" />
          {/* 唱針掃過的那道反光，靠它才看得出唱片在轉 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/12 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#08080c]" />
        </div>
      </div>
      <div className="min-w-0">
        <div className="font-mono text-xs uppercase tracking-widest text-slate-500">
          {playing ? 'Now playing' : 'Paused'}
        </div>
        <div className="truncate text-sm font-medium text-slate-200">{title}</div>
      </div>
    </div>
  );
}

export function CountdownOverlay({ onActiveChange }: { onActiveChange?: (active: boolean) => void }) {
  const [mode, setMode] = useState<'hidden' | 'panel' | 'run'>('hidden');
  const [minutes, setMinutes] = useState(5);
  const [total, setTotal] = useState(300);
  const [left, setLeft] = useState(300);
  const [running, setRunning] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [trackIdx, setTrackIdx] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  /** 用結束時間戳推算剩餘秒數，分頁被瀏覽器降速時才不會越走越慢 */
  const endAtRef = useRef(0);

  useEffect(() => {
    onActiveChange?.(mode !== 'hidden');
  }, [mode, onActiveChange]);

  // --- 音樂 ---
  const stopFade = () => {
    if (fadeRef.current !== null) {
      window.clearInterval(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    stopFade();
    const from = el.volume;
    const started = performance.now();
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - started) / FADE_MS);
      el.volume = from + (target - from) * t;
      if (t >= 1) {
        stopFade();
        onDone?.();
      }
    }, 40);
  }, []);

  const playTrack = useCallback((idx: number) => {
    const el = audioRef.current;
    if (!el) return;
    setTrackIdx(idx);
    el.src = trackUrl(TRACKS[idx].file);
    el.volume = 0;
    el.play().then(() => fadeTo(muted ? 0 : volume)).catch(() => {
      // 瀏覽器擋掉自動播放時就安靜地跳過，計時本身不受影響
    });
  }, [fadeTo, muted, volume]);

  const pickRandomTrack = useCallback((exclude?: number) => {
    const pool = TRACKS.map((_, i) => i).filter((i) => i !== exclude);
    return pool[(Math.random() * pool.length) | 0];
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (el) el.volume = muted ? 0 : volume;
  }, [muted, volume]);

  // --- 計時 ---
  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const remain = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000));
      setLeft(remain);
      if (remain === 0) {
        setRunning(false);
        fadeTo(0, () => audioRef.current?.pause());
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [running, fadeTo]);

  const start = useCallback((seconds: number) => {
    setTotal(seconds);
    setLeft(seconds);
    endAtRef.current = Date.now() + seconds * 1000;
    setRunning(true);
    setMode('run');
    playTrack(pickRandomTrack());
  }, [playTrack, pickRandomTrack]);

  const toggleRun = useCallback(() => {
    setRunning((r) => {
      const el = audioRef.current;
      if (r) {
        el?.pause();
        return false;
      }
      if (left <= 0) return false;
      endAtRef.current = Date.now() + left * 1000;
      el?.play().catch(() => {});
      return true;
    });
  }, [left]);

  const addMinute = useCallback(() => {
    setLeft((l) => {
      const next = l + 60;
      endAtRef.current = Date.now() + next * 1000;
      return next;
    });
    setTotal((t) => t + 60);
    if (!running && left >= 0) {
      setRunning(true);
      audioRef.current?.play().catch(() => {});
    }
  }, [running, left]);

  const reset = useCallback(() => {
    setLeft(total);
    endAtRef.current = Date.now() + total * 1000;
    setRunning(true);
    const el = audioRef.current;
    if (el && el.paused) el.play().catch(() => {});
  }, [total]);

  const close = useCallback(() => {
    setRunning(false);
    fadeTo(0, () => {
      audioRef.current?.pause();
    });
    setMode('hidden');
  }, [fadeTo]);

  // --- 鍵盤 ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA');

      if (mode === 'hidden') {
        if (!typing && (e.key === 't' || e.key === 'T')) {
          e.preventDefault();
          setMode('panel');
        }
        return;
      }

      // 面板與全螢幕都在這一層把按鍵吃掉，投影片才不會跟著跳
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (typing) return;

      if (mode === 'run') {
        if (e.key === ' ') {
          e.preventDefault();
          toggleRun();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          addMinute();
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          reset();
        } else if (e.key === 'n' || e.key === 'N') {
          e.preventDefault();
          playTrack(pickRandomTrack(trackIdx));
        }
      }
    };
    // capture 階段先攔，App.tsx 的翻頁監聽掛在冒泡階段
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [mode, close, toggleRun, addMinute, reset, playTrack, pickRandomTrack, trackIdx]);

  useEffect(() => {
    const onOpen = () => setMode('panel');
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => () => stopFade(), []);

  const done = left === 0;

  return (
    <>
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => playTrack(pickRandomTrack(trackIdx))}
      />

      {mode === 'panel' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
          onClick={(e) => { e.stopPropagation(); close(); }}
        >
          <div
            className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center gap-2.5">
              <Timer size={20} className="text-sky-400" />
              <h2 className="text-lg font-bold text-slate-100">倒數計時</h2>
              <button
                type="button"
                onClick={close}
                className="ml-auto rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200"
                aria-label="關閉"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mb-4 grid grid-cols-5 gap-2">
              {PRESETS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => { setMinutes(m); start(m * 60); }}
                  className="rounded-xl border border-slate-800 bg-slate-950 py-3 text-center transition-colors hover:border-sky-500/50 hover:text-sky-300"
                >
                  <div className="font-mono text-lg font-bold text-slate-200">{m}</div>
                  <div className="text-xs text-slate-500">分鐘</div>
                </button>
              ))}
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
              <label htmlFor="ctd-min" className="text-sm text-slate-400">自訂</label>
              <input
                id="ctd-min"
                type="number"
                min={1}
                max={180}
                value={minutes}
                onChange={(e) => setMinutes(Math.max(1, Math.min(180, Number(e.target.value) || 1)))}
                onKeyDown={(e) => { if (e.key === 'Enter') start(minutes * 60); }}
                className="w-20 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-center font-mono text-slate-200 focus:border-sky-500/50 focus:outline-none"
              />
              <span className="text-sm text-slate-500">分鐘</span>
              <button
                type="button"
                onClick={() => start(minutes * 60)}
                className="ml-auto flex items-center gap-1.5 rounded-lg bg-sky-500 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
              >
                <Play size={14} /> 開始
              </button>
            </div>

            <p className="text-xs leading-relaxed text-slate-500">
              開始後會隨機播一首背景音樂。全螢幕時：空白鍵暫停、
              <span className="font-mono text-slate-400">↑</span> 加一分鐘、
              <span className="font-mono text-slate-400">R</span> 重來、
              <span className="font-mono text-slate-400">N</span> 換一首、
              <span className="font-mono text-slate-400">Esc</span> 離開。
            </p>
          </div>
        </div>
      )}

      {mode === 'run' && (
        <div
          className="fixed inset-0 z-[100] bg-black"
          onClick={(e) => e.stopPropagation()}
        >
          <LetterField seconds={left} paused={!running} />

          {/* 讀秒。字母場負責氣氛，這一行負責真的看得懂 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-14 flex flex-col items-center gap-1">
            <div className="font-mono text-2xl tracking-[0.4em] text-white/70">{clock(left)}</div>
            {done && (
              <div className="text-sm font-bold tracking-[0.3em] text-sky-400">時間到</div>
            )}
          </div>

          {/* 進度條，剩多少一眼看得出來 */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-white/60 transition-[width] duration-300 ease-linear"
              style={{ width: `${total > 0 ? (left / total) * 100 : 0}%` }}
            />
          </div>

          <div className="absolute bottom-6 left-6">
            <Vinyl playing={running && !muted} title={TRACKS[trackIdx].title} />
          </div>

          <div className="absolute bottom-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label={muted ? '取消靜音' : '靜音'}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              onChange={(e) => { setVolume(Number(e.target.value) / 100); setMuted(false); }}
              className="w-20 accent-sky-400"
              aria-label="音量"
            />
            <button
              type="button"
              onClick={() => playTrack(pickRandomTrack(trackIdx))}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="換一首"
            >
              <SkipForward size={16} />
            </button>
            <span className="mx-1 h-5 w-px bg-white/10" />
            <button
              type="button"
              onClick={addMinute}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="加一分鐘"
            >
              <Plus size={16} />
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="重來"
            >
              <RotateCcw size={16} />
            </button>
            <button
              type="button"
              onClick={toggleRun}
              disabled={done}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30"
              aria-label={running ? '暫停' : '繼續'}
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              type="button"
              onClick={close}
              className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="離開計時器"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
