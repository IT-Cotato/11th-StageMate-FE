import type {Post} from '@/types/community';

export const mockPosts: Post[] = [
  {
    id: 1,
    category: '일상',
    title: '오늘 커튼콜 배우님 미쳤다 진짜...',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 458,
    nickname: '무대위의밤비',
    date: '25.06.28',
    isScrapped: true,
    bookmarkCount: 10,
    content: `안녕하세요!! 방금 <웃는 남자> 막공 보고 온 따끈따끈 관극러입니다ㅠㅠ\n
오늘 커튼콜 진짜 레전드였어요...\n
배우님 목소리 컨디션 완전 최상이었고 표정이랑 손짓까지 다 미쳤음...\n
특히 마지막 넘버 부르고나서 관객석 천천히 눈 맞춰주는데 심장 터지는줄 ㅠㅠ\n
같이 보신 분들 오늘 애드리브 들으셨죠??\n
“여러분 덕분에 행복했습니다” 하는데 객석 단체 눈물바다 ㅠㅠㅜㅠ\n
진짜 오늘 거 커튼콜 찍은 분 계신가요?\n
저는 너무 떨려서 손 떨려서 망했어요 ㅋㅋㅋ 공유 가능하시면 댓글 부탁드립니다!!!\n
참고로 전 아직도 현실 복귀 못 함...`,
  },
  {
    id: 2,
    category: '꿀팁',
    title: '뮤지컬 티켓팅 꿀팁 모음.zip',
    likeCount: 147,
    commentCount: 100,
    isLiked: true,
    viewCount: 458,
    nickname: '티켓팅의신',
    date: '25.06.27',
    isScrapped: true,
    bookmarkCount: 5,
  },
  {
    id: 3,
    category: '일상',
    title: '뮤지컬 볼 때 혼관 vs 지인관 뭐가 더 좋음?',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 218,
    nickname: '공연러버',
    date: '25.06.29',
    isScrapped: true,
    bookmarkCount: 3,
  },
  {
    id: 4,
    category: '나눔 · 거래',
    title: '<웃는 남자> 티켓 양도합니다.',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 458,
    nickname: '티켓나눔천사',
    date: '25.06.28',
    isScrapped: false,
    bookmarkCount: 8,
  },
  {
    id: 5,
    category: '꿀팁',
    title: '블루스퀘어 가시는 분들 주차팁 + 맛집 추천',
    likeCount: 147,
    commentCount: 100,
    isLiked: false,
    viewCount: 458,
    nickname: '주차의달인',
    date: '25.06.26',
    isScrapped: true,
    bookmarkCount: 12,
  },
];
