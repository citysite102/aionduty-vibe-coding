import React from 'react';
import {MemeReaction} from './MemeReaction';
import {Img,staticFile} from 'remotion';
import {Typed,Background,SceneLabel,Title,C,Paper,Arrow,mono,Badge,Browser,show,stick,p,easeInOut,impact} from './design';
import {Kinetic} from './Kinetic';
import {Footage} from './Footage';
import {useSceneFrame,localBeat} from './sceneTiming';
export const Opening:React.FC=()=>{
 const f=useSceneFrame('Opening',13),turn=easeInOut(p(f,206,25));
 return <><Background/><SceneLabel n="01" name="MAKE A WEBSITE / THEN WHAT?"/>
 <div style={{position:'absolute',inset:0,transform:`translateY(${-turn*1080}px)`}}>
 <Title x={110} y={155} size={87} style={show(f,9)}>用 AI，網站畫面很快就出來</Title>
 <Paper style={{left:115,top:323,width:680,height:128,...stick(f,19,-2)}} pad={30}><div style={{fontSize:38}}><Typed text="幫我做一個介紹作品的網站" f={f} at={18} duration={30}/></div></Paper>
 <Browser x={875} y={324} w={895} h={516} f={f} at={55} r={2} url=""><div style={{height:403,marginTop:10}}><Footage clip="vessel" from={localBeat('Opening',55,13)}/></div></Browser>
 <Arrow f={f} at={71} d="M786 526 Q831 473 861 526 l-10 -23 m10 23 l-22 -7"/>
 <Title x={138} y={540} size={71} color={C.cyan} style={show(f,97)}>畫面，出來了</Title>
 <Badge x={137} y={732} f={f} at={143}>接著呢？</Badge>
 </div>
 {f>=206&&<div style={{position:'absolute',inset:0,transform:`translateY(${(1-turn)*1080}px)`}}>
 <Title x={105} y={156} size={97} color={C.red}>問題，從這裡開始</Title>
 {['功能壞了，要改哪裡？','資料存去哪裡？','改壞了，怎麼回去？'].map((s,i)=><Paper key={s} style={{left:130,top:353+i*148,width:1000,height:128,...stick(f,234+i*13)}} pad={26}><div style={{display:'flex',alignItems:'center',gap:30,height:'100%'}}><div style={{fontFamily:mono,fontSize:32,color:C.red,width:215,flexShrink:0}}>{['ERROR','DATABASE','GIT'][i]}</div><div style={{fontSize:42,fontWeight:700}}>{s}</div></div></Paper>)}
 <MemeReaction src="assets/meme-facepalm-v11.png" f={f} at={244} until={312} x={1250} y={306} w={530} h={500} caption="蛤？"/>
 <div style={{position:'absolute',left:142,top:823,color:C.red,fontFamily:mono,fontSize:31,...show(f,244)}}>× ReferenceError: tick is not defined</div>
 </div>}
 </>;
};
export const Problem:React.FC=()=>{
 const f=useSceneFrame('Problem',12),q=easeInOut(p(f,139,24));
 return <><Background/><SceneLabel n="02" name="STARTED ≠ FINISHED"/>
 <div style={{position:'absolute',inset:0,transform:`translateX(${-q*1940}px)`}}>
 <Title x={104} y={164} size={87}>做得出來，跟真的做完</Title>
 <Paper style={{left:118,top:381,width:768,height:390,...stick(f,8,-2)}} pad={35}><div style={{fontSize:59,fontWeight:700,color:C.cyan}}>做得出來</div><div style={{fontSize:42,lineHeight:1.8,marginTop:37}}>畫面出現了<br/>功能開始動了</div></Paper>
 <Paper style={{left:1028,top:381,width:768,height:390,...stick(f,33,2)}} pad={35}><div style={{fontSize:59,fontWeight:700}}>真的做完</div><div style={{fontSize:42,lineHeight:1.8,marginTop:37}}>遇到問題，知道怎麼處理<br/>有測試，也確認結果</div></Paper>
 <Title x={916} y={482} size={92} color={C.red} style={show(f,61)}>≠</Title>
 </div>
 {f>=139&&<div style={{position:'absolute',inset:0,transform:`translateX(${(1-q)*1940}px)`}}>
 <Kinetic f={f} at={[152,207,255,304]} words={['AI 做了什麼','問題在哪裡','下一步怎麼處理','怎麼確認完成']} notes={['先看懂它改了哪些地方','找到卡住的那一步','知道怎麼把事情接著做','親自確認結果']} tag="你需要知道，下一步怎麼走"/>
 </div>}
 </>;
};
