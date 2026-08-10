import { Image as ImageIcon, TriangleAlert } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';
import refTypePoster from '../../assets/design-refs/ref-type-poster.png';
import refEditorialSite from '../../assets/design-refs/ref-editorial-site.png';
import refDeckTemplate from '../../assets/design-refs/ref-deck-template.png';
import refParticlePlanet from '../../assets/design-refs/ref-particle-planet.png';

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
          <strong className="text-slate-200">Vibe Coding 不等於隨意亂指。</strong>
          AI 沒有你腦中的畫面，遇到講不清楚的地方不會停下來問你，只會挑一個最像的往下做。
          而有一類需求，你再怎麼加形容詞都講不清楚。
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            「做得更精緻一點」這種話沒有用，因為你心裡的標準跟它的標準不一樣，講幾次都對不上。
            <strong className="text-slate-100">貼一張參考圖進去，它拿到的不只是外觀，還有做法。</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
              <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider font-mono">只有文字</div>
              <p className="text-slate-300 text-sm font-medium mb-2">「星球做得更擬真一點，加上陰影」</p>
              <p className="text-slate-500 text-xs leading-relaxed">
                它會把漸層調得更細緻，但骨子裡還是同一顆漸層球。方向對，層級不對。
              </p>
            </div>
            <div className="bg-slate-950 border border-sky-500/30 rounded-xl overflow-hidden">
              <img
                src={refParticlePlanet}
                alt="黑底上由密集白色小點構成的星系，中央最亮、往外逐漸稀疏"
                className="w-full h-32 object-cover"
              />
              <div className="p-4 border-t border-sky-500/20">
                <div className="text-xs font-bold text-sky-400 mb-2 uppercase tracking-wider font-mono">附上參考圖</div>
                <p className="text-slate-300 text-sm font-medium mb-2">同一句話，外加上面這張點陣星球的圖</p>
                <p className="text-slate-500 text-xs leading-relaxed">
                  它算出來的最近答案不再是一顆球加陰影，而是幾千個點各自算亮度，畫法直接換掉。
                  <strong className="text-slate-300">這個決定從形容詞裡推不出來。</strong>
                </p>
              </div>
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
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              你貼一張攝影作品或 3D 算圖過去，它只能用 CSS 去逼近，結果會不上不下，然後你會以為是自己不會用。
              真的需要圖片素材，要另外用生圖工具做好再放進來。
            </p>

            {/*
              學員的實際卡點不是不同意這個原則，是拿到一張新圖的時候套不上去。
              所以要給一個能自己判斷的問法，加上兩欄具體的東西。
              點陣星球特別點出來：它看起來最複雜，卻是這一頁唯一「算出來」的例子，
              不講的話學員會把「複雜」直接當成「做不到」。
            */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <p className="text-slate-200 text-sm leading-relaxed mb-3">
                怎麼判斷手上這張？<strong className="text-slate-100">拆開來看，是形狀、色塊、文字、線條堆出來的，程式就畫得出來；是拍出來的、手畫的、算圖算出來的，就要另外準備。</strong>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1.5">貼了有用</div>
                  <ul className="text-slate-400 text-sm space-y-1 list-disc pl-4 marker:text-slate-700">
                    <li>版面配置、留白、字級落差</li>
                    <li>配色、圓角、陰影、漸層</li>
                    <li>按鈕、卡片、圖表</li>
                    <li>幾何與點陣效果</li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1.5">要另外準備素材</div>
                  <ul className="text-slate-400 text-sm space-y-1 list-disc pl-4 marker:text-slate-700">
                    <li>照片、人物、實景</li>
                    <li>木紋、皮革這類質感</li>
                    <li>手繪插畫、3D 算圖</li>
                    <li>筆畫複雜的 Logo</li>
                  </ul>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mt-3 border-t border-slate-800 pt-3">
                上面那顆星球看起來最複雜，但它是幾千個點各自算亮度，屬於左邊那一欄。
                <strong className="text-slate-300">而一張圖裡常常兩種都有</strong>：一個漂亮的網站首頁，版面能抄，中間那張照片不能。版面照抄，照片自己準備。
              </p>
            </div>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={5} className="border rounded-2xl px-5 py-4 bg-sky-500/5 border-sky-500/25 shadow-[0_0_32px_-12px_rgba(56,189,248,0.45)]">
          <p className="text-slate-400 text-base leading-relaxed">
            圖負責「長什麼樣」，文字負責「不准做什麼」和「怎麼運作」。
            <strong className="text-slate-200">兩個要一起給。</strong>
          </p>
        </AnimatedBlock>

      </div>
    </SlideLayout>
  );
}
