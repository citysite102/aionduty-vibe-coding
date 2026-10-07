import React from 'react';
import {CasePhones} from './Ship';
import {Background,SceneLabel,Title,DoneMarker,C,Paper,Badge,Samuel,Arrow,show,stick,p,easeInOut} from './design';
import {useSceneFrame} from './sceneTiming';
export const Finale:React.FC=()=>{
 const f=useSceneFrame('Finale',12),gather=easeInOut(p(f,0,30)),q=easeInOut(p(f,235,25));
 return <><Background/><SceneLabel n="09" name="FROM STARTED / TO FINISHED"/>
 {f<31&&<CasePhones f={389} gather={gather} trimBefore={175}/>}
 {f<260&&<div style={{position:'absolute',inset:0,transform:`translateY(${-q*1080}px)`}}>
 <Title x={106} y={157} size={84} style={show(f,5)}>從第一個畫面，到真的做完</Title>
 {['功能出了問題','想調整需求','再往前多做一步'].map((s,i)=><Paper key={s} style={{left:112+i*573,top:402,width:537,height:330,...stick(f,30+i*10,i%2?2:-2)}} pad={34}><div style={{fontSize:43,fontWeight:700,color:C.cyan}}>{s}</div><div style={{fontSize:36,lineHeight:1.6,marginTop:60}}>知道下一步<br/>該怎麼處理</div></Paper>)}
 </div>}
 {f>=235&&<div style={{position:'absolute',inset:0,transform:`translateY(${(1-q)*1080}px)`}}>
 <Title x={110} y={162} size={111}>從做得出來，</Title>
 <DoneMarker f={f} at={253}/>
 <Arrow f={f} at={261} d="M195 549 Q510 532 845 549 Q1026 560 1195 536"/>
 <Arrow f={f} at={272} color={C.white} d="M92 168 H68 V275 H92"/>
 <Arrow f={f} at={288} color={C.white} d="M112 680 V656 H1080 V787 H112 V764"/>
 <Arrow f={f} at={315} d="M1020 736 Q1125 875 620 863 L647 847 M620 863 L647 880"/>
 <Samuel x={1280} y={295} w={460} f={f} at={253}/>
 <div style={{position:'absolute',left:124,top:573,fontSize:48,fontWeight:700,...show(f,270)}}>從 Vibe Coding 到代理工程</div>
 <div style={{position:'absolute',left:130,top:696,fontSize:39,color:C.gray,...show(f,295)}}>帶著你一直想做的那個網站</div>
 <Badge x={133} y={808} f={f} at={322} fill={C.white}>一起從第一個作品開始 ↗</Badge>
 </div>}
 </>;
};
