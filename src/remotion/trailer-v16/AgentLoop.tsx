import React from 'react';
import {durationOf} from './sceneTiming';
import {useCurrentFrame} from 'remotion';
import {Background,SceneLabel,Title,C,Paper,mono,Badge,show,stick,p,easeInOut,draw,ease} from './design';
const checks=['重新開啟後，紀錄還在','倒數結束時，會出現提醒','提醒只觸發一次','主控台沒有紅字','既有功能仍能正常使用'];
export const LoopCore:React.FC=()=>{
 const f=useCurrentFrame()*540/durationOf('LoopEngineering')*275/110*1.52,expanded=easeInOut(p(f,47,35)),passed=f<196?3:f<297?4:5,phase=f<92?'BUILD':f<128?'TEST':f<160?'CHECK':f<196?'FIX':f<236?'BUILD':f<268?'TEST':f<297?'CHECK':'VERIFY';
 const stages=[[0,0],[92,1],[128,2],[160,3],[196,5],[236,6],[268,7],[297,9]],k=stages.reduce((last,[at],i)=>f>=at?i:last,0),previous=stages[Math.max(0,k-1)][1],target=stages[k][1];
 const angle=(previous+(target-previous)*easeInOut(p(f,stages[k][0],18)))*Math.PI*2/5-Math.PI/2;
 return <><Background/><SceneLabel n="06" name="BUILD → TEST → CHECK → FIX → VERIFY"/>
 <Title x={118} y={167} size={94} style={show(f,3)}>什麼叫做完？</Title>
 {checks.map((s,i)=>{const good=i===0||i===3||i===4||passed>=4&&i===1||passed===5;return <Paper key={s} style={{left:400-expanded*270,top:310+i*103,width:1120-expanded*405,height:91,...stick(f,17+i*5,i%2?1:-1)}} pad={23}><div style={{display:'flex',gap:20,fontSize:32}}><span style={{fontFamily:mono,color:good?C.green:C.red}}>{good?'✓':'×'}</span><span>{s}</span><span style={{marginLeft:'auto',color:C.gray,fontFamily:mono,fontSize:24}}>0{i+1}</span></div></Paper>})}
 <div style={{position:'absolute',inset:0,visibility:f>=70?'visible':'hidden',transform:`translateX(${(1-expanded)*450}px)`}}>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0}}><ellipse cx={1325} cy={565} rx={295} ry={245} fill="none" stroke={passed===5?C.cyan:'#385269'} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1-draw(p(f,72,30))}/>{f>=89&&f<297&&<circle cx={1325+295*Math.cos(angle)} cy={565+245*Math.sin(angle)} r="9" fill={C.cyan}/>}</svg>
 {['BUILD','TEST','CHECK','FIX','VERIFY'].map((t,i)=>{const theta=-Math.PI/2+i*Math.PI*2/5,x=1325+295*Math.cos(theta),y=565+245*Math.sin(theta);return <div key={t} style={{position:'absolute',left:x,top:y,transform:'translate(-50%,-50%)',background:phase===t?C.cyan:C.navy,border:'1px solid '+C.cyan,color:phase===t?C.ink:C.gray,padding:'12px 18px',fontFamily:mono,fontSize:28,fontWeight:700}}>{t}</div>})}
 {f<400&&<Title x={1160} y={411} size={156} color={passed===5?C.green:C.white}>{passed} / 5</Title>}
 <div style={{position:'absolute',left:1090,top:645,width:470,textAlign:'center',fontSize:34,color:passed===5?C.green:C.cyan}}>{passed===5?'全過後，由你確認並停止':passed===4?'再驗一次':'沒通過，回頭修'}</div>
 </div>
 {f>=302&&<Badge x={190} y={843} f={f} at={304} fill={C.green}>ALL CHECKS PASSED</Badge>}
 </>;
};
