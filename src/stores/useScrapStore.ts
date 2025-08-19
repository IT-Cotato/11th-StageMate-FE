import {create} from 'zustand';

interface ScrapState {
  scrappedItems: Set<string>;
  isInitialized: boolean;
  setScrapped: (id: string, isScraped: boolean) => void;
  toggleScrap: (id: string) => void;
  isScraped: (id: string) => boolean;
  initializeFromServer: (items: Array<{id: string; isScraped: boolean}>, force?: boolean) => void;
}

export const useScrapStore = create<ScrapState>((set, get) => ({
  scrappedItems: new Set<string>(),
  isInitialized: false,
  
  setScrapped: (id: string, isScraped: boolean) =>
    set((state) => {
      const newSet = new Set(state.scrappedItems);
      if (isScraped) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return {scrappedItems: newSet};
    }),
    
  toggleScrap: (id: string) =>
    set((state) => {
      const newSet = new Set(state.scrappedItems);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return {scrappedItems: newSet};
    }),
    
  isScraped: (id: string) => get().scrappedItems.has(id),
  
  initializeFromServer: (items: Array<{id: string; isScraped: boolean}>, force = false) =>
    set((state) => {
      // 이미 초기화되었고 force가 아니면 병합
      if (state.isInitialized && !force) {
        const newSet = new Set(state.scrappedItems);
        items.forEach(item => {
          if (item.isScraped) {
            newSet.add(item.id);
          }
        });
        return {scrappedItems: newSet};
      }
      
      // 처음 초기화이거나 force면 서버 데이터로 완전 대체
      const newSet = new Set<string>();
      items.forEach(item => {
        if (item.isScraped) {
          newSet.add(item.id);
        }
      });
      return {scrappedItems: newSet, isInitialized: true};
    }),
}));