export const CATEGORY_MAP = {
  tip: '꿀팁',
  daily: '일상',
  share: '나눔 · 거래',
  hot: 'HOT',
} as const;

export type CategoryKey = keyof typeof CATEGORY_MAP; // 'tip' | 'daily' | ...
export type CategoryLabel = (typeof CATEGORY_MAP)[CategoryKey]; // '꿀팁' | '일상' | ...
