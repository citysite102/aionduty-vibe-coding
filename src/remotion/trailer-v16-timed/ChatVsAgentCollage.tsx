import React from 'react';
import {useSceneFrame,localBeat} from './sceneTiming';
import {useCurrentFrame} from 'remotion';
import {C,Paper,Title,Background,SceneLabel,Arrow,Badge,mono,show,stick,p,easeInOut,ease} from './design';
// Same request on both sides; workspace actions require tools and user-granted access.
export const ChatVsAgentCollage:React.FC=()=>{
 const f=useSceneFrame('ChatVsAgent',12),push=0;
 const step=f<80?0:f<135?1:f<185?2:f<225?3:4;
 return <><Background/><SceneLabel n="02" name="SAME TASK / DIFFERENT WORKFLOW"/>
 <div style={{position:'absolute',inset:0,transform:`translateX(${-push*460}px) scale(${1+push*.35})`,transformOrigin:'75% 45%'}}>
 <div style={{position:'absolute',left:145,top:92,fontSize:30,color:C.gray,...show(f,5)}}>同一個任務</div>
 <div style={{position:"absolute",left:145,top:142,fontSize:60,fontWeight:900,fontFamily:"Noto Display",color:C.white,...show(f,9)}}>幫計時器加上儲存機制＋倒數提醒</div>
 <Title x={145} y={253} size={96} color={C.white} rotate={-2} style={show(f,30)}>CHAT</Title>
 <Title x={1060} y={253} size={96} color={C.cyan} rotate={2} style={show(f,30)}>AGENT</Title>
 <div style={{position:'absolute',left:150,top:376,fontSize:35,color:C.gray,...show(f,34)}}>回覆做法，等你動手</div>
 <div style={{position:'absolute',left:1068,top:376,fontSize:35,color:C.cyan,...show(f,34)}}>在工作區裡實際執行</div>
 <Paper fill={C.white} style={{left:130,top:454,width:690,height:265,...stick(f,25,-2)}} pad={30}>
 <div style={{fontSize:34,color:C.ink,fontWeight:700}}>可以，把這段貼進 Timer.tsx：</div>
 <div style={{fontFamily:mono,fontSize:31,color:'#335365',lineHeight:1.5,marginTop:24}}>function save() {'{'}<br/>  saveTimer(state);<br/>{'}'}</div>
 </Paper>
 <div style={{position:'absolute',left:145,top:750,fontSize:34,lineHeight:1.6,color:C.white,...show(f,72)}}>{f<132?'你：複製 → 貼進檔案':'你：貼上 → 執行 → 回傳錯誤'}</div>
 <div style={{position:'absolute',left:157,top:858,fontSize:32,color:f>=158?C.red:C.gray,...show(f,112)}}>{f>=158?'× saveTimer is not defined':'等待你執行程式'}</div>
 {['讀取 Timer.tsx','加入儲存與倒數提醒','執行測試','驗證重開紀錄與提醒'].map((s,i)=><Paper key={s} style={{left:1052,top:454+i*105,width:710,height:93,...stick(f,45+i*44,i%2?1:-1)}} pad={23}><div style={{fontSize:33,fontWeight:700,display:'flex',gap:20,color:step>i?C.cyan:C.gray}}><span style={{fontFamily:mono}}>{step>i?'✓':'›'}</span>{s}<span style={{marginLeft:'auto',fontFamily:mono,fontSize:25}}>{step>i?'DONE':'RUN'}</span></div></Paper>)}
 <Arrow f={f} at={122} color={C.red} d="M800 846 C940 854 976 808 972 651 C969 482 936 433 839 463"/>
 <Arrow f={f} at={140} duration={12} color={C.red} d="M860 440 L836 464 L870 468"/>
 <Badge x={1070} y={887} f={f} at={240} r={-2}>最後，由你確認是否做對</Badge>
 </div>
 <div style={{position:'absolute',right:120,top:413,fontSize:24,color:C.gray}}>工作區已授權 / 動畫示意</div>
 </>;
};
