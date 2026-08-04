import { Boxes, MonitorSmartphone, ArrowRightLeft, Server, Database, Plug } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const LAYERS = [
  {
    icon: MonitorSmartphone,
    title: '前端',
    subtitle: '使用者看得到的工具',
    detail: '報價列表、編輯表單、金額顯示、送審按鈕',
  },
  {
    icon: ArrowRightLeft,
    title: 'API',
    subtitle: '前後端講好的合約',
    detail: 'POST /api/quotes、GET /api/customers、回傳欄位與錯誤格式',
  },
  {
    icon: Server,
    title: '後端',
    subtitle: '商業邏輯與權限',
    detail: '計算稅金與折扣、檢查狀態流轉、擋下缺資料的報價',
  },
  {
    icon: Database,
    title: '資料庫',
    subtitle: '長期記憶',
    detail: 'customers、products、quotes、quote_items 四張表',
  },
  {
    icon: Plug,
    title: '外部服務',
    subtitle: '這一輪先當接口',
    detail: 'PDF 匯出、Email 寄送、金流或 CRM，先列出但不急著串',
  },
];

export default function SlideQuoteSystemArchitecture() {
  return (
    <SlideLayout title="先畫出產品由哪幾層組成" subtitle="Product Architecture" icon={Boxes}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-400 text-sm leading-relaxed">
            你不是只叫 AI「做一個報價系統」，而是要先說清楚這個產品由哪些層組成。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {LAYERS.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <AnimatedBlock key={layer.title} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <Icon aria-hidden="true" size={24} className="text-sky-400 mb-3" />
                <h3 className="text-slate-100 text-base font-bold leading-snug">{layer.title}</h3>
                <div className="text-slate-500 text-xs font-bold leading-snug mt-1 mb-3">{layer.subtitle}</div>
                <p className="text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">{layer.detail}</p>
              </AnimatedBlock>
            );
          })}
        </div>

        <AnimatedBlock stepIndex={7} className="rounded-xl border border-slate-800 border-l-4 border-l-sky-500 bg-slate-900 px-6 py-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            這張圖會直接變成後面的任務切分：先做前端骨架與資料結構，再開 API 合約，最後補後端邏輯。
            外部服務先保留介面，避免第一輪就失控。
          </p>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
