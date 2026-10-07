import {DataTransfer} from './trailer-v17-timed/DataTransfer';
import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,Audio,staticFile} from 'remotion';
import {Opening,Problem} from './trailer-v17-timed/NarrativeScenes';
import {ChatVsAgentCollage} from './trailer-v17-timed/ChatVsAgentCollage';
import {SamuelIntro} from './trailer-v17-timed/SamuelIntro';
import {Build} from './trailer-v17-timed/Build';
import {Control} from './trailer-v17-timed/Control';
import {AgentLoop} from './trailer-v17-timed/LoopEngineering';
import {Ship} from './trailer-v17-timed/Ship';
import {Finale} from './trailer-v17-timed/Finale';
import {C,sans,p,easeInOut,Title,Paper,mono} from './trailer-v17-timed/design';
import {scenes} from './trailer-v17-timed/timeline';
const components=[Opening,Problem,ChatVsAgentCollage,SamuelIntro,Build,Control,AgentLoop,Ship,Finale];
const rip=(q:number)=>{const x=q*2200-140;return `polygon(0 0,${x}px 0,${x+48}px 95px,${x-17}px 205px,${x+53}px 312px,${x-34}px 420px,${x+42}px 535px,${x-20}px 656px,${x+61}px 775px,${x-8}px 891px,${x+44}px 1080px,0 1080px)`};
export const TrailerV17Timed:React.FC=()=>{
 const f=useCurrentFrame();
 const start=(name:string)=>scenes.find(s=>s.name===name)!.from;
 const chat=start('ChatVsAgent'),intro=start('SamuelIntro'),harness=start('Harness'),ship=start('Ship');
 const move=(from:number,d:number,a:number,b:number)=>a+(b-a)*easeInOut(p(f,from,d));
 return <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:sans,overflow:'hidden'}}>
 {scenes.map((s,i)=>{const Component=components[i];return <Sequence key={s.name} name={s.name} from={s.from} durationInFrames={s.duration+(i<8&&i!==2?24:0)}><AbsoluteFill style={{transform:'translateY(-16px) scale(.94)',transformOrigin:'50% 45%',clipPath:i===0||i===8?'none':rip(easeInOut(p(f,s.from,24)))}}><Component/></AbsoluteFill></Sequence>})}

 {f>=intro-24&&f<intro+24&&<div style={{position:'absolute',inset:0,zIndex:10,background:C.cyan,transform:`translateX(${f<intro?move(intro-24,24,1920,0):move(intro,24,0,-1920)}px)`}}><Title x={170} y={390} size={280} color={C.ink}>AGENT</Title></div>}

 {f>=ship-22&&f<ship+106&&<DataTransfer f={f-(ship-22)}/>}
 <Audio src={staticFile('assets/soundtrack-v17.wav')}/>
 </AbsoluteFill>;
};
