import React from 'react';
import {OffthreadVideo,Sequence,Loop,staticFile} from 'remotion';
// Each local Sequence starts the clip at the intended scene beat, rather than the composition's absolute time.
export const Footage:React.FC<{clip:string;from?:number;trimBefore?:number;style?:React.CSSProperties}>=({clip,from=0,trimBefore=0,style})=><Sequence from={from} layout="none"><Loop layout="none" durationInFrames={({tokyo:270,vessel:354,booking:390,pixel:255}[clip]??270)-trimBefore}><OffthreadVideo src={staticFile(`assets/clips/${clip==='vessel'?'vessel-v08':clip}.mp4`)} muted trimBefore={trimBefore} style={{width:'100%',height:'100%',objectFit:'contain',background:'#020712',...style}}/></Loop></Sequence>;
