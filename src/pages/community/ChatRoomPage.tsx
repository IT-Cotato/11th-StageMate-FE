import type {ChatMessage, ChatMessageReceived} from '@/types/chat';
import {useCallback, useEffect, useRef, useState} from 'react';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import Send from '@/assets/community/send.svg?react';
import BubbleWhiteTail from '@/assets/community/bubble/bubble-white-tail.svg?react';
import BubblePrimary4Tail from '@/assets/community/bubble/bubble-primary4-tail.svg?react';
import Modal from '@/components/global/Modal';
import {
  MenuReport,
  PopupBlock,
  PopupChatCaution,
  PopupReport,
} from '@/constant';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Portal from '@/components/global/Portal';
import Ban from '@/assets/community/modal-icons/ban.svg?react';
import Exclamation from '@/assets/community/modal-icons/exclamation.svg?react';
import BackButtonTitleHeader from '@/components/global/BackButtonTitleHeader';
import {useAuthStore} from '@/stores/authStore';
import userImg from '@/assets/users/user.png';
import LoadingOverlay from '@/components/global/LoadingOverlay';
import {activateStomp, deactivateStomp, sendMessage} from '@/api/stompClient';
import {useStompStore} from '@/stores/stompStore';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getReportChatCount, postReportChat} from '@/api/chatApi';
import Lock from '@/assets/lock.svg?react';
import {postUserBlock} from '@/api/blockApi';

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>(); // 채팅 방 번호
  const location = useLocation();
  const receivedData = location.state;
  const [inputMessage, setInputMessage] = useState(''); // 내가 입력하는 채팅 input 값
  const [isCautionPopupShow, setIsCautionPopupShow] = useState(true); // 채팅방 입장 주의 팝업 Show
  const [isMessageMenuShow, setIsMessageMenuShow] = useState(false); // 채팅 메뉴 (신고하기, 차단하기) Show
  const [isBlockPopupShow, setIsBlockPopupShow] = useState(false); // 채팅 메뉴 - 차단 팝업 Show
  const [isReportMenuShow, setIsReportMenuShow] = useState(false); // 채팅 메뉴 - 신고 메뉴 Show
  const [isReportPopupShow, setIsReportPopupShow] = useState(false); // 채팅 메뉴 - 신고 팝업 Show
  const [reportType, setReportType] = useState<string | null>(null); // 신고 종류 번호
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // 점3개 메뉴 누른 메시지 번호
  const [menuPosition, setMenuPosition] = // 채팅 메뉴, 신고 메뉴 위치
    useState<{
      top: number;
      right: number;
    }>({
      top: 0,
      right: 0,
    });
  const autoScrollRef = useRef<HTMLDivElement>(null); // 최신 (가장 아래) 메시지로 자동 스크롤하기 위한 ref
  const menuRef = useRef<HTMLDivElement>(null); // 채팅 메뉴 OR 신고 메뉴 element ref

  const [messages, setMessages] = useState<ChatMessageReceived[]>([]);

  const {user, accessToken, isLoading} = useAuthStore();
  const {isConnected, chatUsers, updateChatUserBlocked, resetChatUser} =
    useStompStore();

  const {data: reportCount} = useQuery({
    queryKey: ['reportsChatCount', user?.id],
    queryFn: () =>
      user ? getReportChatCount([user.id]) : Promise.resolve(null),
    enabled: !!user?.id,
  });

  const reportChatMutation = useMutation({
    mutationFn: postReportChat,
    onSuccess: () => {
      alert('신고가 완료 되었습니다.');
    },
    onError: () => {
      alert('다시 시도해주세요.');
    },
  });

  const blockChatMutation = useMutation({
    mutationFn: postUserBlock,
    onSuccess: (_, variables) => {
      updateChatUserBlocked(variables);
      alert('차단이 완료 되었습니다.');
    },
    onError: () => {
      alert('다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (!id) return;

    // 실제 저장소에서 직접 토큰 읽기 (타이밍 문제 해결)
    const getActualToken = () => {
      const isStayingLoggedIn =
        localStorage.getItem('isStayingLoggedIn') === 'true';
      const token = isStayingLoggedIn
        ? localStorage.getItem('accessToken')
        : sessionStorage.getItem('accessToken');

      console.log('🔍 토큰 디버깅:', {
        isStayingLoggedIn,
        fromStorage: token,
        fromAuthStore: accessToken,
        isLoading,
        localStorage: localStorage.getItem('accessToken'),
        sessionStorage: sessionStorage.getItem('accessToken'),
      });

      return token;
    };

    const actualToken = getActualToken();

    // 인증 상태가 로딩 중이거나 토큰이 없으면 연결하지 않음
    if (isLoading || !actualToken) {
      console.log(
        'STOMP 연결 대기 중 - isLoading:',
        isLoading,
        'actualToken:',
        !!actualToken
      );
      return;
    }

    // 메시지를 받았을 때 실행할 콜백 함수
    const handleMessageReceived = (newMessage: ChatMessageReceived) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // 실제 토큰으로 STOMP 클라이언트를 활성화하고 구독을 시작합니다.
    const isConnected = activateStomp(id, actualToken, handleMessageReceived);
    if (!isConnected) {
      console.error('STOMP 연결 실패 - 사용된 토큰:', actualToken);
    }

    // 컴포넌트가 언마운트되거나 의존성이 변경되면, 모든 연결과 구독을 정리합니다.
    return () => {
      deactivateStomp();
      resetChatUser();
    };
  }, [id, isLoading, accessToken, resetChatUser]);

  /**
   * 자동 스크롤
   */
  useEffect(() => {
    autoScrollRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  /**
   * 모든 메뉴 상태 초기화 함수
   */
  const resetAllMenuStates = useCallback(() => {
    setIsMessageMenuShow(false);
    setIsBlockPopupShow(false);
    setIsReportMenuShow(false);
    setIsReportPopupShow(false);
    setReportType(null);
    setOpenMenuId(null);
  }, []);

  /**
   * 외부 클릭 및 ESC 키 감지
   */
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        resetAllMenuStates();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        resetAllMenuStates();
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [openMenuId, resetAllMenuStates]);

  /**
   * 메시지 전송
   */
  const handleSendMessage = () => {
    if (!inputMessage.trim() || !user || !user.userId || !id) return;

    const messageToSend: ChatMessage = {
      roomId: Number(id),
      senderId: user.id,
      content: inputMessage,
    };

    sendMessage(messageToSend);
    setInputMessage('');
  };

  /**
   * 채팅창에서 엔터 누를시
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * 메시지 점 3개 메뉴 클릭
   */
  const handleMessageMenuClick = (
    event: React.MouseEvent,
    messageId: string
  ) => {
    event.stopPropagation();

    // 채팅 메뉴 OR 신고 메뉴 위치 계산
    try {
      const messageElement = (event.currentTarget as HTMLElement)
        .parentElement!;
      const messageRect = messageElement.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      let top = scrollY + messageRect.bottom + 20;
      const right = viewportWidth - messageRect.right + 24;

      if (top + 72 > scrollY + viewportHeight - 120) {
        top = top - 242 - messageElement.offsetHeight;
      }

      setMenuPosition({top, right});
      setIsMessageMenuShow(true);
      setOpenMenuId(messageId);
    } catch (error) {
      console.error('Error calculating menu position:', error);
      resetAllMenuStates();
    }
  };

  /**
   * 신고하기
   */
  const handleReport = // 채팅 메뉴 - 신고하기 클릭
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsReportMenuShow(true);
      setIsMessageMenuShow(false);
    };

  const handleReportTypeClick = // 신고 메뉴 - 신고 종류 클릭
    (e: React.MouseEvent<HTMLButtonElement>, reportId: string) => {
      e.stopPropagation();
      setReportType(reportId);
      setIsReportPopupShow(true);
      setIsReportMenuShow(false);
    };

  const handleReportPopupLeftClick = // 신고 팝업 - 아니오
    () => {
      setReportType(null);
      setOpenMenuId(null);
      setIsReportPopupShow(false);
    };

  const handleReportPopupRightClick = // 신고 팝업 - 신고하기
    () => {
      if (!openMenuId || !reportType) return;
      reportChatMutation.mutate({reason: reportType, chatId: openMenuId});
      setIsReportPopupShow(false);
      setReportType(null);
      setOpenMenuId(null);
    };

  /**
   * 차단하기
   */
  const handleBlock = // 채팅 메뉴 - 차단하기 클릭
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsBlockPopupShow(true);
      setIsMessageMenuShow(false);
    };

  const handleBlockPopupLeftClick = // 차단 팝업 - 아니오
    () => {
      resetAllMenuStates();
    };

  const handleBlockPopupRightClick = // 차단 팝업 - 차단하기
    () => {
      if (!openMenuId) return;
      const message = messages.find((msg) => msg.chatId === openMenuId);
      if (message) {
        blockChatMutation.mutate(message.senderId);
      }
      resetAllMenuStates();
    };

  if (!isConnected) {
    return (
      <div>
        <LoadingOverlay />
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Modal
          content='사용자 정보를 불러올 수 없습니다.'
          rightText='확인'
          onRightClick={() => navigate(-1)}
        />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col bg-white'>
        {/* 메시지 목록 */}
        <div className='relative flex flex-col gap-15 overflow-y-auto sm:pb-60 py-90 px-10'>
          {messages.map((message, index) => {
            const senderInfo = chatUsers[message.senderId];

            return (
              <div
                key={index}
                className={`message-container flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'} gap-13 items-start`}>
                {/* 프로필 & 닉네임 - !isMe */}
                {!(message.senderId === user.id) && (
                  <div className='flex flex-col justify-center items-center w-57'>
                    <div className='w-37 h-37 rounded-full border border-solid border-primary'>
                      <img
                        src={senderInfo?.profileImageUrl || userImg}
                        alt='profile-image'
                        className='w-full h-full rounded-full object-cover'
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className='text-gray-2 text-[13px] leading-20 line-clamp-1'>
                      {senderInfo?.nickname || '(알 수 없음)'}
                    </div>
                  </div>
                )}

                {/* 메시지 */}
                <div className='flex items-end pt-18'>
                  <div
                    className={`relative max-w-327 ${message.senderId === user.id ? 'mr-11' : 'ml-11'} ${
                      openMenuId === message.chatId ? 'relative z-[10000]' : ''
                    }`}>
                    {message.senderId === user.id ? (
                      <BubblePrimary4Tail className='absolute top-0 right-[-11px]' />
                    ) : (
                      <BubbleWhiteTail className='absolute top-0 left-[-11px]' />
                    )}
                    <div
                      className={`${message.senderId === user.id ? 'bg-primary-4' : 'bg-[#fff]'} rounded-[11px] py-6 px-12`}>
                      <p className='text-[#171717] leading-20 break-words whitespace-break-spaces'>
                        {senderInfo.isBlocked
                          ? '차단한 사용자의 메시지입니다.'
                          : message.content}
                      </p>
                      <span className='flex justify-end text-gray-2 text-sm font-light leading-20'>
                        {message.createdAt}
                      </span>
                    </div>
                  </div>

                  {!(message.senderId === user.id) &&
                    openMenuId !== message.chatId && (
                      <button
                        onClick={(e) =>
                          handleMessageMenuClick(e, message.chatId)
                        }
                        className='relative hover:cursor-pointer'
                        aria-label='메시지 메뉴'>
                        <EllipsisVertical className='w-24 h-24' />
                      </button>
                    )}
                </div>

                {/* 프로필 - isMe */}
                {message.senderId === user.id && (
                  <div className='flex flex-col justify-center items-center w-57'>
                    <div className='w-37 h-37 rounded-full border border-solid border-primary'>
                      <img
                        src={user.profileImageUrl || userImg}
                        alt='profile-image'
                        className='w-full h-full rounded-full object-cover'
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className='text-gray-2 text-[13px] leading-20 line-clamp-1'>
                      {user.nickname}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={autoScrollRef} />
        </div>

        {/* 헤더 */}
        <div className='fixed top-65 pt-25 max-w-[600px] w-full bg-white'>
          <BackButtonTitleHeader title={receivedData.title} />
        </div>

        {/* 입력창 */}
        <div className='fixed sm:bottom-[60px] bottom-[45px] max-w-[600px] w-full bg-[#ebebeb] px-13 py-11 flex justify-between items-center sm:h-[60px] h-[45px]'>
          <div className='flex grow items-center gap-10'>
            <div className='w-37 h-37 rounded-full border border-solid border-primary'>
              <img
                src={user.profileImageUrl || userImg}
                alt='profile-image'
                className='w-full h-full rounded-full object-cover'
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div className='p-10 flex grow'>
              {reportCount[0]?.reportCount >= 3 ? (
                <p>채팅 입력이 불가합니다.</p>
              ) : (
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder='메시지 입력'
                  className='flex grow justify-center items-center text-base h-18 placeholder:text-gray-2 text-[#000] leading-[110%] border-0 focus:outline-none resize-none line-clamp-1'
                  disabled={!isConnected}
                />
              )}
            </div>
          </div>

          {reportCount[0]?.reportCount >= 3 ? (
            <button disabled={true}>
              <Lock className='w-25 h-25 hover:cursor-pointer' />
            </button>
          ) : (
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || !isConnected}>
              <Send className='w-25 h-25 hover:cursor-pointer' />
            </button>
          )}
        </div>
      </div>

      {/* 채팅 (메시지 점3개) 메뉴 */}
      {isMessageMenuShow && (
        <div
          className='fixed inset-0 bg-[#979797]/44 z-[9999] max-w-[600px] m-auto backdrop-blur-[2px]'
          onClick={resetAllMenuStates}>
          <Portal>
            <div
              ref={menuRef}
              className='fixed bg-[#fff] rounded-[5px] z-[10001] shadow-lg'
              style={{
                top: menuPosition.top,
                right: menuPosition.right,
              }}
              role='menu'
              aria-label='메시지 옵션'>
              <button
                onClick={(e) => handleReport(e)}
                className='w-full px-7 py-5 hover:cursor-pointer flex items-center justify-start gap-15 border-b-[0.7px] border-solid border-[#dfe7ef]'
                role='menuitem'>
                <div className='flex gap-7 justify-center items-center'>
                  <Exclamation />
                  <span className='text-red text-[15px] font-medium leading-[110%]'>
                    신고
                  </span>
                </div>
                <ChevronRight />
              </button>
              <button
                onClick={(e) => handleBlock(e)}
                className='w-full px-7 py-5 hover:cursor-pointer flex items-center justify-start gap-15'
                role='menuitem'>
                <div className='flex gap-7  justify-center items-center'>
                  <Ban />
                  <span className='text-red text-[15px] font-medium leading-[110%]'>
                    차단
                  </span>
                </div>
              </button>
            </div>
          </Portal>
        </div>
      )}

      {/* 신고 메뉴 */}
      {isReportMenuShow && (
        <div
          className='fixed inset-0 bg-[#979797]/44 z-[9999] max-w-[600px] m-auto backdrop-blur-[2px]'
          onClick={resetAllMenuStates}>
          <Portal>
            <div
              ref={menuRef}
              className='flex flex-col fixed bg-[#fff] rounded-[5px] z-[10001] min-w-168 shadow-lg'
              style={{
                top: menuPosition.top,
                right: menuPosition.right,
              }}
              role='menu'
              aria-label='신고 옵션'>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMessageMenuShow(true);
                  setIsReportMenuShow(false);
                }}
                className='p-4 flex items-center border-b-[0.7px] border-solid border-[#dfe7ef] text-[#000] text-[15px] font-medium leading-[110%] hover:cursor-pointer'>
                <ChevronRight className='rotate-90' />
                신고 사유 선택
              </div>
              {MenuReport?.map((report) => (
                <button
                  key={report.id}
                  onClick={(e) => handleReportTypeClick(e, report.id)}
                  className='self-stretch text-start p-7 pl-15 last:border-0 border-b-[0.7px] border-solid border-[#dfe7ef] text-[#000] text-[15px] font-medium leading-[110%] hover:cursor-pointer'>
                  {report.text}
                </button>
              ))}
            </div>
          </Portal>
        </div>
      )}

      {/* 주의 팝업 */}
      {isCautionPopupShow && (
        <Modal
          content={PopupChatCaution.content}
          contentRed={PopupChatCaution.contentRed}
          rightText='네, 확인했어요'
          onRightClick={() => setIsCautionPopupShow(false)}
          onBackdropClick={() => setIsCautionPopupShow(false)}
          closeOnBackdrop={true}
          closeOnEscape={true}
        />
      )}

      {/* 차단 팝업 */}
      {isBlockPopupShow && (
        <Modal
          content={PopupBlock.content}
          leftText='아니오'
          rightText='네, 확인했어요'
          onLeftClick={handleBlockPopupLeftClick}
          onRightClick={handleBlockPopupRightClick}
          onBackdropClick={resetAllMenuStates}
          closeOnBackdrop={true}
          closeOnEscape={false}
        />
      )}

      {/* 신고 팝업 */}
      {isReportPopupShow && (
        <Modal
          title={PopupReport.title}
          content={PopupReport.content}
          leftText='아니오'
          rightText='네, 확인했어요'
          onLeftClick={handleReportPopupLeftClick}
          onRightClick={handleReportPopupRightClick}
          onBackdropClick={resetAllMenuStates}
          closeOnBackdrop={true}
          closeOnEscape={false}
        />
      )}
    </>
  );
};

export default ChatRoomPage;
