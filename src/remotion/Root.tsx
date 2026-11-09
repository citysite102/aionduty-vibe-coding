/**
 * 課程用的動畫片段清單。一個 Composition 就是一支要輸出的 mp4。
 *
 * durationInFrames 一律比腳本上那一格需要的長度多個一兩秒，剪接要修尾巴比要補畫面容易。
 *
 * 2026-11-09 課程預告片（TrailerV16／V17 那六支與 trailer-* 目錄）連同 455 MB 的
 * 影音與字型素材一起刪掉了，剩下的五支是 2026 年初寫的課程概念動畫，純程式、不吃素材。
 */
import React from 'react';
import { Composition } from 'remotion';
import { ChatVsAgent } from './ChatVsAgent';
import { OrchestratorSplit } from './OrchestratorSplit';
import { WorkflowLoop } from './WorkflowLoop';
import { OvernightLoop } from './OvernightLoop';
import { TwoDials } from './TwoDials';

const CANVAS = { width: 1920, height: 1080, fps: 30 } as const;

export const RemotionRoot: React.FC = () => (
  <>
    {/* 同一句需求，對話框與 Agent 兩條路 */}
    <Composition id="ChatVsAgent" component={ChatVsAgent} durationInFrames={300} {...CANVAS} />

    {/* 指揮者、執行者、審查者的分工 */}
    <Composition id="OrchestratorSplit" component={OrchestratorSplit} durationInFrames={420} {...CANVAS} />

    {/* 一輪工作的四個階段 */}
    <Composition id="WorkflowLoop" component={WorkflowLoop} durationInFrames={360} {...CANVAS} />

    {/* 手動下指令對上 Loop 自己跑 */}
    <Composition id="OvernightLoop" component={OvernightLoop} durationInFrames={480} {...CANVAS} />

    {/* 監督程度與邊界大小兩個旋鈕 */}
    <Composition id="TwoDials" component={TwoDials} durationInFrames={450} {...CANVAS} />
  </>
);
