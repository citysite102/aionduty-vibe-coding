import { SectionDivider } from '../components/SectionDivider';

/**
 * 2026-09-22 路線圖重對一次實際章節，weight 照各段實際頁數給：7／7／10／10。
 * 對法是跑 `npm run units -- 5`。
 *
 * 曾經有第五塊「付費與省錢」（Slide 81 到 83）。那三頁 2026-09-22 整組移除了，
 * 所以這裡也拿掉。同一天章名從「Agent 運作框架與成本分析」改成現在這個：
 * 那三頁走了之後，成本只剩 Slide 51 與 52 兩頁，撐不起章名裡的一半。
 * 新的章名只留兩個關鍵字（運作框架、CLAUDE.md），兩個學員都打得進搜尋框（D-5）。
 * 一度試過「Agent 運作框架：工具、權限與 CLAUDE.md」，但它在分節頁上會折成兩行，
 * 而且斷在「工／具」中間。工具與權限本來就是這一章自己定義的「零件」的一部分，
 * 交給單元名去承接（5-2 MCP 與 Skills、5-3 監督程度與權限模式）就夠了。改章名要同時改分節頁 title、SECTION_DEFS 的 label、
 * LIVE_TITLES、UNIT_DEFS 裡 5-1 的 anchor、逐字稿的檔頭與銷售頁。
 * 對法是跑 `npm run units -- 5`，不要憑印象。
 *
 * 第四塊原本叫「零件放哪、怎麼用」。「零件」是這一章自己長出來的詞，
 * 到 Slide 50 才定義，而這是分節頁，學員在這裡還沒讀到。改用它在
 * `UNIT_DEFS` 裡就有的說法（載入時機與存放位置），那也是學員搜得到的字。
 * Slide 50 之後的頁面（75、76、77）維持用「零件」，那時候這個詞已經立起來了。
 */
export default function SlideDivHarness() {
  return (
    <SectionDivider
      number="MODULE 2"
      subtitle="Harness & CLAUDE.md"
      title="Agent 運作框架與 CLAUDE.md"
      roadmap={[
        { label: '框架與成本', weight: 7, note: '零件、上下文、token 帳' },
        { label: '工具與邊界', weight: 7, note: 'MCP、Skills、權限模式' },
        { label: '寫出第一份手冊', weight: 10, note: '寫、確認讀到、規則分幾層' },
        { label: '載入時機與存放位置', weight: 10, note: '常駐或叫到才來、資料夾位置、真實專案' },
      ]}
    />
  );
}
