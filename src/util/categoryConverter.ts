export type SlugCategory = 'daily' | 'tip' | 'trade' | 'hot';
export type UiCategory = '일상' | '꿀팁' | '나눔 · 거래' | 'HOT';
export type ApiCategory = '일상' | '꿀팁' | '나눔거래';

// UI ↔ API 변환 (HOT 없음)
export const uiToApi: Record<Exclude<UiCategory, 'HOT'>, ApiCategory> = {
  일상: '일상',
  꿀팁: '꿀팁',
  '나눔 · 거래': '나눔거래',
};

// slug ↔ UI 변환
export const slugToUi: Record<SlugCategory, UiCategory> = {
  daily: '일상',
  tip: '꿀팁',
  trade: '나눔 · 거래',
  hot: 'HOT',
};

export const uiToSlug: Record<
  Exclude<UiCategory, 'HOT'>,
  Exclude<SlugCategory, 'hot'>
> = {
  일상: 'daily',
  꿀팁: 'tip',
  '나눔 · 거래': 'trade',
};
