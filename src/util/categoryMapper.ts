export const categoryMap: Record<string, string> = {
  daily: '일상',
  share: '나눔 · 거래',
  tip: '꿀팁',
  hot: 'HOT',
} as const;

export const reverseCategoryMap: Record<string, keyof typeof categoryMap> = {
  일상: 'daily',
  '나눔 · 거래': 'share',
  꿀팁: 'tip',
  HOT: 'hot',
};

export const getCategoryNameFromUrl = (slug: string): string => {
  return categoryMap[slug] ?? '일상';
};

export const getUrlFromCategoryName = (name: string): string => {
  return reverseCategoryMap[name] ?? 'daily';
};
export const categoryList = Object.values(categoryMap);
