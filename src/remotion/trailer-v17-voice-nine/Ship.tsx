import React from 'react';
import {useSceneFrame,localBeat} from './sceneTiming';
import {Footage} from './Footage';
import {DatabaseIcon} from './DatabaseIcon';
import {Img,staticFile,useCurrentFrame} from 'remotion';
import {Background,SceneLabel,Title,C,Paper,mono,Badge,Timer,Arrow,show,stick,p,easeInOut,ease,tween} from './design';
const cases=[['booking','開窯預約','DATABASE'],['tokyo','東京的一天','INTERACTIVE'],['vessel','器 VESSEL','MARKETING']];
export const Ship:React.FC=()=>{
 const f=useSceneFrame('Ship',10),change=easeInOut(p(f,125,23));
 return <><Background/><SceneLabel n="07" name="DATABASE → DEPLOY → SHARE"/>
 {f<150&&<div style={{position:'absolute',inset:0,transform:'translateY('+(-change*1080)+'px)'}}>
 <Title x={102} y={157} size={84} style={show(f,8)}>資料接到雲端，換裝置也保留</Title>
 <Paper style={{left:110,top:402,width:475,height:362,...stick(f,20,-3)}} pad={28}>
 <div style={{fontSize:36,fontWeight:700,color:C.cyan}}>你的作品</div>
 <Img src={staticFile('assets/mission-timer-real.png')} style={{width:'100%',height:240,objectFit:'contain',marginTop:22}}/></Paper>
 <Paper style={{left:701,top:390,width:550,height:376,...stick(f,44,2)}} pad={32}>
 <div style={{fontFamily:mono,fontSize:38,color:C.cyan}}>DATABASE / 紀錄</div>
 <div style={{display:'flex',alignItems:'center',gap:22,marginTop:28}}>
 <DatabaseIcon f={f} at={44} size={154}/>
 <div style={{fontFamily:mono,fontSize:27,lineHeight:2.25}}><div style={{color:C.gray,fontSize:23}}>時間／專注紀錄</div>09:00｜25 分鐘 ✓<br/>14:30｜50 分鐘 ✓</div></div>
 <div style={{fontSize:25,color:C.gray,marginTop:10}}>資料已儲存 · 換裝置也保留</div></Paper>
 <Paper style={{left:1360,top:402,width:440,height:362,...stick(f,70,-2)}} pad={28}>
 <div style={{fontSize:36,fontWeight:700,color:C.cyan}}>另一台裝置</div><div style={{fontSize:75,fontWeight:700,marginTop:45,textAlign:'center'}}>2 筆紀錄</div><div style={{fontSize:31,marginTop:26,textAlign:'center'}}>資料重新讀回來</div></Paper>
 <Arrow f={f} at={52} d="M580 560 Q635 532 680 560 l-19 -17 m19 17 l-23 3 M1250 560 Q1295 532 1342 560 l-19 -17 m19 17 l-23 3"/>
 <div style={{position:'absolute',left:114,top:825,color:C.gray,fontFamily:mono,fontSize:30}}>GitHub → Vercel / Supabase · 部署、金鑰與權限</div>
 </div>}
 {f>=125&&<div style={{position:'absolute',inset:0,transform:'translateY('+((1-change)*1080)+'px)'}}>
 <Title x={102} y={160} size={80}>你想做哪一種網站？</Title>
 <CasePhones f={389} start={localBeat('Ship',125,10)}/>
 {['資料庫應用','互動網站','行銷網站'].map((s,i)=><Badge key={s} x={175+i*625} y={307} f={f} at={150+i*9} r={i%2?2:-2}>{s}</Badge>)}
 </div>}
 </>;
};
 
// Landscape screen recordings retain their aspect ratio; the three cards collapse into the course title.
export const CasePhones:React.FC<{f:number;gather?:number;start?:number;trimBefore?:number}>=({f,gather=0,start=0,trimBefore=0})=><>{cases.map(([clip,label,type],i)=>{
 const x=125+i*590,y=435+(i===1?20:0);
 return <div key={clip} style={{position:'absolute',left:x+(960-x)*gather,top:y+(510-y)*gather,width:500,height:420,transform:`rotate(${(i===0?-3:i===1?2:-2)*(1-gather)}deg) scale(${1-gather*.97})`}}>
 <Paper fill={C.white} style={{inset:0}} pad={18}>
 <div style={{fontFamily:mono,fontSize:24,color:C.ink,padding:'7px 0 16px'}}>● ● ● / {type}</div>
 <div style={{height:273,overflow:'hidden',background:C.ink}}><Footage clip={clip} from={start} trimBefore={trimBefore}/></div>
 <div style={{textAlign:'center',color:C.ink,fontSize:28,marginTop:9,fontWeight:700}}>{label}</div>
 </Paper></div>
})}</>;
