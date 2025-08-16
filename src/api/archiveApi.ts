import {privateAxios} from '@/api/axios';
import {ENDPOINT} from '@/api/urls';
import type {ArchiveCreateRequest} from '@/types/archive';

{
  /** 공연 평점 순위 */
}
export const getArchiveTopRating = async (
  year: number,
  month: number,
  size: number = 3
) => {
  const response = await privateAxios.get(ENDPOINT.ARCHIVE_TOP_RATING, {
    params: {
      year,
      month,
      size,
    },
  });
  return response.data;
};

{
  /** 아카이브 생성 */
}
export const postCreateArchive = async (
  archiveData: ArchiveCreateRequest,
  imageFile?: File
) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify(archiveData));

  if (imageFile) {
    formData.append('image', imageFile);
  }

  const response = await privateAxios.post(ENDPOINT.ARCHIVE_CREATE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

{
  /** 월별 공연 아카이브 */
}
export const getArchive = async (year: number, month: number) => {
  const response = await privateAxios.get(ENDPOINT.ARCHIVE, {
    params: {
      year,
      month,
    },
  });
  return response.data;
};

{
  /** 아카이브 상세 정보 */
}

export const getArchiveDetail = async (archiveId: number) => {
  const response = await privateAxios.get(ENDPOINT.ARCHIVE_DETAIL(archiveId));
  return response.data;
};

{
  /** 아카이브 수정 */
}
export const putUpdateArchive = async (
  archiveId: number,
  archiveData: {
    title: string;
    viewingDate: string;
    casting: string;
    review: string;
    theaterName: string;
    rating: number;
    memo: string;
  }
) => {
  const response = await privateAxios.put(
    ENDPOINT.ARCHIVE_UPDATE(archiveId),
    archiveData,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

{
  /** 아카이브 삭제 */
}
export const deleteArchive = async (archiveId: number) => {
  const response = await privateAxios.delete(
    ENDPOINT.ARCHIVE_DELETE(archiveId)
  );
  return response.data;
};
