/**
 * 「驗不出來的字」清單。
 *
 * 這是字面比對，不是理解：它只查得到這幾個詞，查不到「這句話的意思很模糊」。
 * 所以工具的畫面上要寫清楚這件事，不要讓學員以為沒被標記就等於寫得夠好。
 *
 * 詞是從課程裡實際出現過的壞例子來的，不是憑印象列的：
 * 「畫面要好看，風格保持一致」「操作要順暢」「要優雅」「整體看起來沒問題」。
 */
export const VAGUE_WORDS = [
  '好看',
  '美觀',
  '漂亮',
  '優雅',
  '順暢',
  '流暢',
  '直覺',
  '好用',
  '易用',
  '乾淨',
  '簡潔',
  '現代',
  '有質感',
  '專業',
  '完善',
  '完整',
  '合理',
  '適當',
  '正常',
  '沒問題',
  '不要太',
  '盡量',
  '儘量',
  '大概',
  '差不多',
  '快一點',
  '穩定',
  '高效',
  '最佳化',
  '優化',
];

/** 看得出有沒有做到的那種字。有這些，通常代表句子指得到一個可以觀察的事實。 */
export const CHECKABLE_HINTS = [
  '顯示',
  '出現',
  '看得到',
  '看不到',
  '等於',
  '不超過',
  '至少',
  '最多',
  '沒有',
  '包含',
  '每一',
  '全部',
  '點下去',
  '按下',
  '回到',
  '跳到',
  '存成',
  '欄位',
  '秒',
  '分鐘',
  '行',
  '筆',
  '個',
];

export type Verdict = {
  text: string;
  hits: string[];
  checkable: boolean;
  hasNumber: boolean;
};

export function judge(sentence: string): Verdict {
  const text = sentence.trim();
  return {
    text,
    hits: VAGUE_WORDS.filter((w) => text.includes(w)),
    checkable: CHECKABLE_HINTS.some((w) => text.includes(w)),
    hasNumber: /\d/.test(text),
  };
}

/** 把一段文字切成句子，中英文標點都切 */
export function toSentences(v: string): string[] {
  return v
    .split(/[\n。；;]/)
    .map((s) => s.replace(/^[-・·•\d.、\s]+/, '').trim())
    .filter((s) => s.length > 1);
}
