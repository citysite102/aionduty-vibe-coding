import type { ReactNode } from 'react';

/**
 * 句子裡真正該記住的那半句。
 *
 * 這一段是連續幾十頁的大字頁，整句同一個顏色的時候，
 * 掃過去不知道該記哪裡，只能從頭讀到尾，讀幾頁就累了。
 * A-1 說主色要給「當下要強調的那一個元素」，這個元件就是那個元素。
 *
 * 一頁只用一次。用第二次就等於沒用。
 */
export function Key({ children }: { children: ReactNode }) {
  return <strong className="text-sky-300 font-bold">{children}</strong>;
}
