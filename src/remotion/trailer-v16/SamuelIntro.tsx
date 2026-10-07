import React from 'react';
import {useSceneFrame,localBeat} from './sceneTiming';
import {useCurrentFrame} from 'remotion';
import {Background,SceneLabel,Samuel,Title,C,Badge,show,p,easeInOut} from './design';
export const SamuelIntro:React.FC=()=>{
 const f=useSceneFrame('SamuelIntro',11);
 return <><Background/><SceneLabel n="03" name="BUILD / UNDERSTAND / ENGINEER"/>
 <div style={{position:'absolute',left:1130,top:175,width:580,height:580,border:'1px solid '+C.blue,background:'transparent'}}/>
 <Samuel x={1090} y={115} w={630} f={f} at={12}/>
 <Title x={116} y={222} size={118} rotate={-3} style={show(f,25)}>SAMUEL KAO</Title>
 <div style={{position:'absolute',inset:0,visibility:f>=43&&f<160?'visible':'hidden',clipPath:`inset(0 0 ${easeInOut(p(f,142,18))*100}% 0)`}}>
 <div style={{position:'absolute',left:132,top:376,fontSize:34,color:C.gray}}>累計 AI 培訓</div>
 <Title x={126} y={424} size={82} color={C.cyan} style={show(f,45)}>上千位學員</Title>
 <Title x={126} y={534} size={76} color={C.cyan} style={show(f,74)}>數十間企業</Title>
 <div style={{position:'absolute',left:136,top:651,fontSize:39,fontWeight:700}}>營運總監 · 產品總監</div>
 <div style={{position:'absolute',left:136,top:720,fontSize:34,color:C.gray}}>豐富工程背景 · 持續投入教學</div>
 </div>
 <Title x={122} y={488} size={73} color={C.white} style={show(f,170)}>怎麼和 AI 一起</Title>
 <Title x={218} y={596} size={73} color={C.cyan} rotate={2} style={show(f,220)}>把一個東西真的做完</Title>
 <Badge x={133} y={774} f={f} at={249} r={-2}>一起實作，也一起處理問題</Badge>
 </>;
};
