import React from 'react';
import {useSceneFrame,localBeat} from './sceneTiming';
import {Footage} from './Footage';
import {DatabaseIcon} from './DatabaseIcon';
import {Img,staticFile,useCurrentFrame} from 'remotion';
import {Background,SceneLabel,Title,C,Paper,Arrow,mono,Badge,Browser,show,stick,p,easeInOut,ease,Samuel} from './design';
const knowledge=[['前端與後端','功能在哪一層','CLIENT / SERVER'],['API 與資料格式','文件與回傳內容','API / JSON'],['資料庫','資料怎麼存','DATABASE'],['看懂紅字','錯誤卡在哪裡','ERROR'],['Git 版控','改壞了可回退','VERSION'],['上線部署','讓別人打得開','DEPLOY'],['邊做邊學','補齊需要的基礎','BUILD / LEARN']];
export const Build:React.FC=()=>{
 const f=useSceneFrame('Build',20),shift=easeInOut(p(f,205,24)),active=Math.min(6,Math.max(0,Math.floor((f-230)/36)));
 return <><Background/><SceneLabel n="04" name={f<300?'TOOLS → WEBSITES → DATA':'SOFTWARE FOUNDATIONS / IN THE COURSE'}/>
 {f<231&&<div style={{position:'absolute',inset:0,transform:'translateX('+(-shift*1940)+'px)'}}>
 <Title x={103} y={148} size={83} rotate={-2} style={show(f,8)}>計時器、網站，到資料庫</Title>
 <Browser x={105} y={310} w={1000} h={550} f={f} at={22} r={-2} url="">
 {f<55?<Img src={staticFile('assets/mission-timer-real.png')} style={{marginTop:12,width:'100%',height:435,objectFit:'contain',background:'#020712'}}/>:
 f<73?<div style={{height:435,padding:32,background:C.navy,boxSizing:'border-box',marginTop:12}}><div style={{fontFamily:mono,fontSize:27,color:C.cyan}}>AUTOMATION / 小工具</div><div style={{fontSize:55,fontWeight:700,marginTop:35}}>重複的工作，交給工具</div><div style={{fontSize:32,lineHeight:2,marginTop:25}}>收集資料 → 整理內容 → 產出報表</div></div>:f<96?<div style={{position:"relative",height:435,background:C.bg,marginTop:12,overflow:"hidden",color:C.white,padding:30,boxSizing:"border-box"}}>
 <div style={{fontFamily:mono,fontSize:23,color:C.gray}}>ABOUT · PROJECTS · CONTACT</div>
 <div style={{fontSize:59,fontWeight:700,marginTop:63}}>SAMUEL KAO</div>
 <div style={{fontSize:29,color:C.cyan,marginTop:23}}>Product Builder / AI Consultant</div>
 <div style={{fontSize:28,marginTop:37}}>我的作品，與我在做的事</div>
 <Samuel x={590} y={40} w={310} f={f} at={73}/>
 </div>:<div style={{marginTop:12,width:'100%',height:435,overflow:'hidden'}}>{f<135?<Footage clip="pixel" from={localBeat('Build',96,20)} trimBefore={144}/>:<Footage clip="vessel" from={localBeat('Build',135,20)}/>}</div>}

 </Browser>
 <Paper style={{left:1195,top:310,width:590,height:176,...stick(f,73,3)}} pad={24}>
 <div style={{fontSize:45,fontWeight:700,color:C.cyan}}>個人網站</div><div style={{fontSize:31,marginTop:8}}>介紹自己、展示作品</div></Paper>
 <Paper style={{left:1195,top:508,width:590,height:176,...stick(f,96,-2)}} pad={24}>
 <div style={{fontSize:45,fontWeight:700,color:C.cyan}}>行銷網站</div><div style={{fontSize:31,marginTop:8}}>品牌內容、商品與活動</div></Paper>
 <Paper style={{left:1195,top:696,width:590,height:176,...stick(f,135,2)}} pad={24}>
 <div style={{fontSize:45,fontWeight:700,color:C.cyan}}>資料庫串接</div><div style={{fontSize:31,marginTop:8}}>表單、紀錄、跨裝置讀取</div></Paper>
 <Arrow f={f} at={152} d="M1080 604 Q1150 601 1160 746 l-13 -23 m13 23 l12 -21"/>
 </div>}
 {f>=205&&<div style={{position:'absolute',inset:0,transform:'translateX('+((1-shift)*1940)+'px)'}}>
 <Title x={102} y={153} size={86}>做網站會遇到的軟體知識</Title>
 <div style={{position:'absolute',left:110,top:282,fontSize:34,color:C.gray}}>紅字怎麼看、資料怎麼接、改壞了怎麼回退</div>
 {knowledge.map(([title,sub,token],i)=>{
 const col=i<4?i:i-4,row=i<4?0:1,x=(row===0?110:230)+col*430,y=375+row*239,on=i===active;
 return <Paper key={title} fill={on?'#083642':C.navy} style={{left:x,top:y,width:404,height:212,...stick(f,226+i*7,i%2?2:-2)}} pad={28}>
 <div style={{fontFamily:mono,fontSize:23,color:on?C.cyan:C.gray}}>0{i+1} / {token}</div>
 {i===2&&<div style={{position:'absolute',right:14,top:24}}><DatabaseIcon f={f} at={302} size={89} active={on}/></div>}
 <div style={{fontSize:37,fontWeight:700,marginTop:22,color:on?C.cyan:C.white,whiteSpace:'nowrap'}}>{title}</div>
 <div style={{fontSize:31,marginTop:15,color:C.gray}}>{sub}</div>
 </Paper>})}
 </div>}
 </>;
};
