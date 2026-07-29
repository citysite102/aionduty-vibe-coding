import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from 'remotion';
import { Bot, User, RefreshCw, Settings, Database, GitBranch, ArrowRight, Cpu, Clock, Zap } from 'lucide-react';
import { theme, fadeInMove } from './theme';

export const OvernightLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Part 1: Manual Prompting (0 - 200)
  const manualOpacity = interpolate(frame, [180, 200], [1, 0], { extrapolateRight: 'clamp' });
  const p1_human = fadeInMove(frame, 0, 20);
  const p1_arrow1 = fadeInMove(frame, 30, 20);
  const p1_ai = fadeInMove(frame, 60, 20);
  const p1_arrow2 = fadeInMove(frame, 90, 20);
  
  // Simulated typing indicator for manual
  const typingX = spring({ frame: (frame % 60), fps, config: { damping: 10 } });

  // Part 2: Loop Engineering (200 - 420)
  const loopOpacity = interpolate(frame, [200, 220], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const p2_human = fadeInMove(frame, 220, 20);
  const p2_system = fadeInMove(frame, 250, 20);
  
  const systemSpring = spring({ frame: Math.max(0, frame - 250), fps, config: { damping: 15 } });
  
  // Auto-prompting animation (fast loop)
  const autoLoopOpacity = interpolate(frame, [300, 320], [0, 1], { extrapolateLeft: 'clamp' });
  const fastSpin = (frame - 300) * 15;

  // Compute & Time Enhancements (320 - 420)
  const computeOpacity = interpolate(frame, [320, 340], [0, 1], { extrapolateLeft: 'clamp' });
  const computeScale = spring({ frame: Math.max(0, frame - 320), fps, config: { damping: 15 } });

  // End Text (420 - 480)
  const endTextOpacity = interpolate(frame, [420, 440], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const contentFadeOut = interpolate(frame, [420, 440], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ flex: 1, backgroundColor: theme.bg, color: theme.textMain, fontFamily: theme.fontSans, position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ opacity: contentFadeOut, width: '100%', height: '100%', position: 'relative' }}>
          
        {/* Part 1: Manual Prompting */}
        {frame < 210 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: manualOpacity }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: theme.textSub, marginBottom: 80 }}>過去：人類手動下指令</div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...p1_human }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', backgroundColor: theme.textSub, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <User size={64} color={theme.bg} />
                </div>
                <span style={{ marginTop: 16, fontSize: 24, fontWeight: 700 }}>人類 (執行者)</span>
              </div>

              <div style={{ position: 'relative', ...p1_arrow1 }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: theme.accent, marginBottom: 8, textAlign: 'center' }}>打字 Prompt</div>
                <ArrowRight size={64} color={theme.accent} />
                {frame > 30 && frame < 90 && (
                   <div style={{ position: 'absolute', bottom: -20, left: 20 + typingX * 20, width: 8, height: 8, backgroundColor: theme.accent, borderRadius: '50%' }} />
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...p1_ai }}>
                <div style={{ width: 120, height: 120, borderRadius: '50%', backgroundColor: theme.bg, border: `4px solid ${theme.accent}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Bot size={64} color={theme.accent} />
                </div>
                <span style={{ marginTop: 16, fontSize: 24, fontWeight: 700, color: theme.accent }}>AI 模型</span>
              </div>
            </div>
            
            {frame >= 90 && (
              <div style={{ marginTop: 60, fontSize: 24, color: theme.textSub, backgroundColor: `${theme.textSub}22`, padding: '12px 24px', borderRadius: 8, ...p1_arrow2 }}>
                瓶頸：人類的思考、打字與睡眠時間限制了推進速度。
              </div>
            )}
          </div>
        )}

        {/* Part 2: Loop Engineering */}
        {frame >= 180 && frame < 440 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: loopOpacity }}>
             <div style={{ fontSize: 40, fontWeight: 700, color: theme.accent, marginBottom: 80 }}>現在：Loop Engineering</div>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
                {/* Human -> System Designer */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...p2_human }}>
                  <div style={{ width: 100, height: 100, borderRadius: '50%', backgroundColor: theme.bg, border: `4px solid ${theme.textMain}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <User size={48} color={theme.textMain} />
                  </div>
                  <span style={{ marginTop: 16, fontSize: 24, fontWeight: 700 }}>人類 (設計者)</span>
                  <div style={{ marginTop: 8, fontSize: 18, color: theme.textSub }}>定義目標與邊界</div>
                </div>

                {/* The Loop System */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...p2_system, transform: `scale(${systemSpring})` }}>
                  <div style={{ position: 'relative', width: 280, height: 280, backgroundColor: `${theme.accent}11`, border: `2px dashed ${theme.accent}`, borderRadius: 32, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    
                    <div style={{ position: 'absolute', top: -20, left: 40, backgroundColor: theme.bg, padding: '4px 12px', fontSize: 16, fontWeight: 700, color: theme.accent, border: `1px solid ${theme.accent}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Settings size={16} /> 排程 & 檢驗
                    </div>
                    <div style={{ position: 'absolute', bottom: -20, right: 40, backgroundColor: theme.bg, padding: '4px 12px', fontSize: 16, fontWeight: 700, color: '#f59e0b', border: `1px solid #f59e0b`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Database size={16} /> 記憶狀態
                    </div>

                    <div style={{ width: 140, height: 140, borderRadius: '50%', backgroundColor: theme.accent, display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 40px ${theme.accent}66`, zIndex: 10 }}>
                       <RefreshCw size={64} color={theme.bg} />
                    </div>
                    
                    {/* Fast Auto Loop */}
                    <div style={{ position: 'absolute', inset: -20, border: `4px solid ${theme.accent}44`, borderRadius: '50%', borderTopColor: theme.accent, opacity: autoLoopOpacity, transform: `rotate(${fastSpin}deg)`, zIndex: 5 }} />
                  </div>
                  
                  <span style={{ marginTop: 30, fontSize: 24, fontWeight: 700, color: theme.accent }}>會「自動 Prompt」的控制循環</span>
                </div>

                {/* Target & Compute scaling */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...p2_system }}>
                  <div style={{ position: 'relative', width: 100, height: 100, borderRadius: '24%', backgroundColor: theme.bg, border: `4px solid ${theme.textSub}`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Bot size={48} color={theme.textSub} />
                    
                    {/* Test-time compute visual */}
                    {frame >= 320 && (
                      <div style={{ position: 'absolute', top: -30, right: -30, opacity: computeOpacity, transform: `scale(${computeScale})`, backgroundColor: '#10b981', padding: '4px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4, color: theme.bg, fontWeight: 900, boxShadow: '0 10px 20px rgba(16,185,129,0.3)' }}>
                        <Cpu size={16} /> 算力擴增
                      </div>
                    )}
                  </div>
                  <span style={{ marginTop: 16, fontSize: 24, fontWeight: 700, color: theme.textSub }}>AI 模型</span>
                </div>
             </div>

             {/* Animated Arrows for Auto Loop & Compute Text */}
             {frame >= 300 && (
               <div style={{ position: 'absolute', top: 510, left: '50%', transform: 'translateX(-50%)', opacity: autoLoopOpacity, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', gap: 60 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: theme.accent, fontWeight: 700, fontSize: 18 }}>
                       高速探索與驗證 <RefreshCw size={20} className="animate-spin" style={{ animationDuration: '2s' }} />
                    </div>
                    
                    {frame >= 330 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981', fontWeight: 700, fontSize: 18, opacity: computeOpacity }}>
                         長時思考 (Test-Time Compute) <Clock size={20} />
                      </div>
                    )}
                  </div>
               </div>
             )}
          </div>
        )}

      </div>

      {/* End Text */}
      {frame >= 420 && (
         <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', opacity: endTextOpacity }}>
            <div style={{ fontSize: 56, fontWeight: 700, color: theme.textMain, textAlign: 'center', lineHeight: 1.4 }}>
              槓桿點已經從<span style={{ color: theme.textSub, textDecoration: 'line-through', margin: '0 12px' }}>寫好單一 Prompt</span><br/>
              轉變為 <span style={{ color: theme.accent, borderBottom: `6px solid ${theme.accent}`, paddingBottom: 8 }}>設計長期調度與長時思考的系統</span>
            </div>
         </div>
      )}

    </div>
  );
};
