import {type Comment} from '@/types/community';

export const mockComments: Comment[] = [
  {
    id: 1,
    nickname: '또봤다또',
    profileImgUrl: '/img/profile/mock-profile1.svg',
    content: '진짜 오늘 배우님 컨디션 뭐였죠... 저도 눈물바다였어요ㅠㅠㅠ',
    createdAt: '06/28 16:00',
    replies: [],
  },
  {
    id: 2,
    nickname: '객석101',
    profileImgUrl: '/img/profile/mock-profile2.svg',
    content: '저 커튼콜 찍었어요!! DM 주시면 보내드릴게요 ㅎㅎ',
    createdAt: '06/28 16:18',
    replies: [],
  },
  {
    id: 3,
    nickname: '넘버수집가',
    profileImgUrl: '/img/profile/mock-profile3.svg',
    content: '솔직히 요즘 후기 너무 감정과잉임 ㅋㅋ',
    createdAt: '06/28 19:07',
    replies: [],
  },

  {
    id: 4,
    nickname: '웃남러',
    profileImgUrl: '/img/profile/mock-profile4.svg',
    content: '커튼콜 찍다가 손떨리는거 ㄹㅇ 저도 초점 나간 거밖에 없음',
    createdAt: '06/28 19:20',
    replies: [
      {
        id: 5,
        nickname: '무대박현생',
        profileImgUrl: '/img/profile/mock-profile5.svg',
        content:
          '배우님 얼굴에 조명+땀+감정+예술이더라 완전 페르소나 그 자체..',
        createdAt: '06/29 12:10',
      },
    ],
  },
];
