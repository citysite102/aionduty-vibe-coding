import { Image as ImageIcon, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import refTypePoster from '../../assets/design-refs/ref-type-poster.png';
import refEditorialSite from '../../assets/design-refs/ref-editorial-site.png';
import refDeckTemplate from '../../assets/design-refs/ref-deck-template.png';

const DESIGN_REFS = [
  {
    src: refTypePoster,
    alt: '深色底的網站首頁，中央是超大字級的英文標題，只有一塊紅色方塊當作重點',
    label: '字級落差與留白',
    note: '標題要壓多大、周圍要空多少，講不清楚，看圖一眼就知道。',
  },
  {
    src: refEditorialSite,
    alt: '藍底網站的三個區塊，由深色首圖換到整片藍再換到白底內文',
    label: '配色與分區節奏',
    note: '整份用同一個藍撐場，靠底色換頁分段，這是「配色乾淨」的具體樣子。',
  },
  {
    src: refDeckTemplate,
    alt: '八頁一組的商務簡報樣板，白底黑字加黃色色塊，每頁版型不同但風格一致',
    label: '整套版型的一致性',
    note: '要的是一整套，不是單頁。給它八頁的樣板，它才知道下一頁該長什麼樣。',
  },
];

export default function SlideLLMPrompt() {
  return (
    <SlideLayout title="講不清楚的，直接給 AI 看" subtitle="Show, Don't Describe" icon={ImageIcon}>
      <div className="max-w-5xl mx-auto space-y-4 pb-4">

        <AnimatedBlock stepIndex={1} className="text-slate-400 text-sm leading-relaxed">
          <strong className="text-slate-200">Vibe Coding 不是「丟棄邏輯、隨意亂指」</strong>，因為它沒有你腦中的畫面，遇到講不清楚的地方它不會停下來問你，只會挑一個最像的往下做。
          而有一類需求，你再怎麼加形容詞都講不清楚。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            「做得更精緻一點」這種話沒有用，因為你心裡的標準跟它的標準不一樣，講幾次都對不上。
            <strong className="text-slate-100">貼一張參考圖進去，它拿到的不只是外觀，還有做法。</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-mono">只有文字</div>
              <p className="text-slate-300 text-sm font-medium mb-2">「星球做得更擬真一點，加上陰影」</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                它會把漸層調得更細緻，但骨子裡還是同一顆漸層球。方向對，層級不對。
              </p>
            </div>
            <div className="bg-slate-950 border border-sky-500/30 rounded-xl p-4">
              <div className="text-xs font-bold text-sky-400 mb-2 uppercase tracking-wider font-mono">附上參考圖</div>
              <p className="text-slate-300 text-sm font-medium mb-2">同一句話，外加一張點陣星球的圖</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                它看懂那是粒子渲染，直接換一種畫法。<strong className="text-slate-300">這個決定從形容詞裡推不出來。</strong>
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            要它排一份簡報的版型也是同一件事。
            <strong className="text-slate-100">與其寫「做得專業一點」，不如貼三張你覺得好看的頁面進去。</strong>
            這份簡報的版型就是這樣來的。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DESIGN_REFS.map((ref) => (
              <div key={ref.label} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                <img src={ref.src} alt={ref.alt} className="w-full h-40 object-cover object-top" />
                <div className="p-3.5 border-t border-slate-800">
                  <div className="text-xs font-bold text-sky-400 mb-1.5">{ref.label}</div>
                  <p className="text-slate-500 text-xs leading-relaxed">{ref.note}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={4} className="bg-amber-500/5 border border-amber-500/25 rounded-2xl p-5 flex gap-3 items-start">
          <TriangleAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-base font-bold text-amber-300 mb-1.5">但參考圖要挑「它做得出來的」</div>
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              上面那三張之所以有用，是因為版面、字級、色塊都能用程式畫出來。Claude 現在也有設計相關的 Skills，
              接手這類版面的品質比以前好很多。<strong className="text-slate-200">但它是在寫程式畫版面，不是在生圖。</strong>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              你貼一張攝影作品或 3D 算圖過去，它只能用 CSS 去逼近，結果會不上不下，然後你會以為是自己不會用。
              真的需要圖片素材，要另外用生圖工具做好再放進來。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-400 text-base leading-relaxed">
            圖負責「長什麼樣」，文字負責「不准做什麼」和「怎麼運作」。
            <strong className="text-slate-200">前者省掉十句形容詞，後者是圖片永遠表達不了的。兩個要一起給。</strong>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
