export type Place = {
  id: number;
  name: string;
  region: string; // '온라인' | '서울' | '경기/인천' | '대구/부산' | '전라도/광주/제주' | '강원/충청/대전'
};

export const mockPlaces: Place[] = [
  {id: 1, name: '온라인 생중계', region: '온라인'},
  {id: 2, name: '세종 문화회관', region: '서울'},
  {id: 3, name: '드림 씨어터', region: '부산'},
  {id: 4, name: '상세한 장소명', region: '위치'},
  {id: 5, name: '상세한 장소명', region: '위치'},
  {id: 6, name: '상세한 장소명', region: '위치'},
  {id: 7, name: '상세한 장소명', region: '위치'},
  {id: 8, name: '상세한 장소명', region: '위치'},
];
