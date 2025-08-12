import {create} from 'zustand';
import type {PerformanceListResponse} from '@/types/performance';
import {mapCategoryNameToPerformanceGenre} from '@/util/performanceCategory';
import {getPerformanceList} from '@/api/performanceApi';

interface PerformanceState {
  mainCategory: '전체' | '뮤지컬' | '연극';
  subCategory: string | null;
  currentPage: number;
  performances: PerformanceListResponse['data']['list'];
  totalItemsCount: number;
  loading: boolean;

  // 캐시: key = `${mainCategory}_${subCategory}_${currentPage}`
  cache: Record<string, PerformanceListResponse['data']['list']>;
  totalCountCache: Record<string, number>;

  setMainCategory: (category: '전체' | '뮤지컬' | '연극') => void;
  setSubCategory: (category: string | null) => void;
  setCurrentPage: (page: number) => void;

  fetchPerformances: () => Promise<void>;
}

export const usePerformanceStore = create<PerformanceState>((set, get) => ({
  mainCategory: '전체',
  subCategory: null,
  currentPage: 1,
  performances: [],
  totalItemsCount: 0,
  loading: false,
  cache: {},
  totalCountCache: {},

  setMainCategory: (category) => {
    set({mainCategory: category, subCategory: null, currentPage: 1});
    get().fetchPerformances();
  },
  setSubCategory: (sub) => {
    set({subCategory: sub, currentPage: 1});
    get().fetchPerformances();
  },
  setCurrentPage: (page) => {
    set({currentPage: page});
    get().fetchPerformances();
  },

  fetchPerformances: async () => {
    set({loading: true});
    try {
      const {mainCategory, subCategory, currentPage, cache, totalCountCache} =
        get();

      const key = `${mainCategory}_${subCategory}_${currentPage}`;

      // 캐시 확인
      if (cache[key]) {
        set({
          performances: cache[key],
          totalItemsCount: totalCountCache[key] ?? 0,
          loading: false,
        });
        return;
      }

      const mapCategoryToType = (category: '전체' | '뮤지컬' | '연극') => {
        if (category === '뮤지컬') return 'MUSICAL';
        if (category === '연극') return 'PLAY';
        return undefined;
      };

      const performanceGenreCode = mapCategoryNameToPerformanceGenre(
        mainCategory,
        subCategory
      );

      const res = await getPerformanceList({
        size: 9,
        page: currentPage,
        performanceType: mapCategoryToType(mainCategory),
        performanceGenre: performanceGenreCode,
      });

      set((state) => ({
        performances: res.data.list,
        totalItemsCount: res.data.totalElements,
        loading: false,
        cache: {...state.cache, [key]: res.data.list},
        totalCountCache: {
          ...state.totalCountCache,
          [key]: res.data.totalElements,
        },
      }));
    } catch (error) {
      console.error(error);
      set({performances: [], totalItemsCount: 0, loading: false});
    }
  },
}));
