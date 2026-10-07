import {TrailerVoice150} from './TrailerVoice150';
import {TrailerVoiceNine} from './TrailerVoiceNine';
/**
 * 預告片的動畫片段清單。一個 Composition 就是一支要輸出的 mp4。
 *
 * durationInFrames 一律比腳本上那一格需要的長度多個一兩秒，剪接要修尾巴比要補畫面容易。
 * 前四支是 2026 年初就寫好、但一直沒有渲染路徑的保留元件，這一輪接上渲染之後
 * 配色已經換成跟投影片同一套（見 theme.ts 檔頭）。
 */
import React from 'react';
import { Composition } from 'remotion';
import './fonts';
import {TrailerV16} from './TrailerV16';
import {TrailerV17} from './TrailerV17';
import {TrailerV17Timed} from './TrailerV17Timed';
import {TrailerV16Timed} from './TrailerV16Timed';
import { ChatVsAgent } from './ChatVsAgent';
import { OrchestratorSplit } from './OrchestratorSplit';
import { WorkflowLoop } from './WorkflowLoop';
import { OvernightLoop } from './OvernightLoop';
import { TwoDials } from './TwoDials';

const CANVAS = { width: 1920, height: 1080, fps: 30 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TrailerVoiceNine" component={TrailerVoiceNine} durationInFrames={4888} {...CANVAS} />
    <Composition id="TrailerVoice150" component={TrailerVoice150} durationInFrames={4486} {...CANVAS} />
    {/* Full course trailer: v0.3 is 100 seconds; previous versions remain available. */}
    <Composition id="TrailerFullScript" component={TrailerV17} durationInFrames={5910} {...CANVAS} />
    <Composition id="Trailer123" component={TrailerV17Timed} durationInFrames={3690} {...CANVAS} />
    <Composition id="TrailerFullScript-v16" component={TrailerV16} durationInFrames={5910} {...CANVAS} />
    <Composition id="Trailer123-v16" component={TrailerV16Timed} durationInFrames={3690} {...CANVAS} />
    {/* 預告片第 2 格：同一句需求，對話框與 Agent 兩條路 */}
    <Composition id="ChatVsAgent" component={ChatVsAgent} durationInFrames={300} {...CANVAS} />

    {/* 預告片第 5 格：指揮者、執行者、審查者的分工 */}
    <Composition id="OrchestratorSplit" component={OrchestratorSplit} durationInFrames={420} {...CANVAS} />

    {/* 預告片第 6 格備案：一輪工作的四個階段 */}
    <Composition id="WorkflowLoop" component={WorkflowLoop} durationInFrames={360} {...CANVAS} />

    {/* 預錄或銷售頁用：手動下指令對上 Loop 自己跑 */}
    <Composition id="OvernightLoop" component={OvernightLoop} durationInFrames={480} {...CANVAS} />

    {/* 備用：監督程度與邊界大小兩個旋鈕 */}
    <Composition id="TwoDials" component={TwoDials} durationInFrames={450} {...CANVAS} />
  </>
);
