import {useCurrentFrame} from 'remotion';
import {scenes} from './timeline';
export const durationOf=(name:string)=>scenes.find(s=>s.name===name)!.duration;
export const useSceneFrame=(name:string,seconds:number)=>useCurrentFrame()*seconds*30/durationOf(name);
export const localBeat=(name:string,canonicalFrames:number,seconds:number)=>Math.round(canonicalFrames*durationOf(name)/(seconds*30));
