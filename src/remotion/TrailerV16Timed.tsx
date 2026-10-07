import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,Audio,staticFile} from 'remotion';
import {Opening,Problem} from './trailer-v16-timed/NarrativeScenes';
import {ChatVsAgentCollage} from './trailer-v16-timed/ChatVsAgentCollage';
import {SamuelIntro} from './trailer-v16-timed/SamuelIntro';
import {Build} from './trailer-v16-timed/Build';
import {Control} from './trailer-v16-timed/Control';
import {AgentLoop} from './trailer-v16-timed/LoopEngineering';
import {Ship} from './trailer-v16-timed/Ship';
import {Finale} from './trailer-v16-timed/Finale';
import {C,sans,p,easeInOut,Title,Paper,mono} from './trailer-v16-timed/design';
import {scenes,captions} from './trailer-v16-timed/timeline';
const components=[Opening,Problem,ChatVsAgentCollage,SamuelIntro,Build,Control,AgentLoop,Ship,Finale];
const rip=(q:number)=>{const x=q*2200-140;return `polygon(0 0,${x}px 0,${x+48}px 95px,${x-17}px 205px,${x+53}px 312px,${x-34}px 420px,${x+42}px 535px,${x-20}px 656px,${x+61}px 775px,${x-8}px 891px,${x+44}px 1080px,0 1080px)`};
export const TrailerV16Timed:React.FC=()=>{
 const f=useCurrentFrame(),caption=captions.find(([a,b])=>f>=a&&f<=b);
 const start=(name:string)=>scenes.find(s=>s.name===name)!.from;
 const chat=start('ChatVsAgent'),intro=start('SamuelIntro'),harness=start('Harness'),ship=start('Ship');
 const move=(from:number,d:number,a:number,b:number)=>a+(b-a)*easeInOut(p(f,from,d));
 return <AbsoluteFill style={{background:C.bg,color:C.white,fontFamily:sans,overflow:'hidden'}}>
 {scenes.map((s,i)=>{const Component=components[i];return <Sequence key={s.name} name={s.name} from={s.from} durationInFrames={s.duration+(i<8&&i!==2?24:0)}><AbsoluteFill style={{transform:'translateY(-16px) scale(.94)',transformOrigin:'50% 45%',clipPath:i===0||i===8?'none':rip(easeInOut(p(f,s.from,24)))}}><Component/></AbsoluteFill></Sequence>})}

 {f>=intro-24&&f<intro+24&&<div style={{position:'absolute',inset:0,zIndex:10,background:C.cyan,transform:`translateX(${f<intro?move(intro-24,24,1920,0):move(intro,24,0,-1920)}px)`}}><Title x={170} y={390} size={280} color={C.ink}>AGENT</Title></div>}

 {f>=ship-22&&f<ship+24&&<Paper style={{left:move(ship-22,46,1252,701),top:402,width:535,height:327}} pad={34}><div style={{fontSize:41,fontWeight:700,color:C.cyan}}>{f<ship?'確認結果':'DATABASE / 紀錄'}</div><div style={{fontSize:35,marginTop:55}}>資料真的存進去</div></Paper>}
 {caption&&<div style={{position:'absolute',left:120,right:120,bottom:32,textAlign:'center',zIndex:20}}><span style={{display:'inline-block',maxWidth:'100%',boxSizing:'border-box',fontSize:68,fontWeight:400,lineHeight:1.18,background:'rgba(0,0,0,.78)',padding:'14px 34px',borderRadius:8}}>{caption[2]}</span></div>}
 <Audio src={staticFile('assets/soundtrack-v16.wav')}/>
 </AbsoluteFill>;
};
