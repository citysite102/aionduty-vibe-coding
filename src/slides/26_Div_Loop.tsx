import { SectionDivider } from '../components/SectionDivider';

// 這是全片最長的連續區塊，所以在分節頁先給路線圖。
// weight 是相對比例，不要改回絕對頁碼：拆頁會讓頁碼一直漂，
// 而右下角本來就有「Slide N / 總數」，兩邊對不上比沒有更糟。
export default function SlideDivLoop() {
  return (
    <SectionDivider
      number="MODULE 4"
      subtitle="Loop Engineering · 進階概念"
      title="Agent 循環開發流程"
      roadmap={[
        { label: '它是什麼', weight: 1, note: '把反覆下提示交給系統' },
        { label: '怎麼交代一輪', weight: 1, note: '目標、完成條件、邊界' },
        { label: '出事怎麼辦、放手前設邊界', weight: 4, note: '踩煞車、守品質、讀錯誤' },
        { label: '實際跑一輪', weight: 3, note: '合成一段指令，看它自己驗' },
        { label: '送上線與回去之後', weight: 7, note: '挑題目、加日誌、推上去、部署' },
      ]}
    />
  );
}
