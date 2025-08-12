import {getRecommendedPerformances} from '@/api/performanceApi';
import {useQuery} from '@tanstack/react-query';

export const useRecommendedPlays = (size: number = 10) => {
  return useQuery({
    queryKey: ['recommendedPlays', size],
    queryFn: () => getRecommendedPerformances(size),
  });
};
