import { SectionDivider } from '../components/SectionDivider';

/**
 * 終端機自成一段。
 *
 * 桌面版提前之後，終端機就不在主線上了：前面每一頁都走得完，作品也做出來了。
 * 它原本散在前置觀念中間（兩頁選修）跟安裝那一頁，卡在主線裡讓所有人都要付注意力，
 * 而課後回饋有三個人是公司電腦不能裝，那幾頁對他們是純空轉。
 *
 * 2026-10-27 從章節三後面搬到整疊的最後，變成補充單元（第九章）。
 * 搬的理由是它本來就不在主線上：擺在中間，每個人都要先決定自己要不要跳過；
 * 擺在最後，需要的人回頭來看，不需要的人整堂課走完都不會碰到它。
 */
export default function SlideDivTerminalTrack() {
  return (
    <SectionDivider
      number="EXTRA"
      subtitle="補充單元 ／ 跳過不影響前面任何一章"
      title="終端機與 Claude Code 操作基礎"
      roadmap={[
        { label: '終端機是什麼', weight: 3, note: '幾個指令，跟著打一次' },
        { label: '換一個好用的', weight: 2, note: 'Warp，內建的也行' },
        { label: '裝 Claude Code', weight: 3, note: '一行指令，然後登入' },
        { label: '終端機才有的按鍵', weight: 2, note: 'Shift + Tab、!、Esc' },
      ]}
    />
  );
}
