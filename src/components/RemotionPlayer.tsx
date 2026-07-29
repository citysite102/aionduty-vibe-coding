import { Player } from '@remotion/player';
import React from 'react';

export function RemotionPlayer({ 
  component, 
  durationInFrames, 
  fps = 30, 
  compositionWidth = 1920, 
  compositionHeight = 1080,
  autoPlay = true
}: { 
  component: React.FC; 
  durationInFrames: number; 
  fps?: number; 
  compositionWidth?: number; 
  compositionHeight?: number;
  autoPlay?: boolean;
}) {
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative group bg-black/50 backdrop-blur-sm">
      <Player
        component={component}
        durationInFrames={durationInFrames}
        fps={fps}
        compositionWidth={compositionWidth}
        compositionHeight={compositionHeight}
        style={{
          width: '100%',
          height: '100%',
        }}
        controls
        autoPlay={autoPlay}
        loop
      />
      <div className="absolute top-4 left-4 bg-black/60 text-sky-400 text-xs px-2 py-1 rounded font-mono border border-sky-400/20 opacity-0 group-hover:opacity-100 transition-opacity">
        Remotion Player
      </div>
    </div>
  )
}
