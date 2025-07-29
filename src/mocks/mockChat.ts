import type {ChatMessage, ChatRoom} from '@/types/chat';

export const dummyMessages: ChatMessage[] = [
  {
    id: '1',
    user: {
      id: 1,
      name: '또봤다또',
      avatar: '/img/profile/mock-profile1.svg',
    },
    content: '오늘 레베카 보고왔는데 진심 마지막 넘버 미쳤다 ㅠㅠㅠㅠ',
    timestamp: '14:38',
    isMe: false,
  },
  {
    id: '2',
    user: {
      id: 2,
      name: '객석101',
      avatar: '/img/profile/mock-profile2.svg',
    },
    content: '댄버스 부인 배우님 목소리 듣자마자 소름 돋았어요 ㅋㅋㅋ',
    timestamp: '14:44',
    isMe: false,
  },
  {
    id: '3',
    user: {
      id: 3,
      name: '넘버수집가',
      avatar: '/img/profile/mock-profile3.svg',
    },
    content:
      '저도 오늘 보고 왔는데 커튼콜 때 관객들 박수소리 ㄹㅇ 폭발 ㅋㅋㅋㅋ',
    timestamp: '14:50',
    isMe: false,
  },
  {
    id: '4',
    user: {
      id: 4,
      name: '둘리',
      avatar: '/img/profile/mock-profile6.svg',
    },
    content: '레베카는 진짜 초연부터 봐야 하는 거 인정? 넘버 다 좋음',
    timestamp: '15:03',
    isMe: true,
  },
  {
    id: '5',
    user: {
      id: 5,
      name: '웃남러',
      avatar: '/img/profile/mock-profile4.svg',
    },
    content:
      '오늘 막심 캐스팅 누구로 보셨어요? 저는 00배우님으로 봤는데 표정연기ㅜㅠㅠ',
    timestamp: '15:25',
    isMe: false,
  },
  {
    id: '6',
    user: {
      id: 6,
      name: '무대밖현생',
      avatar: '/img/profile/mock-profile5.svg',
    },
    content:
      '근데 오늘 객석 매너 조금 아쉬웠어요ㅠ 중간에 기침 엄청하고 들락날락...',
    timestamp: '15:30',
    isMe: false,
  },
  {
    id: '7',
    user: {
      id: 7,
      name: 'testertestertester',
      avatar: '/img/profile/mock-profile5.svg',
    },
    content: 'tester',
    timestamp: '15:30',
    isMe: false,
  },
  {
    id: '8',
    user: {
      id: 7,
      name: 'testertestertester',
      avatar: '/img/profile/mock-profile5.svg',
    },
    content: 'tester',
    timestamp: '15:30',
    isMe: false,
  },
  {
    id: '9',
    user: {
      id: 7,
      name: 'testertestertester',
      avatar: '/img/profile/mock-profile5.svg',
    },
    content: 'tester',
    timestamp: '15:30',
    isMe: false,
  },
  {
    id: '10',
    user: {
      id: 7,
      name: 'testertestertester',
      avatar: '/img/profile/mock-profile5.svg',
    },
    content: 'tester',
    timestamp: '15:30',
    isMe: false,
  },
];

export const dummyChatRoom: ChatRoom = {
  id: 1,
  name: '레베카',
  messages: dummyMessages,
};
