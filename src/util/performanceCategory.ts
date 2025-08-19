const performanceGenreMap: Record<string, Record<string, string>> = {
  뮤지컬: {
    라이선스: 'LICENSED_MUSICAL',
    '오리지널/내한': 'ORIGINAL_AND_TOURING_MUSICAL',
    창작: 'CREATIVE_MUSICAL',
    넌버벌: 'NONVERBAL_PERFORMANCE',
    '아동/가족': 'FAMILY_MUSICAL',
  },
  연극: {
    리미티드런: 'LIMITED_RUN',
    스테디셀러: 'STEADY_SELLER',
    '아동/가족': 'FAMILY_PLAY',
  },
};

export function mapCategoryNameToPerformanceGenre(
  mainCategory: string,
  subCategory: string | null | undefined
): string | undefined {
  if (!subCategory) return undefined;

  const genreMap = performanceGenreMap[mainCategory];
  if (!genreMap) return undefined;

  return genreMap[subCategory] ?? undefined;
}

export const performanceGenreSearchMap: Record<string, string> = {
  '오리지널/내한 뮤지컬': 'ORIGINAL_AND_TOURING_MUSICAL',
  '창작 뮤지컬': 'CREATIVE_MUSICAL',
  '라이선스 뮤지컬': 'LICENSED_MUSICAL',
  '넌버벌 퍼포먼스': 'NONVERBAL_PERFORMANCE',
  '아동/가족 뮤지컬': 'FAMILY_MUSICAL',
  '리미티드 런': 'LIMITED_RUN',
  스테디셀러: 'STEADY_SELLER',
  '아동/가족 연극': 'FAMILY_PLAY',
};
