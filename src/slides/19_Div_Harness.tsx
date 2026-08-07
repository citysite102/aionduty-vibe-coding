import { SectionDivider } from '../components/SectionDivider';

export default function SlideDivHarness() {
  return (
    <SectionDivider
      number="MODULE 2"
      subtitle="Harness & Economics"
      title="Agent 運作框架與成本分析"
      roadmap={[
        { label: '框架與成本', weight: 3, note: '零件、上下文、token 帳' },
        { label: '給它工具與邊界', weight: 3, note: 'MCP、Skills、權限' },
        { label: '寫出第一份手冊', weight: 7, note: '寫、確認讀到、避開廢話' },
      ]}
    />
  );
}
