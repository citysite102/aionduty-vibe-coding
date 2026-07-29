import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { theme, fadeInMove } from './theme';

const Dial = ({ label, valueText, isRotating, progress, isAccent }: { label: string, valueText: string, isRotating: boolean, progress: number, isAccent: boolean }) => {
  const rotation = interpolate(progress, [0, 1], [-135, 135]);
  const color = isAccent ? theme.accent : theme.textMain;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 40, color }}>{label}</div>
      <div style={{ position: 'relative', width: 200, height: 200, borderRadius: '50%', border: `8px solid ${theme.textSub}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', transform: `rotate(${rotation}deg)` }}>
          <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', width: 16, height: 40, backgroundColor: color, borderRadius: 8 }} />
        </div>
        <div style={{ width: 40, height: 40, backgroundColor: theme.textSub, borderRadius: '50%' }} />
      </div>
      <div style={{ marginTop: 40, fontSize: 32, fontFamily: theme.fontMono, color: theme.textSub, opacity: isRotating ? 1 : 0.5, transition: 'opacity 0.2s' }}>
        {valueText}
      </div>
    </div>
  );
};

export const TwoDials: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleStyle = fadeInMove(frame, 0, 30);
  
  // Dials animation
  const dialsOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' });
  const dialsScale = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 20 } });

  // Rotate Left
  const leftDialProgress = spring({ frame: Math.max(0, frame - 120), fps, config: { damping: 30, stiffness: 60 } });
  const leftValueText = leftDialProgress < 0.3 ? '每步都問' : leftDialProgress < 0.7 ? '連網才問' : '完全不問';

  // Rotate Right 
  const rightDialProgress = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 30, stiffness: 60 } });
  const rightValueText = rightDialProgress < 0.3 ? '唯讀' : rightDialProgress < 0.7 ? '限制專案' : '全開 (容器)';

  // Quadrant Transition
  const quadTransition = spring({ frame: Math.max(0, frame - 300), fps, config: { damping: 20 } });
  
  // End Text
  const endTextOpacity = interpolate(frame, [390, 410], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ flex: 1, backgroundColor: theme.bg, color: theme.textMain, fontFamily: theme.fontSans, position: 'relative', overflow: 'hidden' }}>
      
      {/* 0-60 Title */}
      {frame < 330 && (
         <div style={{ position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)', fontSize: 48, fontWeight: 700, ...titleStyle, opacity: 1 - quadTransition }}>
           權限不是一個開關
         </div>
      )}

      {/* Dials (fade out during quadrant) */}
      <div style={{ 
        position: 'absolute', top: 300, left: '50%', transform: `translate(-50%, 0) scale(${dialsScale})`,
        display: 'flex', gap: 200, opacity: dialsOpacity * (1 - quadTransition)
      }}>
        <Dial label="監督 (Approval)" valueText={leftValueText} isRotating={frame >= 120 && frame < 210} progress={leftDialProgress} isAccent={frame >= 120 && frame < 210} />
        <Dial label="邊界 (Sandbox)" valueText={rightValueText} isRotating={frame >= 210 && frame < 300} progress={rightDialProgress} isAccent={frame >= 210 && frame < 300} />
      </div>

      {/* Quadrant */}
      {frame > 300 && (
        <div style={{ position: 'absolute', inset: 0, opacity: quadTransition, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <div style={{ position: 'relative', width: 800, height: 600 }}>
             {/* Axes */}
             <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 4, backgroundColor: theme.textSub, transform: 'translateX(-50%)' }} />
             <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 4, backgroundColor: theme.textSub, transform: 'translateY(-50%)' }} />
             
             {/* Labels */}
             <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', fontSize: 24, color: theme.textSub }}>監督嚴格</div>
             <div style={{ position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)', fontSize: 24, color: theme.accent, fontWeight: 'bold' }}>完全不問</div>
             <div style={{ position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)', fontSize: 24, color: theme.textSub }}>唯讀</div>
             <div style={{ position: 'absolute', right: -130, top: '50%', transform: 'translateY(-50%)', fontSize: 24, color: theme.accent, fontWeight: 'bold' }}>邊界全開</div>

             {/* Points */}
             {frame >= 320 && (
               <div style={{ position: 'absolute', left: 200, top: 150, ...fadeInMove(frame, 320, 15) }}>
                 <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: theme.textMain }} />
                 <div style={{ marginTop: 12, fontSize: 24, color: theme.textMain, width: 200 }}>探索陌生 Repo</div>
               </div>
             )}
             {frame >= 340 && (
               <div style={{ position: 'absolute', left: 500, top: 250, ...fadeInMove(frame, 340, 15) }}>
                 <div style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: theme.textMain }} />
                 <div style={{ marginTop: 12, fontSize: 24, color: theme.textMain, width: 200 }}>熟專案小改</div>
               </div>
             )}
             {frame >= 360 && (
               <div style={{ position: 'absolute', left: 600, bottom: 100, ...fadeInMove(frame, 360, 15) }}>
                 <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: theme.accent, boxShadow: `0 0 20px ${theme.accent}` }} />
                 <div style={{ marginTop: 12, fontSize: 28, fontWeight: 'bold', color: theme.accent, width: 300 }}>無人值守 Loop</div>
               </div>
             )}
          </div>
        </div>
      )}

      {/* End Text */}
      {frame >= 390 && (
         <div style={{ position: 'absolute', inset: 0, backgroundColor: theme.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: endTextOpacity }}>
            <div style={{ fontSize: 64, fontWeight: 700, color: theme.textMain }}>
              <span style={{ color: theme.accent }}>監督鬆</span>，不等於有邊界
            </div>
         </div>
      )}

    </div>
  );
};
