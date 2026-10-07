import React from 'react';
import {useSceneFrame,localBeat} from './sceneTiming';
import {useCurrentFrame} from 'remotion';
import {Background,SceneLabel,Samuel,Title,C,Badge,show,p,easeInOut} from './design';
export const SamuelIntro:React.FC=()=>{
 const f=useSceneFrame('SamuelIntro',11);
 return <><Background/><SceneLabel n="03" name="BUILD / UNDERSTAND / ENGINEER"/>
 <Samuel x={1090} y={115} w={630} f={f} at={12}/>
 <Title x={116} y={222} size={118} rotate={-3} style={show(f,25)}>SAMUEL KAO</Title>
 <div style={{position:'absolute',inset:0,visibility:f>=43&&f<160?'visible':'hidden',clipPath:`inset(0 0 ${easeInOut(p(f,142,18))*100}% 0)`}}>
 <div style={{position:'absolute',left:136,top:391,fontSize:32,color:C.gray}}>累計 AI 培訓</div>
 <Title x={130} y={449} size={88} color={C.cyan} style={show(f,45)}>上千位</Title>
 <div style={{position:'absolute',left:140,top:557,fontSize:38,...show(f,45)}}>學員</div>
 <Title x={577} y={449} size={88} color={C.cyan} style={show(f,74)}>數十間</Title>
 <div style={{position:'absolute',left:587,top:557,fontSize:38,...show(f,74)}}>企業</div>
 <div style={{position:'absolute',left:140,top:633,width:784,height:1,background:C.cyan,opacity:.22}}/>
 <div style={{position:'absolute',left:140,top:669,fontSize:38,fontWeight:700}}>營運總監 · 產品總監</div>
 <div style={{position:'absolute',left:140,top:738,fontSize:31,color:C.gray}}>豐富工程背景 · 持續投入教學</div>
 </div>
 <Title x={122} y={488} size={73} color={C.white} style={show(f,170)}>怎麼和 AI 一起</Title>
 <Title x={218} y={596} size={73} color={C.cyan} rotate={2} style={show(f,220)}>把一個東西真的做完</Title>
 <Badge x={133} y={774} f={f} at={249} r={-2}>一起實作，也一起處理問題</Badge>
 </>;
};
