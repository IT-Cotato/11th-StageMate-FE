export interface ArchiveCreateRequest {
  title: string;
  viewingDate: string; // yyyy-MM-dd
  casting: string;
  review: string;
  theaterName: string;
  rating: number; // 0.0 ~ 5.0
  memo: string;
  naverImageUrl?: string; // 네이버 이미지 검색시
}
export interface ArchiveRecord {
  id: number;
  title: string;
  viewingDate: string;
  imageUrl: string;
  theaterName: string;
  casting: string;
  rating: number;
  review: string;
  memo: string;
}
