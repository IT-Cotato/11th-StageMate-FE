/* eslint-disable @typescript-eslint/no-explicit-any */
import {CompatClient, Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {WS_URL} from '@/api/configs';
import type {ChatMessage, ChatMessageReceived} from '@/types/chat';
import {useStompStore} from '@/stores/stompStore';
import {getChatProfile} from './chatApi';

let stompClient: CompatClient | null = null;
let subscription: any = null;
const fetchingUserIds = new Set<number>();

export const activateStomp = (
  roomId: string,
  accessToken: string,
  onMessageReceived: (message: ChatMessageReceived) => void
) => {
  console.log('🚀 STOMP 연결 시작:', {
    roomId,
    accessToken: accessToken ? `${accessToken.substring(0, 10)}...` : 'NULL',
  });

  if (!accessToken) {
    console.error('🔴 STOMP: 액세스 토큰이 없습니다.');
    return false;
  }

  if (stompClient) {
    console.log('🔄 STOMP: 기존 클라이언트 재사용');
    return true;
  }

  useStompStore.getState().setConnected(false);

  const socket = new SockJS(`${WS_URL}/ws-stomp`);
  stompClient = Stomp.over(socket);
  stompClient.debug = () => {};

  console.log(
    '🔗 STOMP 인증 헤더:',
    `Bearer ${accessToken.substring(0, 10)}...`
  );

  stompClient.connect(
    {Authorization: `Bearer ${accessToken}`},
    () => {
      console.log('✅ STOMP Singleton: 연결 성공', roomId);
      useStompStore.getState().setConnected(true);

      subscription = stompClient?.subscribe(
        `/topic/chat/room/${roomId}`,
        async (message) => {
          const receivedMessage: ChatMessageReceived = JSON.parse(message.body);
          const {senderId} = receivedMessage;
          const stompStore = useStompStore.getState();

          if (
            senderId &&
            !stompStore.hasChatUser(senderId) &&
            !fetchingUserIds.has(senderId)
          ) {
            try {
              fetchingUserIds.add(senderId);

              const data = await getChatProfile([senderId]);
              const userInfo = data[0];

              stompStore.addChatUsers({
                [senderId]: {
                  nickname: userInfo.nickname,
                  profileImageUrl: userInfo.profileImageUrl,
                  reportedCount: userInfo.reportedCount,
                  isBlocked: userInfo.isBlocked,
                },
              });
            } catch (error) {
              console.error(`${senderId} 유저 정보 조회 실패:`, error);
              stompStore.addChatUsers({
                [senderId]: {
                  nickname: '(알 수 없음)',
                  profileImageUrl: null,
                  reportedCount: 0,
                  isBlocked: false,
                },
              });
            } finally {
              fetchingUserIds.delete(senderId);
            }
          }

          onMessageReceived(receivedMessage);
        }
      );
    },
    (error: any) => {
      console.error('🔴 STOMP Singleton: 연결 실패', {
        error,
        roomId,
        accessToken: accessToken
          ? `${accessToken.substring(0, 10)}...`
          : 'NULL',
        errorType: typeof error,
        errorMessage: error?.message || 'Unknown error',
        wsUrl: `${WS_URL}/ws-stomp`,
      });
      useStompStore.getState().setConnected(false);
      stompClient = null;
    }
  );

  return true;
};

export const sendMessage = (messageToSend: ChatMessage) => {
  if (stompClient && stompClient.connected) {
    stompClient.send('/app/chat-room/chat', {}, JSON.stringify(messageToSend));
  } else {
    console.error(
      '🔴 STOMP Singleton: 연결되지 않아 메시지를 보낼 수 없습니다.'
    );
  }
};

export const deactivateStomp = () => {
  if (subscription) {
    subscription.unsubscribe();
    subscription = null;
    console.log('🔌 STOMP Singleton: 구독 해제');
  }

  if (stompClient?.connected) {
    stompClient.disconnect(() => {
      console.log('🔌 STOMP Singleton: 연결 종료');
      useStompStore.getState().setConnected(false);
      stompClient = null;
    });
  }
};
