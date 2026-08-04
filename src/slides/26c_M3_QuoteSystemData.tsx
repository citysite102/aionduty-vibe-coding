import { Database, ArrowRight, KeyRound } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../components/SlideLayout';

const TABLES = [
  { name: 'customers', desc: '客戶公司、聯絡人、稅籍資訊', fields: ['id', 'name', 'contact_name', 'tax_id'] },
  { name: 'products', desc: '可報價品項與預設單價', fields: ['id', 'name', 'unit_price_cents', 'taxable'] },
  { name: 'quotes', desc: '報價單主檔、狀態與總額', fields: ['id', 'customer_id', 'valid_until', 'status', 'currency', 'payment_terms', 'discount_cents', 'tax_cents', 'total_cents'] },
  { name: 'quote_items', desc: '每張報價單裡的明細列', fields: ['quote_id', 'product_id', 'quantity', 'unit_price_cents', 'line_total_cents'] },
];

export default function SlideQuoteSystemData() {
  return (
    <SlideLayout title="資料庫先只講四張表" subtitle="Database Basics" icon={Database}>
      <div className="max-w-6xl mx-auto w-full pb-8 space-y-5">
        <AnimatedBlock stepIndex={1} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-slate-100 text-xl font-bold leading-snug mb-2">
            資料模型先求穩，不要一開始就把所有情境塞進去。
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            對初學者來說，先看懂「主檔」與「明細」的關係，比先學完整資料庫設計重要。
          </p>
        </AnimatedBlock>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {TABLES.map((table, index) => (
            <AnimatedBlock key={table.name} stepIndex={index + 2} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="font-mono text-sky-400 text-sm font-bold mb-2">{table.name}</div>
              <p className="text-slate-400 text-sm leading-snug mb-3">{table.desc}</p>
              <div className="space-y-1">
                {table.fields.map((field) => (
                  <div key={field} className="rounded border border-slate-800 bg-slate-900 px-2 py-1 font-mono text-[11px] text-slate-500">
                    {field}
                  </div>
                ))}
              </div>
            </AnimatedBlock>
          ))}
        </div>

        <AnimatedBlock stepIndex={6} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-3 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <KeyRound aria-hidden="true" size={16} className="text-sky-400" />
              一張報價單
            </div>
            <ArrowRight aria-hidden="true" size={16} className="hidden md:block text-slate-700" />
            <div className="text-slate-400 leading-relaxed">
              `quotes` 記錄「這份報價屬於誰、幣別、付款條件、稅金與總額」；`quote_items` 記錄「每一列賣什麼、賣幾個、單列小計」。
            </div>
          </div>
        </AnimatedBlock>
      </div>
    </SlideLayout>
  );
}
