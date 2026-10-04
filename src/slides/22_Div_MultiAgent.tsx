import { SectionDivider } from '../components/SectionDivider';

/**
 * 2026-10-04：weight 與 note 跟著章節七的改版重對過一次。
 * 三塊現在的實際頁數是 4（Slide 127-130）、4（131-134）、8（135-142），所以 weight 寫 4/4/8。
 * **這一章插頁或刪頁之後要回來重對**：weight 是相對比例（B-3），但比例跟實際落差太大，
 * 路線圖就會讓學員以為某一段很短。拿 `npm run units -- 7` 的頁數直接換算就好。
 *
 * note 同一輪跟著改：第一塊多了 workflow 兩頁、第二塊多了產品團隊那一頁（所以是「兩組角色」，
 * 講師學生觀察員一組、產品團隊一組）、第三塊的需求那一段改成從 User Story 起手。
 */

export default function SlideDivMultiAgent() {
  return (
    <SectionDivider
      number="MODULE 3"
      subtitle="Agent Teams & Quality Control"
      title="Agent 分工與品質控管"
      roadmap={[
        { label: '分工', weight: 4, note: '從一個 Agent 變成一組：三個角色、四種模式、workflow' },
        { label: '品質防線', weight: 4, note: '做一個只讀不寫的審查角色，再看兩組角色怎麼分工' },
        { label: '中型專案', weight: 8, note: '從 User Story 拆到 API、資料與規範，最後收成' },
      ]}
    />
  );
}
