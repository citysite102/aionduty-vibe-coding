import { SectionDivider } from '../components/SectionDivider';

export default function SlideDivTerminal() {
  return (
    <SectionDivider
      number="MODULE 1"
      subtitle="Claude Code, Hands On"
      title="讓 AI 動手：Claude Code 入門"
      roadmap={[
        { label: '為什麼要能動手', weight: 2, note: '顧問與執行者的差別' },
        { label: '前置觀念', weight: 6, note: '終端機、API、資料庫、前後端、上線、版控' },
        { label: '裝起來', weight: 3, note: '桌面版先做，再裝終端機' },
        { label: '做出作品', weight: 4, note: '任務計時器，然後換你寫' },
      ]}
    />
  );
}
