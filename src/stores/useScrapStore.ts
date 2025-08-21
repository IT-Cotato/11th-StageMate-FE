import {create} from 'zustand';
export type ItemType = 'community' | 'performanceSchedule';

interface ScrapState {
  scrappedItems: Set<number>;
  likedItems: Set<number>;
  counts: Map<
    number,
    {likeCount: number; scrapCount: number; commentCount: number}
  >;
  isInitialized: boolean;
  setScrapped: (id: number, type: ItemType, isScraped: boolean) => void;
  setLiked: (id: number, type: ItemType, isLiked: boolean) => void;
  toggleScrap: (id: number, type: ItemType) => void;
  toggleLike: (id: number, type: ItemType) => void;
  isScraped: (id: number, type: ItemType) => boolean;
  isLiked: (id: number, type: ItemType) => boolean;
  getCounts: (
    id: number,
    type: ItemType
  ) => {likeCount: number; scrapCount: number; commentCount: number};
  setCounts: (
    id: number,
    type: ItemType,
    counts: {likeCount: number; scrapCount: number; commentCount: number}
  ) => void;
  initializeFromServer: (
    items: Array<{
      id: number;
      type: ItemType;
      isScraped: boolean;
      isLiked?: boolean;
      likeCount?: number;
      scrapCount?: number;
      commentCount?: number; // commentCount 옵셔널로 추가
    }>,
    force?: boolean
  ) => void;
}

export const useScrapStore = create<ScrapState>((set, get) => ({
  scrappedItems: new Set<number>(),
  likedItems: new Set<number>(),
  counts: new Map<
    number,
    {likeCount: number; scrapCount: number; commentCount: number}
  >(),
  isInitialized: false,

  setScrapped: (id, _type, isScraped) =>
    set((state) => {
      const newSet = new Set(state.scrappedItems);
      if (isScraped) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return {scrappedItems: newSet};
    }),

  setLiked: (id, _type, isLiked) =>
    set((state) => {
      const newSet = new Set(state.likedItems);
      if (isLiked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return {likedItems: newSet};
    }),

  toggleScrap: (id) =>
    set((state) => {
      const newSet = new Set(state.scrappedItems);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return {scrappedItems: newSet};
    }),

  toggleLike: (id) =>
    set((state) => {
      const newSet = new Set(state.likedItems);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return {likedItems: newSet};
    }),

  isScraped: (id) => get().scrappedItems.has(id),

  isLiked: (id) => get().likedItems.has(id),

  getCounts: (id) =>
    get().counts.get(id) || {likeCount: 0, scrapCount: 0, commentCount: 0},

  setCounts: (id, _type, counts) =>
    set((state) => {
      const newCounts = new Map(state.counts);
      newCounts.set(id, counts);
      return {counts: newCounts};
    }),

  initializeFromServer: (items, force = false) =>
    set((state) => {
      if (state.isInitialized && !force) {
        const newScrappedSet = new Set(state.scrappedItems);
        const newLikedSet = new Set(state.likedItems);
        const newCounts = new Map(state.counts);

        items.forEach((item) => {
          if (item.isScraped) newScrappedSet.add(item.id);
          if (item.isLiked) newLikedSet.add(item.id);

          if (
            item.likeCount !== undefined &&
            item.scrapCount !== undefined &&
            item.commentCount !== undefined
          ) {
            newCounts.set(item.id, {
              likeCount: item.likeCount,
              scrapCount: item.scrapCount,
              commentCount: item.commentCount,
            });
          }
        });
        return {
          scrappedItems: newScrappedSet,
          likedItems: newLikedSet,
          counts: newCounts,
        };
      }

      const newScrappedSet = new Set<number>();
      const newLikedSet = new Set<number>();
      const newCounts = new Map<
        number,
        {likeCount: number; scrapCount: number; commentCount: number}
      >();

      items.forEach((item) => {
        if (item.isScraped) newScrappedSet.add(item.id);
        if (item.isLiked) newLikedSet.add(item.id);

        if (
          item.likeCount !== undefined &&
          item.scrapCount !== undefined &&
          item.commentCount !== undefined
        ) {
          newCounts.set(item.id, {
            likeCount: item.likeCount,
            scrapCount: item.scrapCount,
            commentCount: item.commentCount,
          });
        }
      });
      return {
        scrappedItems: newScrappedSet,
        likedItems: newLikedSet,
        counts: newCounts,
        isInitialized: true,
      };
    }),
}));
