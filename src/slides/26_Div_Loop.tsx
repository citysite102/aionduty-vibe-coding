import { SectionDivider } from '../components/SectionDivider';

// 這一段有 16 頁，是全片最長的連續區塊，所以在分節頁先給路線圖。
// 注意 range 是寫死的頁碼：之後若在這一段插頁或搬頁，記得回來一起改。
export default function SlideDivLoop() {
  return (
    <SectionDivider
      number="MODULE 4"
      subtitle="Loop Engineering · 進階概念"
      title="Agent 循環開發流程"
      roadmap={[
        { label: '它是什麼', range: 'p70 - 73' },
        { label: '怎麼設定', range: 'p74 - 76' },
        { label: '會出什麼事', range: 'p77 - 82' },
        { label: '實際做一次', range: 'p83 - 84' },
      ]}
    />
  );
}
