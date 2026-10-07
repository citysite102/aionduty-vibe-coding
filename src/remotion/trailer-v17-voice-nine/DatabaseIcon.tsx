import React from 'react';
import {C,p,easeInOut} from './design';
// Frame-driven vector illustration; no runtime clocks or external assets.
export const DatabaseIcon:React.FC<{f:number;at?:number;size?:number;active?:boolean}>=({f,at=0,size=150,active=true})=>{
 const t=Math.max(0,f-at),intro=easeInOut(p(f,at,18));
 return <svg width={size} height={size} viewBox="0 0 180 180" role="img" aria-label="雲端資料庫" style={{overflow:'visible',opacity:intro,transform:`translateY(${(1-intro)*8}px)`}}>
 <g fill="none" stroke={C.cyan} strokeWidth="1.5" opacity={active?.42:.2}>
 <path d="M12 121 L40 139 L60 127 M168 121 L140 139 L120 127 M22 149 L47 164 L73 148 M158 149 L134 164 L108 148"/>
 </g>
 {[112,76,40].map((y,i)=>{
 const pulse=active?Math.sin(t*.065+i*.8)*1.2:0;
 return <g key={y} transform={`translate(0,${pulse})`}>
 <path d={`M30 ${y+15} L90 ${y+48} L150 ${y+15} L150 ${y+37} Q148 ${y+44} 140 ${y+48} L90 ${y+76} L40 ${y+48} Q30 ${y+43} 30 ${y+37} Z`} fill="#174378"/>
 <path d={`M90 ${y+48} L150 ${y+15} L150 ${y+37} Q148 ${y+44} 140 ${y+48} L90 ${y+76} Z`} fill="#12325c"/>
 <path d={`M30 ${y+15} L90 ${y-18} L150 ${y+15} L90 ${y+48} Z`} fill="#2785c8" stroke="#69DDF7" strokeWidth="2" strokeLinejoin="round"/>
 <path d={`M54 ${y+15} L90 ${y-5} L126 ${y+15} L90 ${y+35} Z`} fill="#1b5391"/>
 {[0,1,2].map(k=><circle key={k} cx={111+k*11} cy={y+48-k*6} r="2.4" fill={C.cyan} opacity={active?.35+.65*Math.pow(Math.sin(t*.09+k+i),2):.5}/>)}
 </g>})}
 {active&&[0,1].map(k=>{const q=((t*.009+k*.5)%1);return <circle key={k} cx={k===0?12+q*33:168-q*33} cy={121+q*17} r="2.2" fill={C.cyan} opacity={Math.sin(q*Math.PI)}/>})}
 </svg>;
};
