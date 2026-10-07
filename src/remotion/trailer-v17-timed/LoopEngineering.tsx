import React from 'react';
import {MemeReaction} from './MemeReaction';
import {useSceneFrame,localBeat} from './sceneTiming';
import {Img,staticFile,Sequence,useCurrentFrame} from 'remotion';
import {Background,SceneLabel,Title,C,Paper,Arrow,mono,show,stick,p,easeInOut,ease} from './design';
import {Kinetic} from './Kinetic';
import {LoopCore} from './AgentLoop';
const evolution=[['PROMPT','說清楚任務'],['CONTEXT','補齊背景資料'],['HARNESS','工具、規則與檢查'],['LOOP','改完、測試、修正']];
const setup=[['目標','新增預設時間'],['完成條件','五題逐一通過'],['邊界／輪數','指定檔案／最多 5 輪'],['停止條件','超出權限，先問'],['先報計畫','核對順序再動手']];
export const AgentLoop:React.FC=()=>{
 const f=useSceneFrame('LoopEngineering',18),q=easeInOut(p(f,144,22));
 return <><Background/><SceneLabel n="06" name="LOOP ENGINEERING / CONFIGURE → RUN → VERIFY"/>
 {f<168&&<div style={{position:'absolute',inset:0,transform:'translateY('+(-q*1060)+'px)'}}>
 <Title x={144} y={165} size={106} color={C.cyan} style={show(f,5)}>LOOP ENGINEERING</Title>
 <Paper style={{left:200,top:380,width:1520,height:310,...stick(f,18,0)}} pad={42}><div style={{fontSize:68,fontWeight:700}}>「幫我把這個功能做好」</div><div style={{fontSize:40,color:C.cyan,marginTop:54,...show(f,40)}}>目標、完成條件、測試、修正、停止條件</div></Paper>

 </div>}
 {f>=144&&f<358&&<div style={{position:'absolute',inset:0,transform:'translateY('+((1-q)*1060)+'px)'}}>
 <Kinetic f={f} at={[152,191,230,269,308]} words={['目標是什麼','怎樣才算完成','要怎麼測試','失敗之後怎麼修','什麼時候應該停']} notes={['先說清楚要做的事','完成條件，要能確認','實際操作，檢查結果','找到原因，再跑一輪','訂好邊界與停止條件']} tag="開跑前，把任務講清楚"/>
 </div>}
 <Sequence from={localBeat('LoopEngineering',340,18)} durationInFrames={localBeat('LoopEngineering',126,18)}><div style={{position:"absolute",inset:0,clipPath:"inset(0 "+((1-easeInOut(p(f,340,18)))*100)+"% 0 0)"}}><LoopCore/></div></Sequence>
 {f>=450&&<div style={{position:'absolute',inset:0,background:C.bg,clipPath:'inset('+((1-easeInOut(p(f,450,16)))*100)+'% 0 0 0)'}}>
 <Title x={104} y={165} size={90}>這個 Loop，還是由你來設計</Title>
 {[['開跑前','確認計畫與邊界'],['卡住／超出邊界','喊停、縮小範圍']].map(([a,b],i)=><Paper key={a} style={{left:112,top:374+i*215,width:1000,height:185,...stick(f,456+i*6)}} pad={30}><div style={{fontSize:41,fontWeight:700,color:C.cyan}}>{a}</div><div style={{fontSize:43,lineHeight:1.5,marginTop:18}}>{b}</div></Paper>)}
 <div style={{position:'absolute',left:1240,top:295,fontSize:31,color:C.cyan,...show(f,467)}}>回報全過時，親自點一次確認</div>
 <MemeReaction src="assets/meme-cat-v11.png" f={f} at={472} until={540} x={1240} y={365} w={550} h={445} caption="你確定？"/>
 <div style={{position:'absolute',left:152,top:830,fontFamily:mono,fontSize:30,color:C.gray}}>到達輪數上限，也要停下來回報</div>
 </div>}
 </>;
};
