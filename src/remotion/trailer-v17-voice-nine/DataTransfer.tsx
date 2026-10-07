import React from 'react';
import {C,mono,p,easeInOut} from './design';
import {DatabaseIcon} from './DatabaseIcon';
// One continuous handoff: a real record is encoded, transported and committed.
export const DataTransfer:React.FC<{f:number}>=({f})=>{
 const enter=easeInOut(p(f,0,12)),exit=easeInOut(p(f,112,16));
 const fields=['開始時間  09:00','專注時間  25 分鐘','完成狀態  已完成'];
 const stored=f>=100;
 return <div style={{position:'absolute',left:110,top:340,width:1700,height:520,zIndex:12,overflow:'hidden',background:C.bg,border:'1px solid #254457',transform:`translateX(${(1-enter)*1820-exit*1820}px)`}}>
 <div style={{position:'absolute',left:48,top:30,fontSize:38,fontWeight:700,color:C.white}}>確認資料真的存進去</div>
 <div style={{position:'absolute',left:50,top:110,width:420,height:310,border:'1px solid #345064',background:'#06162E',padding:28,boxSizing:'border-box'}}>
 <div style={{fontSize:25,fontFamily:mono,color:C.cyan,marginBottom:30}}>專注紀錄 / #001</div>
 {fields.map((s,i)=>{const q=easeInOut(p(f,35+i*7,18));return <div key={s} style={{fontSize:30,lineHeight:2.2,opacity:1-q,transform:`translateX(${q*80}px)`}}>{s}</div>})}
 <div style={{position:'absolute',left:28,top:127,fontFamily:mono,fontSize:28,color:C.cyan,lineHeight:2.2,opacity:p(f,48,14)*(1-p(f,76,12))}}>01001001 00110000<br/>00110010 00110101<br/>00000001 01001111</div>
 </div>
 <svg width="1700" height="520" style={{position:'absolute',inset:0}}><path d="M480 278 C680 278 810 278 1110 278" fill="none" stroke={C.cyan} strokeWidth="2" opacity=".28"/><path d="M1095 267 L1110 278 L1095 289" fill="none" stroke={C.cyan} strokeWidth="3"/>
 {Array.from({length:9},(_,i)=>{const t=p(f,48+i*3,26),q=easeInOut(t);const x=460+q*720,y=240+(i%3)*38;return <text key={i} x={x} y={y} fill={C.cyan} fontFamily={mono} fontSize="25" opacity={t>0&&t<1?Math.min(1,t*8,(1-t)*8):0}>{Array.from({length:7},(_,j)=>(i*13+j*7)%3===0?'0':'1').join('')}</text>})}
 </svg>
 <div style={{position:'absolute',left:1140,top:95,transform:`scale(${1+Math.sin(p(f,80,16)*Math.PI)*.065})`}}><DatabaseIcon f={f+30} size={260}/></div>
 <div style={{position:'absolute',left:1430,top:150,color:C.cyan,fontFamily:mono,fontSize:26}}>DATABASE</div>
 <div style={{position:'absolute',left:1430,top:209,fontSize:32,color:stored?C.cyan:C.white}}>{stored?'✓ 已儲存':'寫入資料'}</div>
 <div style={{position:'absolute',left:1140,top:391,fontSize:28,color:C.white,opacity:p(f,100,8)}}>09:00 · 25 分鐘 · 已完成</div>
 {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',left:i%2?1684:0,top:i<2?0:504,width:16,height:16,borderTop:i<2?'3px solid #12E6EE':undefined,borderBottom:i>=2?'3px solid #12E6EE':undefined,borderLeft:i%2===0?'3px solid #12E6EE':undefined,borderRight:i%2?'3px solid #12E6EE':undefined}}/>)}
 </div>;
};
