type Performance = {
  id: number;
  title: string;
  imageUrl?: string;
};

export const mockRecommendedPlays: Record<string, Performance[]> = {
  '창작 뮤지컬': [
    {
      id: 1,
      title: '번지점프를 하다',
    },
    {
      id: 2,
      title: '빨래',
    },
    {
      id: 3,
      title: '어쩌면 해피엔딩',
    },
  ],

  '오리지널/내한 뮤지컬': [
    {
      id: 4,
      title: '위키드',
    },
    {
      id: 5,
      title: '레미제라블',
    },
  ],

  '리미티드 런': [{id: 6, title: '더 픽'}],

  '아동/가족 뮤지컬': [
    {id: 7, title: '겨울왕국'},
    {
      id: 8,
      title: '무지개 물고기',
    },
  ],
};
