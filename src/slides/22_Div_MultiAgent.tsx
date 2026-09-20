import { SectionDivider } from '../components/SectionDivider';

export default function SlideDivMultiAgent() {
  return (
    <SectionDivider
      number="MODULE 3"
      subtitle="Agent Teams & Quality Control"
      title="Agent 分工與品質控管"
      roadmap={[
        { label: '分工', weight: 2, note: '讓不同角色負責不同判斷' },
        { label: '品質防線', weight: 3, note: '建一個會退回的審查角色' },
        { label: '中型專案', weight: 8, note: '拆需求、API、資料與規範，最後收成' },
      ]}
    />
  );
}
