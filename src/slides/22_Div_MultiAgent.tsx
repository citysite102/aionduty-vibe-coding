import { SectionDivider } from '../components/SectionDivider';

export default function SlideDivMultiAgent() {
  return (
    <SectionDivider
      number="MODULE 3"
      subtitle="Teams & Quality"
      title="讓 Agent 分工，並守住品質"
      roadmap={[
        { label: '分工', weight: 2, note: '讓不同角色負責不同判斷' },
        { label: '品質防線', weight: 2, note: '讓小幫手先找缺口' },
        { label: '中型專案', weight: 5, note: '把需求、API、資料與規範拆開' },
        { label: '接到循環', weight: 1, note: '留給下一段自動化' },
      ]}
    />
  );
}
