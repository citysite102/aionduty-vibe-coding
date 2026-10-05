/**
 * 預告片第 2 格（主張）：一句需求，分岔成兩條路。
 * 口白是「問題不在你不會寫程式，在於你把一個能動手的工具，當成只能聊天的對象在用。」
 *
 * 第一版做成了兩張並排的卡片加淡入，看起來是會動的投影片而不是 Motion Graphic。
 * 這一版改掉的是「動態本身要講出論點」：
 *   1. 需求從畫面中央往上移、縮小，再長出兩條分支連到左右，一個輸入兩種結果是用走位講的。
 *   2. 左欄三步間隔 25 frame，右欄間隔 12 frame。**快慢差一倍就是這一格的論點**，
 *      觀眾不必讀完文字就感覺得到哪一邊在等人、哪一邊自己在跑。
 *   3. 左欄講完之後整欄降到 35% 不透明度，畫面把注意力交給右邊。
 * 進場一律用遮罩橫掃（clipPath inset），不要淡入。淡入在影片裡看起來像沒做完。
 *
 * 兩個踩過的坑，改版面之前先看：
 *   - 分支線要給 SVG `pathLength={1}`。兩條路徑的實際長度不一樣，不正規化的話
 *     dasharray 會讓短的那條瞬間畫完、長的還在跑。
 *   - 兩欄要對稱地掛在畫面中線兩側（各 400px），分支才接得正。
 *
 * 根目錄 CLAUDE.md A-3 的動態負面清單管的是投影片，那是放在講者背後、不能搶注意力的東西。
 * 預告片的職務相反，它要在八秒內抓住人，所以 A-3 不適用於這個目錄的預告片片段。
 * 色彩（A-1）與文案（D 章）兩邊照樣共用。
 *
 * 長度 300 frame（10 秒），腳本那一格是 8 秒，多的留給剪接修尾巴。
 */
import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { theme } from './theme';

const LEFT_STEPS = ['它回你一段程式碼', '你複製、貼上', '你把紅字貼回去問'];
const RIGHT_STEPS = ['它自己把檔案建起來', '它自己跑一次', '它自己看紅字修到好'];

/** 左右兩欄的節奏差。左邊一步等 25 frame，右邊只等 12，這個數字就是這一格的論點。 */
const LEFT_GAP = 25;
const RIGHT_GAP = 12;

const COL_W = 700;
const LEFT_CX = 560; // 畫面中線 960 往左 400
const RIGHT_CX = 1360; // 往右 400
const FORK_Y = 300;

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * 由中間往兩側拉開的遮罩進場。影片裡這個比淡入有重量，而且看得出是設計過的。
 * 置中的文字要用這個，從左邊掃進來的版本會看起來像沒對齊。
 */
const wipe = (frame: number, start: number, dur = 14) => {
  const p = easeOut(clamp01((frame - start) / dur));
  return {
    clipPath: `inset(-20% ${(1 - p) * 50}% -20% ${(1 - p) * 50}%)`,
    opacity: p > 0 ? 1 : 0,
  };
};

export const ChatVsAgent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 需求那一行：先在畫面中央，第 22 frame 開始往上移並縮小
  const lift = easeOut(clamp01((frame - 22) / 20));
  const reqTop = interpolate(lift, [0, 1], [440, 118]);
  const reqSize = interpolate(lift, [0, 1], [88, 48]);

  // 分支線用 strokeDashoffset 畫出來
  const branch = easeOut(clamp01((frame - 42) / 18));

  // 左欄講完之後整欄退到背景，同時右欄開始跑
  const leftFade = interpolate(frame, [172, 192], [1, 0.35], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 右欄結論的那一下，整支片唯一允許有彈跳的地方
  const hit = spring({
    frame: Math.max(0, frame - 220),
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });

  // 整個畫布很慢地推近。影片少了這個會看起來是靜止的
  const camera = interpolate(frame, [0, 300], [1, 1.045]);

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        color: theme.textMain,
        fontFamily: theme.fontSans,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: 1920,
          height: 1080,
          position: 'relative',
          transform: `scale(${camera})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: reqTop,
            left: 0,
            width: 1920,
            textAlign: 'center',
            fontSize: reqSize,
            fontWeight: 700,
            color: lift > 0.5 ? theme.textSub : theme.textMain,
            ...wipe(frame, 0, 16),
          }}
        >
          幫我做一個任務計時器
        </div>

        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          {[LEFT_CX, RIGHT_CX].map((cx, i) => (
            <path
              key={cx}
              d={`M960,198 V248 H${cx} V${FORK_Y - 24}`}
              fill="none"
              stroke={i === 0 ? theme.border : theme.accent}
              strokeWidth={2}
              /* 兩條路徑長度不同，正規化成 1 它們才會同時畫完 */
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - branch}
            />
          ))}
        </svg>

        <Path
          frame={frame}
          cx={LEFT_CX}
          label="只能問的對話框"
          tint={theme.dim}
          steps={LEFT_STEPS}
          stepStart={76}
          gap={LEFT_GAP}
          verdict="動手的人是你"
          verdictStart={150}
          fade={leftFade}
        />

        <Path
          frame={frame}
          cx={RIGHT_CX}
          label="能動手的 Agent"
          tint={theme.accent}
          steps={RIGHT_STEPS}
          stepStart={180}
          gap={RIGHT_GAP}
          verdict="動手的人是它"
          verdictStart={220}
          fade={1}
          punch={hit}
        />
      </div>
    </div>
  );
};

const Path: React.FC<{
  frame: number;
  cx: number;
  label: string;
  tint: string;
  steps: string[];
  stepStart: number;
  gap: number;
  verdict: string;
  verdictStart: number;
  fade: number;
  punch?: number;
}> = ({ frame, cx, label, tint, steps, stepStart, gap, verdict, verdictStart, fade, punch }) => {
  const rule = easeOut(clamp01((frame - (verdictStart - 12)) / 16));
  // punch 只給右欄。左欄那一下不要有彈跳，它是停在原地的那一邊
  const scale = punch === undefined ? 1 : interpolate(punch, [0, 1], [0.93, 1]);

  return (
    <div
      style={{
        position: 'absolute',
        left: cx - COL_W / 2,
        top: FORK_Y,
        width: COL_W,
        textAlign: 'center',
        opacity: fade,
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 700, color: tint, ...wipe(frame, 56, 16) }}>
        {label}
      </div>

      {steps.map((s, i) => {
        const start = stepStart + i * gap;
        const p = easeOut(clamp01((frame - start) / 14));
        return (
          <div
            key={s}
            style={{
              position: 'absolute',
              top: 118 + i * 84,
              left: 0,
              width: COL_W,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: 20,
              transform: `translateY(${(1 - p) * 10}px)`,
              ...wipe(frame, start, 14),
            }}
          >
            <span style={{ fontFamily: theme.fontMono, fontSize: 26, color: theme.border }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span style={{ fontSize: 40, color: theme.textSub, whiteSpace: 'nowrap' }}>{s}</span>
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          top: 386,
          left: (COL_W * (1 - rule)) / 2,
          height: 2,
          width: COL_W * rule,
          backgroundColor: tint,
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 424,
          left: 0,
          width: COL_W,
          fontSize: 58,
          fontWeight: 700,
          color: tint,
          transform: `scale(${scale})`,
          ...wipe(frame, verdictStart, 16),
        }}
      >
        {verdict}
      </div>
    </div>
  );
};
