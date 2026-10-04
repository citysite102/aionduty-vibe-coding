import { SectionDivider } from '../components/SectionDivider';

// 這是全片最長的連續區塊，所以在分節頁先給路線圖。
// 最後三分之一是三個完整案例，講者會在那裡打開三份教學文件，所以它自成一塊。
// weight 是相對比例，不要改回絕對頁碼：拆頁會讓頁碼一直漂，
// 而右下角本來就有「Slide N / 總數」，兩邊對不上比沒有更糟。
export default function SlideDivLoop() {
  return (
    <SectionDivider
      number="MODULE 4"
      subtitle="Loop Engineering & Case Studies"
      title="Agent 循環開發流程與實戰案例"
      // weight 2026-10-05 對過一次，就是各塊實際的頁數（分節頁自己不算）：
      // 144-145 / 146 / 147-150 / 151-154 / 155-160 / 161-170 / 171-173，合計 30。
      // 不要寫絕對頁碼進 note，但 weight 本來就是比例，拿實際頁數當比例最準。
      // 搬頁之後回來重算一次，拿 `npm run units` 的範圍對。
      roadmap={[
        { label: 'Loop 換掉什麼', weight: 2, note: '從 Prompt 一路走到這裡' },
        { label: '交代一輪', weight: 1, note: '目標、完成條件、邊界' },
        { label: '出事怎麼辦', weight: 4, note: '踩煞車、守品質、讀錯誤、設邊界' },
        { label: '跑一輪', weight: 4, note: '合成一段指令，看它自己驗' },
        { label: '送上線', weight: 6, note: '加日誌、推上去、部署' },
        { label: '三個完整案例', weight: 10, note: '規格、技術選型、信任邊界' },
        { label: '回去之後', weight: 3, note: '挑題目、第一天怎麼開工' },
      ]}
    />
  );
}
