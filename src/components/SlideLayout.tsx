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
          {Icon && <Icon className="w-10 h-10 md:w-12 md:h-12 text-sky-400" />}
          {title}
        </h1>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
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

  useEffect(() => {
    if (isVisible && stepIndex !== undefined && currentStep === stepIndex) {
      const timer = setTimeout(() => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          const viewHeight = window.innerHeight || document.documentElement.clientHeight;
          
          // Check if any significant portion of the element is already in the viewport
          const isTopVisible = rect.top >= 0 && rect.top < (viewHeight - 40);
          const isBottomVisible = rect.bottom > 40 && rect.bottom <= viewHeight;
          const isOccupying = rect.top < 0 && rect.bottom > viewHeight;
          const inViewport = isTopVisible || isBottomVisible || isOccupying;

          if (!inViewport) {
            elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }, 120); // short delay to let the animation start and layout to update
      return () => clearTimeout(timer);
    }
  }, [isVisible, stepIndex, currentStep]);
  
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

