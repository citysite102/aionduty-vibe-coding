import { SectionDivider } from '../components/SectionDivider';

/**
 * 終端機自成一段。
 *
 * 桌面版提前之後，終端機就不在主線上了：前面每一頁都走得完，作品也做出來了。
 * 它原本散在前置觀念中間（兩頁選修）跟安裝那一頁，卡在主線裡讓所有人都要付注意力，
 * 而課後回饋有三個人是公司電腦不能裝，那幾頁對他們是純空轉。
 *
 * 放在第一單元收成之後，所以要跳過整段不會少掉任何前面用得到的東西。
 */
export default function SlideDivTerminalTrack() {
  return (
    <SectionDivider
      number="EXTRA"
      subtitle="The Terminal Track"
      title="選修：把 Claude Code 裝進終端機"
      roadmap={[
        { label: '終端機是什麼', weight: 3, note: '幾個指令，跟著打一次' },
        { label: '換一個好用的', weight: 2, note: 'Warp，內建的也行' },
        { label: '裝 Claude Code', weight: 3, note: '一行指令，然後登入' },
        { label: '終端機才有的操作', weight: 2, note: 'Shift + Tab、!、Esc' },
      ]}
    />
  );
}
