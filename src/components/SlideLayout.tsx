import { motion } from 'motion/react';
import React, { createContext, useContext, useEffect, useMemo } from 'react';

export const SlideContext = createContext<{
  currentStep: number;
  registerStep: (index: number) => void;
}>({ currentStep: 0, registerStep: () => {} });

export function useSlide() {
  return useContext(SlideContext);
}

export function SlideLayout({
  title,
  subtitle,
  children,
  icon: Icon
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    if (document.body) {
      document.body.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.4, ease: "circOut" }}
      className="h-full w-full flex flex-col pt-12 pb-20 px-8 md:px-16 max-w-6xl mx-auto absolute inset-0"
    >
      <div className="mb-8 flex-shrink-0">
        {subtitle && <h3 className="text-sky-400 font-mono tracking-widest text-sm mb-2.5 uppercase flex items-center gap-2">{subtitle}</h3>}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-100 flex items-center gap-4">
          {Icon && <Icon aria-hidden="true" className="w-10 h-10 md:w-12 md:h-12 text-sky-400" />}
          {title}
        </h1>
      </div>
      {/* data-slide-scroll：AnimatedBlock 靠它往上找到真正的捲動容器，見該元件的捲動邏輯 */}
      <div ref={scrollRef} data-slide-scroll className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
}

export function AnimatedList({ children, className, startStepIndex }: { children: React.ReactNode; className?: string; startStepIndex?: number }) {
  return (
    <ul className={className}>
      {React.Children.toArray(children).map((child, i) => (
        <AnimatedBlock 
          key={i} 
          as="li" 
          stepIndex={startStepIndex !== undefined ? startStepIndex + i : undefined}
          delay={startStepIndex === undefined ? i * 0.1 : 0}
        >
          {child}
        </AnimatedBlock>
      ))}
    </ul>
  );
}

export function AnimatedBlock({ 
  children, 
  className, 
  delay = 0, 
  stepIndex,
  as: Component = "div" 
}: { 
  key?: React.Key;
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  stepIndex?: number;
  as?: React.ElementType | string;
}) {
  const { currentStep, registerStep } = useSlide();
  const elementRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    if (stepIndex !== undefined) {
      registerStep(stepIndex);
    }
  }, [stepIndex, registerStep]);

  const isVisible = stepIndex === undefined || currentStep >= stepIndex;

  // 這一塊剛亮起來時，把它整塊捲進可視範圍。
  // 判準是「有沒有被切到」，不是「看不看得到」：底部被切掉一半也要捲，
  // 否則講者按下一步之後，新出現的內容只露出上緣，下半截留在摺線下面。
  useEffect(() => {
    if (stepIndex === undefined || currentStep !== stepIndex) return;

    const timer = setTimeout(() => {
      const el = elementRef.current;
      if (!el) return;

      // 基準要拿真正的捲動容器，不是視窗。SlideLayout 的內容區上有標題、
      // 下有 pb-20，容器底緣比視窗底緣高一截，拿 innerHeight 量會以為還看得到。
      const box = el.closest('[data-slide-scroll]') as HTMLElement | null;
      if (!box) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      const MARGIN = 24; // 捲完不要讓內容貼齊容器邊緣
      const rect = el.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      let delta = 0;
      if (rect.height + MARGIN * 2 > boxRect.height) {
        // 這一塊比可視範圍還高，本來就塞不完，對齊頂端至少從頭讀得到
        delta = rect.top - MARGIN - boxRect.top;
      } else if (rect.bottom + MARGIN > boxRect.bottom) {
        delta = rect.bottom + MARGIN - boxRect.bottom;
      } else if (rect.top - MARGIN < boxRect.top) {
        delta = rect.top - MARGIN - boxRect.top;
      }

      if (Math.abs(delta) > 1) {
        box.scrollTo({ top: box.scrollTop + delta, behavior: 'smooth' });
      }
      // 等進場位移走完再量，否則 y: 20 → 0 還沒收完，會多捲那段距離
    }, delay * 1000 + 220);

    return () => clearTimeout(timer);
  }, [stepIndex, currentStep, delay]);
  
  const MotionComponent = useMemo(() => motion.create(Component as any), [Component]) as any;

  return (
    <MotionComponent
      ref={elementRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: isVisible ? delay : 0 }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
