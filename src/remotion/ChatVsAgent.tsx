/**
 * 預告片第 2 格（主張）的動畫：同一句需求走兩條路。
 * 口白是「問題不在你不會寫程式，在於你把一個能動手的工具，當成只能聊天的對象在用。」
 * 所以兩欄的結尾刻意收在同一個位置上（動手的人是你／動手的人是它），那一句是這一格的重點。
 *
 * 長度 300 frame（10 秒），比腳本上那一格的 8 秒長，多出來的留給剪接修尾巴。
 * 投影片有一頁在講同一件事（Slide 17 為什麼要一個能動手的 AI），兩邊的說法要一致，
 * 改這裡之前先看那一頁。
 */
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MessageSquare, Wrench, Check } from 'lucide-react';
import { theme, fadeInMove } from './theme';

const LEFT_STEPS = ['它回你一段程式碼', '你複製、貼上', '你把紅字貼回去問'];
const RIGHT_STEPS = ['它自己把檔案建起來', '它自己跑一次', '它自己看紅字修到好'];

const Column: React.FC<{
  frame: number;
  head: string;
  icon: React.ReactNode;
  tint: string;
  steps: string[];
  stepStart: number;
  verdict: string;
  verdictFrame: number;
  verdictIcon?: React.ReactNode;
}> = ({ frame, head, icon, tint, steps, stepStart, verdict, verdictFrame, verdictIcon }) => (
  <div
    style={{
      flex: 1,
      backgroundColor: theme.card,
      border: `1px solid ${theme.border}`,
      borderRadius: 20,
      padding: '44px 48px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      ...fadeInMove(frame, 30, 20),
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: tint }}>
      {icon}
      <span style={{ fontSize: 40, fontWeight: 700 }}>{head}</span>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {steps.map((s, i) => (
        <div
          key={s}
          style={{
            fontSize: 32,
            color: theme.textSub,
            display: 'flex',
            gap: 18,
            alignItems: 'baseline',
            ...fadeInMove(frame, stepStart + i * 25, 18),
          }}
        >
          <span style={{ fontFamily: theme.fontMono, fontSize: 24, color: theme.dim }}>{i + 1}</span>
          <span>{s}</span>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 16,
        paddingTop: 28,
        borderTop: `1px solid ${theme.border}`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        fontSize: 38,
        fontWeight: 700,
        color: tint,
        ...fadeInMove(frame, verdictFrame, 20),
      }}
    >
      {verdictIcon}
      <span>{verdict}</span>
    </div>
  </div>
);

export const ChatVsAgent: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        color: theme.textMain,
        fontFamily: theme.fontSans,
        padding: '96px 120px',
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', ...fadeInMove(frame, 0, 20) }}>
        <div
          style={{
            backgroundColor: theme.card,
            border: `1px solid ${theme.border}`,
            borderRadius: 999,
            padding: '20px 44px',
            fontSize: 38,
            color: theme.textMain,
          }}
        >
          幫我做一個任務計時器
        </div>
      </div>

      <div style={{ display: 'flex', gap: 56, flex: 1 }}>
        <Column
          frame={frame}
          head="只能問的對話框"
          icon={<MessageSquare size={40} color={theme.dim} />}
          tint={theme.dim}
          steps={LEFT_STEPS}
          stepStart={55}
          verdict="動手的人是你"
          verdictFrame={130}
        />
        <Column
          frame={frame}
          head="能動手的 Agent"
          icon={<Wrench size={40} color={theme.accent} />}
          tint={theme.accent}
          steps={RIGHT_STEPS}
          stepStart={165}
          verdict="動手的人是它"
          verdictFrame={245}
          verdictIcon={<Check size={36} color={theme.accent} />}
        />
      </div>
    </div>
  );
};
