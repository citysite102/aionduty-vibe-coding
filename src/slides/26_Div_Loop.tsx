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
        { label: '它是什麼', weight: 4, note: '循環、零件、現成 Skills' },
        { label: '怎麼設定目標', weight: 3, note: '讓它自己跑完一輪' },
        { label: '出事怎麼辦、放手前設邊界', weight: 7, note: '踩煞車、守品質、讀錯誤' },
        { label: '回頭收作品', weight: 3, note: '加日誌、送上線' },
      ]}
    />
  );
}
