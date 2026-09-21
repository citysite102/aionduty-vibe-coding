import { SectionDivider } from '../components/SectionDivider';

/**
 * 2026-09-22 路線圖重對一次實際章節，weight 照各段實際頁數給：7／7／10／10。
 * 對法是跑 `npm run units -- 5`。
 *
 * 曾經有第五塊「付費與省錢」（Slide 81 到 83）。那三頁 2026-09-22 整組移除了，
 * 所以這裡也拿掉。章名裡的「成本分析」現在對到的是 Slide 51「Harness 對成本的影響」
 * 與 Slide 52，不是那三頁。
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
      subtitle="Harness & Economics"
      title="Agent 運作框架與成本分析"
      roadmap={[
        { label: '框架與成本', weight: 7, note: '零件、上下文、token 帳' },
        { label: '工具與邊界', weight: 7, note: 'MCP、Skills、權限模式' },
        { label: '寫出第一份手冊', weight: 10, note: '寫、確認讀到、規則分幾層' },
        { label: '載入時機與存放位置', weight: 10, note: '常駐或叫到才來、資料夾位置、真實專案' },
      ]}
    />
  );
}
