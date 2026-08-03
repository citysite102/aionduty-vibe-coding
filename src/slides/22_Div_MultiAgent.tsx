import { SectionDivider } from '../components/SectionDivider';

/**
 * 原本標題是「Agent 團隊與開發循環架構」，跟後面 26_Div_Loop 那一節重疊，
 * 而且這一節實際只涵蓋分工與品質四頁，循環是下一節的事，所以改掉。
 *
 * 這一節只有四頁，不掛路線圖：三塊的路線圖對四頁是多餘的資訊。
 */
export default function SlideDivMultiAgent() {
  return (
    <SectionDivider
      number="MODULE 3"
      subtitle="Teams & Quality"
      title="讓 Agent 分工，並守住品質"
    />
  );
}
