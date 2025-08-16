import {
  deleteArchive,
  getArchive,
  getArchiveDetail,
  getArchiveTopRating,
  postCreateArchive,
  putUpdateArchive,
} from '@/api/archiveApi';
import {useArchiveStore} from '@/stores/useArchiveStore';
import {useCalendarStore} from '@/stores/useCalendarStore';
import type {ArchiveCreateRequest, ArchiveRecord} from '@/types/archive';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const useArchiveTopRating = (size = 3) => {
  const {year, month} = useCalendarStore();

  return useQuery({
    queryKey: ['archiveTopRating', year, month, size],
    queryFn: () => getArchiveTopRating(year, month, size),
  });
};

export const useArchive = () => {
  const {setRecords} = useArchiveStore();
  const {year, month} = useCalendarStore();

  useQuery({
    queryKey: ['archive', year, month],
    queryFn: async () => {
      const res = await getArchive(year, month);
      setRecords(res.data);
      return res;
    },
  });
};

export const useArchiveDetail = (archiveId: number) => {
  return useQuery<{status: string; timestamp: string; data: ArchiveRecord}>({
    queryKey: ['archiveDetail', archiveId],
    queryFn: () => getArchiveDetail(archiveId),
    staleTime: 1000 * 60 * 5,
    enabled: !!archiveId,
  });
};

export const useCreateArchive = () => {
  const {addRecord} = useArchiveStore();

  return useMutation({
    mutationFn: ({
      archiveData,
      imageFile,
    }: {
      archiveData: ArchiveCreateRequest;
      imageFile?: File;
    }) => {
      return postCreateArchive(archiveData, imageFile);
    },
    onSuccess: (data) => {
      const newRecord: ArchiveRecord = data.data;
      addRecord(newRecord);

      alert('아카이브가 추가되었습니다.');
    },
  });
};

export const useUpdateArchive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      archiveId,
      archiveData,
    }: {
      archiveId: number;
      archiveData: ArchiveCreateRequest;
    }) => putUpdateArchive(archiveId, archiveData),

    onSuccess: (_data, {archiveId}) => {
      queryClient.invalidateQueries({
        queryKey: ['archiveDetail', archiveId],
      });
      alert('아카이브가 수정되었습니다.');
    },

    onError: (err) => {
      console.error(err);
      alert('수정 중 오류가 발생했습니다.');
    },
  });
};

export const useDeleteArchive = () => {
  const {removeRecord} = useArchiveStore();

  return useMutation({
    mutationFn: (archiveId: number) => deleteArchive(archiveId),
    onSuccess: (_data, archiveId) => {
      removeRecord(archiveId);
      alert('아카이브가 삭제되었습니다.');
    },
    onError: (err) => {
      console.error(err);
      alert('삭제 중 오류가 발생했습니다.');
    },
  });
};
