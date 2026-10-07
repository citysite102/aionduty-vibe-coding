import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
export const C={bg:'#020817',navy:'#06162E',cyan:'#12E6EE',blue:'#078BFF',sky:'#69DDF7',white:'#F7F9FC',ink:'#020712',red:'#FF4F68',green:'#23E6B7',gray:'#9AAAC0'};
export const sans='"Noto Sans TC", sans-serif', heavy='"Inter Heavy", "Noto Display", sans-serif', mono='"SFMono-Regular", Consolas, monospace';
export const clamp=(x:number)=>Math.max(0,Math.min(1,x));
export const p=(f:number,s:number,d=20)=>clamp((f-s)/d);
// Cubic Bezier curves are evaluated from frames; previews and rendered frames use identical timing.
export type MotionCurve=(progress:number)=>number;
export const bezier=(x1:number,y1:number,x2:number,y2:number):MotionCurve=>(progress)=>{
 const x=clamp(progress);if(x===0||x===1)return x;
 const sample=(t:number,a:number,b:number)=>3*(1-t)*(1-t)*t*a+3*(1-t)*t*t*b+t*t*t;
 let lo=0,hi=1;
 for(let i=0;i<22;i++){const t=(lo+hi)/2;if(sample(t,x1,x2)<x)lo=t;else hi=t;}
 return sample((lo+hi)/2,y1,y2);
};
export const easeIn=bezier(.55,0,1,.45);
export const easeOut=bezier(.16,1,.3,1);
export const easeInOut=bezier(.65,0,.35,1);
export const impact=bezier(.12,.85,.2,1);
export const draw=bezier(.45,0,.25,1);
export const ease=easeOut;
export const tween=(f:number,s:number,d:number,a:number,b:number,curve:MotionCurve=easeInOut)=>a+(b-a)*curve(p(f,s,d));
export const show=(f:number,s:number,d=16):React.CSSProperties=>({clipPath:`inset(0 ${(1-easeOut(p(f,s,d)))*100}% 0 0)`});
export const stick=(f:number,s:number,r=0):React.CSSProperties=>{const q=easeOut(p(f,s,22));return {visibility:f<s?'hidden':'visible',transform:`translateY(${(1-q)*22}px) scale(${.98+.02*q})`,transformOrigin:'50% 60%','--entry-progress':q} as React.CSSProperties;};
export const Paper:React.FC<{children?:React.ReactNode;style?:React.CSSProperties;fill?:string;pad?:number}>=({children,style,fill=C.navy,pad=36})=>{const f=useCurrentFrame(),q=(style as React.CSSProperties & {'--entry-progress'?:number})?.['--entry-progress']??draw(p(f,4,24));return <div style={{position:'absolute',background:fill,border:`1.5px solid ${fill===C.white?'#CFDAE7':'#385269'}`,boxSizing:'border-box',...style}}>{[0,1,2,3].map(i=><div key={i} style={{position:'absolute',width:22*q,height:22*q,pointerEvents:'none',...(i<2?{top:-2}:{bottom:-2}),...(i%2?{right:-2}:{left:-2}),...(i<2?{borderTop:'3px solid '+C.cyan}:{borderBottom:'3px solid '+C.cyan}),...(i%2?{borderRight:'3px solid '+C.cyan}:{borderLeft:'3px solid '+C.cyan})}}/>)}<div style={{position:'relative',padding:pad,height:'100%',boxSizing:'border-box'}}>{children}</div></div>};
export const Title:React.FC<{children:React.ReactNode;x:number;y:number;size?:number;color?:string;rotate?:number;style?:React.CSSProperties}>=({children,x,y,size=108,color=C.white,style})=><div style={{position:'absolute',left:x,top:y,fontFamily:heavy,fontWeight:900,fontSize:size,lineHeight:1.1,letterSpacing:-3,color,whiteSpace:'nowrap',...style}}>{children}</div>;
export const Badge:React.FC<{children:React.ReactNode;x:number;y:number;f:number;at:number;r?:number;fill?:string}>=({children,x,y,f,at,r=-3,fill=C.cyan})=><div style={{position:'absolute',left:x,top:y,padding:'14px 26px',background:fill,color:C.ink,fontFamily:heavy,fontWeight:900,fontSize:36,whiteSpace:'nowrap',boxShadow:`8px 8px 0 ${C.ink}`,...stick(f,at,r)}}>{children}</div>;
export const Arrow:React.FC<{d:string;f:number;at:number;color?:string;duration?:number}>=({d,f,at,color=C.cyan,duration=24})=><svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={d} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-(1-Math.pow(1-p(f,at,duration),2))}/></svg>;
export const Texture:React.FC=()=> <><div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(105,221,247,.045) 1px, transparent 1px),linear-gradient(90deg,rgba(105,221,247,.045) 1px, transparent 1px)',backgroundSize:'150px 150px'}}/><svg width="1920" height="1080" style={{position:'absolute',inset:0,opacity:.28}}>{[[100,110],[1820,110],[100,910],[1820,910]].map(([x,y])=><path key={x+'-'+y} d={`M${x-8} ${y}H${x+8}M${x} ${y-8}V${y+8}`} stroke={C.sky} strokeWidth="1.5"/>)}</svg></>;
export const Background:React.FC<{light?:boolean}>=({light=false})=><div style={{position:'absolute',inset:0,background:light?C.white:C.bg}}><Texture/></div>;
export const SceneLabel:React.FC<{n:string;name:string}>=({name})=><div style={{position:'absolute',right:100,top:62,color:C.cyan,fontFamily:mono,fontSize:24,letterSpacing:3}}>{name}</div>;
export const AgentIcon:React.FC<{x:number;y:number;size?:number;f:number;at?:number}>=({x,y,size=180,f,at=0})=><Paper style={{left:x,top:y,width:size,height:size,...stick(f,at,-5)}} pad={20}><svg viewBox="0 0 120 120" width="100%" height="100%"><path d="M60 15V26 M51 13h18" stroke={C.cyan} strokeWidth={7}/><rect x="13" y="28" width="94" height="68" rx="22" fill={C.white}/><rect x="23" y="40" width="74" height="43" rx="15" fill={C.ink}/><circle cx="42" cy="60" r="8" fill={C.cyan}/><circle cx="78" cy="60" r="8" fill={C.cyan}/><path d="M4 51v20 M116 51v20" stroke={C.sky} strokeWidth="8"/></svg></Paper>;
// Reuses the actual instructor pixels from the supplied cover. The SVG clip removes the surrounding cover design.
const silhouette='M1120 321 L1182 286 L1170 258 L1154 210 L1149 158 L1138 119 L1147 88 L1143 64 L1159 43 L1181 33 L1208 22 L1251 18 L1292 22 L1330 34 L1369 59 L1396 91 L1401 128 L1392 165 L1397 189 L1386 224 L1373 239 L1391 259 L1427 276 L1466 299 L1497 333 L1480 369 L1417 385 L1321 365 L1289 341 Z';
export const Samuel:React.FC<{x:number;y:number;w?:number;f:number;at?:number}>=({x,y,w=640,f,at=0})=><div style={{position:'absolute',left:x,top:y,width:w,height:w*1.18,...stick(f,at,-3)}}><svg viewBox="1080 0 460 410" width="100%" height="100%" style={{overflow:'visible'}}><defs><clipPath id={'samuel-clip-'+at}><path d={silhouette}/></clipPath></defs><path d={silhouette} fill={C.white} stroke={C.white} strokeWidth={20} strokeLinejoin="round"/><image href={staticFile('assets/course-cover.png')} width={1593} height={987} clipPath={`url(#samuel-clip-${at})`}/></svg></div>;
export const Timer:React.FC<{f:number;small?:boolean}>=({f,small=false})=>{const sec=Math.min(8,Math.max(0,Math.floor((f-25)/30)));return <div style={{color:C.ink,textAlign:'center',padding:small?'25px 10px':'35px 30px',fontFamily:sans}}><div style={{fontSize:small?27:32,letterSpacing:3}}>任務計時器</div><div style={{fontSize:small?88:138,fontFamily:heavy,letterSpacing:-6,margin:'24px 0'}}>00:0{sec}</div><div style={{fontSize:small?22:30,color:'#334155',marginBottom:30}}>專注完成一件事</div><div style={{display:'flex',gap:12,justifyContent:'center'}}>{['開始','暫停','重置'].map((t,i)=><div key={t} style={{padding:small?'13px 18px':'18px 34px',fontSize:small?24:32,background:i===0?C.cyan:'#E2E8F0',fontWeight:700}}>{t}</div>)}</div><div style={{height:5,background:'#CDD6E1',marginTop:35}}><div style={{height:5,width:`${sec*11}%`,background:C.blue}}/></div></div>};
export const Browser:React.FC<{x:number;y:number;w:number;h:number;f:number;at?:number;children?:React.ReactNode;url?:string;r?:number}>=({x,y,w,h,f,at=0,children,url='localhost:3000 / timer',r=2})=><Paper fill={C.white} pad={22} style={{left:x,top:y,width:w,height:h,...stick(f,at,r)}}><div style={{display:'flex',alignItems:'center',gap:13,borderBottom:'2px solid #CDD6E1',paddingBottom:18,color:C.ink,fontFamily:mono,fontSize:25}}><span style={{color:C.blue}}>● ● ●</span><span style={{marginLeft:20}}>{url}</span></div>{children}</Paper>;

export const HandTitle:React.FC<React.ComponentProps<typeof Title>>=(props)=><Title {...props} style={{fontFamily:heavy,fontWeight:900,letterSpacing:-3,...props.style}}/>;

export const DoneMarker:React.FC<{f:number;at:number}>=({f,at})=><Title x={211} y={297} size={147} color={C.cyan} style={show(f,at,24)}>到真的做得完</Title>;

export const Typed:React.FC<{text:string;f:number;at:number;duration?:number}>=({text,f,at,duration=30})=>{const n=Math.floor(p(f,at,duration)*text.length),cursor=f>=at&&f<at+duration+35&&Math.floor(f/10)%2===0;return <>{text.slice(0,n)}<span style={{display:'inline-block',width:3,height:'1em',verticalAlign:'-.12em',marginLeft:5,background:C.cyan,opacity:cursor?1:0}}/></>};
