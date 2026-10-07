import {useCurrentFrame} from 'remotion';
import {scenes} from './timeline';
import {voiceMap} from './voiceMap';
export const durationOf=(name:string)=>scenes.find(s=>s.name===name)!.duration;
export const interpolate=(v:number,points:number[][])=>{for(let i=1;i<points.length;i++){if(v<=points[i][0]){const [x,a]=points[i-1],[y,b]=points[i];return a+(b-a)*Math.max(0,(v-x)/(y-x));}}return points[points.length-1][1];};
export const sceneFrameAt=(name:string,frame:number)=>interpolate(frame,voiceMap[name]);
export const useSceneFrame=(name:string,seconds:number)=>sceneFrameAt(name,useCurrentFrame());
export const localBeat=(name:string,canonicalFrames:number,seconds:number)=>Math.round(interpolate(canonicalFrames,voiceMap[name].map(([a,b])=>[b,a])));
