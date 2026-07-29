import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { references } from '../data/references';

export function Citation({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = references[id];

  if (!ref) return null;

  return (
    <span 
      className="relative inline-flex items-center ml-1 align-baseline cursor-pointer group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        window.open(ref.url, '_blank', 'noopener noreferrer');
      }}
    >
      <span className="inline-flex items-center gap-1 text-sky-400 bg-sky-400/10 hover:bg-sky-400/20 px-1.5 py-0.5 rounded text-xs font-mono transition-colors">
        <BookOpen size={12} />
      </span>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-slate-200 shadow-xl rounded-lg border border-slate-700 text-sm pointer-events-none"
          >
            <div className="font-semibold text-sky-300 text-xs tracking-wider mb-1 uppercase">{ref.source}</div>
            <div className="font-medium leading-tight">{ref.title}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
