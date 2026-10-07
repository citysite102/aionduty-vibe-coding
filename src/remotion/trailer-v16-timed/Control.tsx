import React from 'react';
import {useSceneFrame,localBeat} from './sceneTiming';
import {Img,staticFile} from 'remotion';
import {Background,SceneLabel,Title,C,Paper,Arrow,mono,Badge,show,stick,p,easeInOut,ease} from './design';
// Conceptual layouts, not a reproduction of a specific app release. Configuration lives in separate files.
const parts=[['Rules','分開管理各類規則'],['Hooks','指定時機執行檢查'],['Subagent','實作與審查分工'],['MCP / Skills','接工具、給做法']];
export const Control:React.FC=()=>{
 const f=useSceneFrame('Harness',14),q=easeInOut(p(f,282,24));
 return <><Background/><SceneLabel n="05" name="HARNESS / INSTRUCTIONS · TOOLS · CHECKS"/>
 {f<306&&<div style={{position:'absolute',inset:0,transform:`translateY(${-q*1080}px)`}}>
 <Title x={105} y={148} size={80} style={show(f,6)}>怎麼讓 Agent 照你的方式工作？</Title>
 <div style={{position:'absolute',left:112,top:270,fontSize:38,color:C.cyan,...show(f,18)}}>Harness / 運作框架</div>
 <Paper style={{left:112,top:370,width:655,height:414,...stick(f,30,-2)}} pad={38}>
 <div style={{fontFamily:mono,fontSize:59,fontWeight:700,color:C.cyan}}>CLAUDE.md</div>
 <div style={{fontSize:37,fontWeight:700,marginTop:32}}>一起建構你的專案手冊</div>
 <div style={{fontSize:34,lineHeight:1.8,marginTop:29,color:C.gray}}>專案在做什麼<br/>檔案與指令怎麼用<br/>怎樣才算完成</div></Paper>
 {parts.map(([name,desc],i)=><Paper key={name} style={{left:870+(i%2)*476,top:370+Math.floor(i/2)*216,width:450,height:199,...stick(f,58+i*20,i%2?2:-2)}} pad={28}><div style={{fontSize:name.length>15?34:43,fontWeight:700,color:C.cyan}}>{name}</div><div style={{fontSize:32,marginTop:25,color:C.gray}}>{desc}</div></Paper>)}
 <Arrow f={f} at={132} d="M770 568 l77 0 l-18 -15 m18 15 l-18 15"/>
 <div style={{position:'absolute',left:120,top:837,fontSize:34,color:C.gray,...show(f,155)}}>上下文、token 用量與權限，也會一起設定</div>
 </div>}
 {f>=282&&<div style={{position:'absolute',inset:0,transform:`translateY(${(1-q)*1080}px)`}}>
 <Title x={106} y={156} size={83}>用 Claude Desktop，實際操作</Title>
 <Paper style={{left:112,top:319,width:757,height:516,...stick(f,293,-2)}} pad={20}>
 <Img src={staticFile('assets/claude-desktop-v07.jpg')} style={{width:'100%',height:'100%',objectFit:'contain',background:'#141414'}}/></Paper>
 <Paper style={{left:1050,top:319,width:757,height:516,...stick(f,317,2)}} pad={20}>
 <Img src={staticFile('assets/codex-desktop-v07.png')} style={{width:'100%',height:'100%',objectFit:'contain',background:'#181818'}}/></Paper>
 <svg width="1920" height="1080" style={{position:'absolute',inset:0,pointerEvents:'none'}} aria-label="Claude Desktop 的觀念可沿用到 Codex">
 <path d="M902 576 C941 572 975 580 1016 576" fill="none" stroke={C.cyan} strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-easeInOut(p(f,334,18))}/>
 <path d="M1001 562 L1016 576 L1001 590" fill="none" stroke={C.cyan} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" opacity={easeInOut(p(f,350,6))}/>
 </svg>
 <div style={{position:'absolute',left:135,top:851,fontSize:35,color:C.cyan}}>Claude Desktop</div>
 <div style={{position:'absolute',left:1070,top:851,fontSize:35,color:C.cyan}}>Codex / 其他 Agent</div>
 <div style={{position:'absolute',left:135,top:916,fontSize:30,color:C.gray,...show(f,355)}}>觀念可以沿用，設定方式依各工具調整</div>
 </div>}
 </>;
};
