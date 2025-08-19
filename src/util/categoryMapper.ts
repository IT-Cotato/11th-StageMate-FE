// src/util/categoryMapper.ts

// URL ↔ UI 매핑
export const categoryMap = {
  daily: '일상',
  share: '나눔 · 거래',
  tip: '꿀팁',
  hot: 'HOT',
} as const;

export type SlugCategory = keyof typeof categoryMap; // 'daily' | 'share' | 'tip' | 'hot'
export type UiCategory = (typeof categoryMap)[SlugCategory]; // '일상' | '나눔 · 거래' | '꿀팁' | 'HOT'
export type WriteableUiCategory = Exclude<UiCategory, 'HOT'>;
export type ApiCategory = '일상' | '꿀팁' | '나눔거래';

// UI → URL (엄격 타입)
export const reverseCategoryMap: Record<UiCategory, SlugCategory> = {
  일상: 'daily',
  '나눔 · 거래': 'share',
  꿀팁: 'tip',
  HOT: 'hot',
} as const;

// 안전한 키 체크를 위한 헬퍼
function hasKey<O extends object, K extends PropertyKey>(
  obj: O,
  key: K
): key is K & keyof O {
  return key in obj;
}

export const isWriteableUiCategory = (
  name: string
): name is WriteableUiCategory =>
  name === '일상' || name === '꿀팁' || name === '나눔 · 거래';

export const isHotSlug = (slug: string): slug is 'hot' => slug === 'hot';
export const isHotUi = (ui: string): ui is 'HOT' => ui === 'HOT';

// UI ↔ API 매핑 (양방향)
export const uiToApiCategory: Record<WriteableUiCategory, ApiCategory> = {
  일상: '일상',
  꿀팁: '꿀팁',
  '나눔 · 거래': '나눔거래',
} as const;

export const apiToUiCategory: Record<ApiCategory, WriteableUiCategory> = {
  일상: '일상',
  꿀팁: '꿀팁',
  나눔거래: '나눔 · 거래',
} as const;

// URL → UI
export const getCategoryNameFromUrl = (slug: string): UiCategory =>
  hasKey(categoryMap, slug) ? categoryMap[slug] : '일상';

// UI → URL (HOT 포함)
export const getUrlFromCategoryName = (name: UiCategory): SlugCategory =>
  reverseCategoryMap[name] ?? 'daily';

// UI → URL (작성 전용: HOT 제외)
export const getSlugFromUi = (
  name: WriteableUiCategory
): Exclude<SlugCategory, 'hot'> =>
  reverseCategoryMap[name] as Exclude<SlugCategory, 'hot'>;

// API → UI
export const getUiFromApi = (api: ApiCategory): WriteableUiCategory =>
  apiToUiCategory[api];

// API → URL (작성 전용으로 쓰는 경우가 많음)
export const getSlugFromApi = (
  api: ApiCategory
): Exclude<SlugCategory, 'hot'> => getSlugFromUi(getUiFromApi(api));

// 리스트용 전체/작성용 카테고리
export const categoryList: UiCategory[] = Object.values(categoryMap);
export const WRITEABLE_UI_CATEGORIES: WriteableUiCategory[] = [
  '일상',
  '나눔 · 거래',
  '꿀팁',
];
