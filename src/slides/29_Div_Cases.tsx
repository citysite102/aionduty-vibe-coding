import { SectionDivider } from '../components/SectionDivider';

/**
 * 2026-10-27 新增。四個完整案例原本跟 Loop Engineering 共用「Agent 循環開發流程與實戰案例」
 * 那一節，但兩段學員做的事不一樣：前面在學怎麼交辦一輪、怎麼送上線，後面是看四個已經做完的
 * 作品怎麼決策。課程平台把它們拆成兩章，分節頁跟著補一張，否則 SECTION_DEFS 的 start
 * 沒有分節頁可以指（check:slides 第 3、4 項）。
 *
 * weight 就是各塊實際的頁數（分節頁自己不算）。搬頁或拆頁之後回來重算，
 * 算法跟 26_Div_Loop 一樣：跑 `npm run units -- 8` 把每一塊涵蓋的頁數抄過來。
 */
export default function SlideDivCases() {
  return (
    <SectionDivider
      number="MODULE 5"
      subtitle="從需求規格到產品上線"
      title="整合專案實戰"
      roadmap={[
        { label: '器 VESSEL', weight: 4, note: '規格怎麼寫，然後做出來' },
        { label: '東京環状', weight: 4, note: '捲動動畫與套件取捨' },
        { label: '開窯預約', weight: 4, note: '登入、權限、搶名額' },
        { label: '海上神社', weight: 5, note: '3D、會員與對外 API' },
        { label: '換你做一個', weight: 11, note: '題目、驗收與資安' },
      ]}
    />
  );
}
