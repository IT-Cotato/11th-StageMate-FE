import {
  getLatestMagazines,
  getMagazineDetail,
  getMagazines,
  getRecommendMagazines,
  postLikeMagazines,
  postScrapMagazines,
} from '@/api/magazineApi';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useLatestMagazines = (size: number = 4) => {
  return useQuery({
    queryKey: ['latestMagazines', size],
    queryFn: () => getLatestMagazines(size),
  });
};

export const useMagazines = (page: number = 1, size: number = 6) => {
  return useQuery({
    queryKey: ['magazines', page, size],
    queryFn: () => getMagazines(page, size),
    placeholderData: (prev) => prev,
  });
};
export const useMagazineDetail = (magazineId: number) => {
  return useQuery({
    queryKey: ['magazineDetail', magazineId] as const,
    queryFn: () => getMagazineDetail(magazineId),
    enabled: !!magazineId,
  });
};
export const useRecommendMagazines = () => {
  return useQuery({
    queryKey: ['recommendMagazines'],
    queryFn: getRecommendMagazines,
    staleTime: 1000 * 60 * 5,
  });
};

export const useMagazineScrap = (magazineId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postScrapMagazines(magazineId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['magazineDetail', magazineId],
      });
    },
  });
};

export const useMagazineLike = (magazineId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postLikeMagazines(magazineId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['magazineDetail', magazineId],
      });
    },
  });
};
