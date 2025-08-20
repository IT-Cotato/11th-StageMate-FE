export const PERFORMANCE_TYPES = ['MUSICAL', 'PLAY', 'ETC'] as const;
export type PerformanceType = (typeof PERFORMANCE_TYPES)[number];

export const PERFORMANCE_TYPE_LABEL: Record<PerformanceType, string> = {
  MUSICAL: '뮤지컬',
  PLAY: '연극',
  ETC: '기타',
};

export const normalizePerformanceType = (raw: string): PerformanceType => {
  const t = raw?.trim().toUpperCase();
  if (t === 'MUSICAL' || t === 'PLAY') return t;
  return 'ETC';
};
