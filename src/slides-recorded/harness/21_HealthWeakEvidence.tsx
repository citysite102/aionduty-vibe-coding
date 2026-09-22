import { AlertTriangle } from 'lucide-react';
import { SlideLayout, AnimatedBlock } from '../../components/SlideLayout';
import { Key } from './_Key';
import { SeriesRail, HEALTH_RAIL } from './_SeriesRail';
import { RecPage } from '../_RecPage';
import type { RecordedMeta } from '../types';

/**
 * 2026-09-23：跟著上一頁（20_HealthEvidence）一起改白話。
 * 原本開頭是「如果三種證據只湊得出一種」，那個講法隨著三種證據一起拿掉了。
 * 兩個做法也各補上真的要打什麼字，原本只寫「搬到子目錄」「註記日期」，
 * 學員看完還是不知道手要動什麼。
 */

export const meta: RecordedMeta = {
  id: 'harness-21-health-weak-evidence',
  title: '手冊健檢：說不準的先降級或標日期',
  script:
    '說不準的那幾條，不用逼自己現在就決定留還是刪，有兩個中間的做法。第一個是降級：把那一條從根目錄的 CLAUDE.md 剪下來，貼到只管那一區的 rules 資料夾裡。它還在，只是碰到那一區才載入，不再佔掉每一輪的空間。第二個是標記觀察：在那一行後面加一個日期，註明是哪個月標的，下一輪健檢再回來看它到底有沒有被用到。這兩個做法都是在買時間。刪錯一條規則之後要花的時間，通常比多留一條久。',
  seconds: 45,
  from: 69,
};

export default function RecHealthWeakEvidence() {
  return (
    <SlideLayout title={meta.title} subtitle="The Five-Step Health Check" icon={AlertTriangle}>
      <RecPage>
        <SeriesRail {...HEALTH_RAIL} current={1} />

        <AnimatedBlock stepIndex={1} className="mb-6">
          <p className="text-slate-300 text-4xl font-bold leading-snug">說不準的那幾條，<Key>不用現在就決定</Key></p>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={2} className="grid grid-cols-2 gap-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <div className="text-slate-200 font-bold text-xl mb-3">降級</div>
            <p className="text-slate-400 text-lg leading-relaxed">
              從根目錄的 <code className="font-mono text-orange-300">CLAUDE.md</code> 剪下來，
              貼到只管那一區的 <code className="font-mono text-orange-300">.claude/rules/</code>{' '}
              裡。它還在，只是碰到那一區才載入。
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7">
            <div className="text-slate-200 font-bold text-xl mb-3">標記觀察</div>
            <p className="text-slate-400 text-lg leading-relaxed">
              在那一行後面加一個日期，註明是哪個月標的。下一輪健檢再看它有沒有被用到。
            </p>
          </div>
        </AnimatedBlock>

        <AnimatedBlock stepIndex={3} className="mt-5 text-slate-400 text-xl leading-relaxed px-1">
          刪錯一條規則之後要花的時間，通常比多留一條久。
        </AnimatedBlock>
      </RecPage>
    </SlideLayout>
  );
}
