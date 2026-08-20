import { SectionDivider } from '../components/SectionDivider';

// 這是全片最長的連續區塊，所以在分節頁先給路線圖。
// 最後三分之一是三個完整案例，講者會在那裡打開三份教學文件，所以它自成一塊。
// weight 是相對比例，不要改回絕對頁碼：拆頁會讓頁碼一直漂，
// 而右下角本來就有「Slide N / 總數」，兩邊對不上比沒有更糟。
export default function SlideDivLoop() {
  return (
    <SectionDivider
      number="MODULE 4"
      subtitle="Loop Engineering · 進階概念"
      title="Agent 循環開發流程"
      roadmap={[
        { label: '交代一輪', weight: 2, note: '目標、完成條件、邊界' },
        { label: '出事怎麼辦', weight: 4, note: '踩煞車、守品質、讀錯誤' },
        { label: '跑一輪', weight: 3, note: '合成一段指令，看它自己驗' },
        { label: '送上線', weight: 5, note: '加日誌、推上去、部署' },
        { label: '三個完整案例', weight: 10, note: '規格、技術選型、信任邊界' },
        { label: '回去之後', weight: 2, note: '挑題目、第一天怎麼開工' },
      ]}
    />
  );
}
