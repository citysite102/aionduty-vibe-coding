import { SectionDivider } from '../components/SectionDivider';

export default function SlideDivHarness() {
  return (
    <SectionDivider
      number="MODULE 2"
      subtitle="Harness & Economics"
      title="Agent 運作框架與成本分析"
      roadmap={[
        { label: '框架與成本', weight: 3, note: '零件、上下文、token 帳' },
        { label: '寫出第一份手冊', weight: 5, note: '寫、確認讀到、避開廢話' },
        { label: '四個常見問題', weight: 8, note: '沒生效、放哪層、太肥、怎麼寫' },
        { label: '換成你的工作', weight: 3, note: '不是程式也用得上' },
      ]}
    />
  );
}
