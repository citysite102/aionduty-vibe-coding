import React from 'react';
import {C,Title,HandTitle,Arrow,p,easeInOut,show,mono} from './design';
// One dominant phrase per beat; previous words move along the same vertical rail.
export const Kinetic:React.FC<{f:number;at:number[];words:string[];notes:string[];tag:string}>=({f,at,words,notes,tag})=>{
 const active=Math.max(0,at.reduce((last,a,i)=>f>=a?i:last,0));
 return <div style={{position:'absolute',inset:0,overflow:'hidden'}}>
 <div style={{position:'absolute',left:123,top:208,fontFamily:mono,fontSize:30,color:C.gray,...show(f,at[0])}}>{tag}</div>
 {words.map((word,i)=>{const Display=i===words.length-1?HandTitle:Title;const enter=easeInOut(p(f,at[i],14)),exit=i<words.length-1?easeInOut(p(f,at[i+1]-12,12)):0;
 return <div key={word} style={{position:'absolute',inset:0,visibility:f<at[i]?'hidden':'visible',transform:`translate(${i%3===1?(1-enter)*-50:0}px,${(i%3===0?0:(1-enter)*95)-exit*360}px) scale(${i%3===0?1+(1-enter)*.15:1}) rotate(${i%3===2?(1-enter)*3:0}deg)`,opacity:1-exit,transformOrigin:'280px 420px'}}>
 <div style={{position:'absolute',left:130,top:343,fontFamily:mono,fontSize:52,color:C.cyan}}>0{i+1} /</div>
 <Display x={280} y={333} size={word.length>8?128:158} color={C.white} rotate={i%2?2:-2}>{word}</Display>
 <div style={{position:'absolute',left:296,top:579,fontSize:43,color:C.cyan,...show(f,at[i]+10)}}>{notes[i]}</div>
 <Arrow f={f} at={at[i]+13} d="M290 548 Q640 529 1020 555 Q1242 568 1560 544"/>
 </div>})}
 <div style={{position:'absolute',left:130,top:779,display:'flex',gap:31,fontFamily:mono,fontSize:28}}>{words.map((w,i)=><span key={w} style={{color:i===active?C.cyan:C.gray,borderBottom:i===active?'4px solid '+C.cyan:'4px solid transparent',paddingBottom:13}}>{w}</span>)}</div>
 </div>;
};
