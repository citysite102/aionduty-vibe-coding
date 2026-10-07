import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C,mono,Paper,Title,Badge,Background,SceneLabel,p,easeIn,easeInOut,impact,ease,tween,stick,show} from './design';
export const Chaos:React.FC=()=>{
 const f=useCurrentFrame(),copy=easeInOut(p(f,108,40)),out=easeIn(p(f,270,24));
 return <><Background/><SceneLabel n="01" name="ASK / COPY / PASTE"/>
 {f<22&&<Title x={920} y={420} size={130} color={C.cyan}>_</Title>}
 <Paper style={{left:tween(f,20,20,1920,220),top:tween(f,55,20,305,142),width:1480,height:132,transform:'rotate(-2deg)'}} pad={30}>
 <div style={{display:'flex',gap:35,fontSize:45,alignItems:'center'}}><span style={{fontFamily:mono,color:C.cyan,fontSize:34}}>Prompt |</span><b>{f<31?'':f<41?'幫我做':f<51?'幫我做一個任務':'幫我做一個任務計時器'}</b><span style={{marginLeft:'auto',color:C.cyan}}>↵</span></div></Paper>
 <div style={{transform:`translateY(${-out*100}px) scale(${1-out*.15})`,transformOrigin:'center'}}>
 <Paper style={{left:230+copy*780,top:320+copy*65,width:850-copy*200,height:490-copy*30,transform:`rotate(${-3+copy*7}deg)`,...show(f,58,15)}}>
 <div style={{fontFamily:mono,color:C.cyan,fontSize:30,borderBottom:`2px solid ${C.gray}`,paddingBottom:18}}>AI REPLY / Timer.tsx</div>
 <div style={{marginTop:24,fontSize:35}}>當然可以</div><div style={{fontSize:24,fontFamily:mono,color:C.sky,lineHeight:1.5,marginTop:18,...show(f,68,30)}}>{['const Timer = () => {','  const [time, setTime] = useState(0);','  function start() {','    setInterval(tick, 1000);','  }','  return <TimerView />;','};'].map((s,i)=><div key={s} style={{visibility:f>70+i*4?'visible':'hidden'}}>{s}</div>)}</div>
 </Paper>
 {f<118&&<Title x={1190} y={360} size={116} rotate={3} style={show(f,82)}>ASK<br/>COPY<br/>PASTE</Title>}
 <Paper style={{left:180,top:398,width:700,height:420,...stick(f,127,-4)}}><div style={{fontFamily:mono,fontSize:31,color:C.gray}}>EDITOR / src</div><div style={{fontFamily:mono,fontSize:38,color:C.cyan,marginTop:52,...show(f,142)}}>{'<Timer />'}</div><div style={{marginTop:50,padding:'15px 22px',width:140,background:C.cyan,color:C.ink,fontFamily:mono,fontSize:34,...stick(f,157,0)}}>▶ RUN</div></Paper>
 <Badge x={870} y={550} f={f} at={106} fill={C.white}>⌘ C</Badge><Badge x={550} y={320} f={f} at={138} fill={C.white}>⌘ V</Badge>
 </div>
 {f>=178&&f<324&&<div style={{position:'absolute',inset:0,background:'rgba(2,8,23,.94)',transform:`translate(${Math.sin(f*2.7)*19*(1-p(f,178,19))}px,${Math.cos(f*1.9)*11*(1-p(f,178,19))}px)`}}>
 <div style={{position:'absolute',left:106,top:135,fontFamily:mono,fontSize:30,color:C.gray}}>RUN → FAILED</div>
 <Title x={160} y={204} size={192} color={C.red} rotate={-3} style={{transform:`rotate(-3deg) scale(${tween(f,178,12,1.35,1,impact)})`,transformOrigin:'left center'}}>ERROR</Title>
 {['ReferenceError: tick is not defined','Timer.tsx:4 → setInterval(tick, 1000)','× 計時器沒有啟動'].map((s,i)=><Paper key={s} fill={i===0?C.red:C.navy} style={{left:170+i*33,top:438+i*126,width:1490-i*60,height:111,...stick(f,182+i*8,i%2?2:-2)}} pad={28}><div style={{fontFamily:i<2?mono:undefined,fontSize:i===0?43:37,fontWeight:700,color:i===0?C.ink:C.white}}>{s}</div></Paper>)}
 <div style={{position:'absolute',left:170,top:854,fontSize:38,color:C.white,...show(f,226)}}>紅字出現了，接下來呢？</div>
 </div>}

 </>;
};
