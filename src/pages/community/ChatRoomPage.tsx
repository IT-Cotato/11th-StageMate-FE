import {dummyChatRoom} from '@/mocks/mockChat';
import type {ChatMessage} from '@/types/chat';
import {useCallback, useEffect, useRef, useState} from 'react';
import ChevronLeft from '@/assets/arrows/chevron-left.svg?react';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import Send from '@/assets/community/send.svg?react';
import BubbleWhiteTail from '@/assets/community/bubble/bubble-white-tail.svg?react';
import BubblePrimary4Tail from '@/assets/community/bubble/bubble-primary4-tail.svg?react';
import Modal from '@/components/global/Modal';
import {MenuReport, PopupChatCaution, PopupReport} from '@/constant';
import {useParams} from 'react-router-dom';
import Portal from '@/components/global/Portal';
import Ban from '@/assets/community/modal-icons/ban.svg?react';
import Exclamation from '@/assets/community/modal-icons/exclamation.svg?react';

const ChatRoomPage = () => {
  const {id} = useParams<{id: string}>(); // 채팅 방 번호
  const [messages, setMessages] = // 채팅 더미 데이터
    useState<ChatMessage[]>(
      dummyChatRoom.id === Number(id) ? dummyChatRoom.messages : []
    );
  const [inputMessage, setInputMessage] = useState(''); // 내가 입력하는 채팅 input 값
  const [isCautionPopupShow, setIsCautionPopupShow] = useState(true); // 채팅방 입장 주의 팝업 Show
  const [isMessageMenuShow, setIsMessageMenuShow] = useState(false); // 채팅 메뉴 (신고하기, 차단하기) Show
  const [isBlockPopupShow, setIsBlockPopupShow] = useState(false); // 채팅 메뉴 - 차단 팝업 Show
  const [isReportMenuShow, setIsReportMenuShow] = useState(false); // 채팅 메뉴 - 신고 메뉴 Show
  const [isReportPopupShow, setIsReportPopupShow] = useState(false); // 채팅 메뉴 - 신고 팝업 Show
  const [reportType, setReportType] = useState<number | null>(null); // 신고 종류 번호
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

  // const {isConnected, sendMessage} = useWebSocket(dummyChatRoom.id);

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
    if (
      inputMessage.trim() // && isConnected
    ) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: {
          id: 4,
          name: '둘리',
          avatar: '/img/profile/mock-profile6.svg',
        },
        content: inputMessage.trim(),
        timestamp: new Date().toLocaleTimeString('ko-KR', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        }),
        isMe: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      // sendMessage(inputMessage.trim());
      setInputMessage('');
    }
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
    (e: React.MouseEvent<HTMLButtonElement>, reportId: number) => {
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
      console.log(
        'todo : 신고 API 호출',
        '>',
        openMenuId,
        '를',
        reportType,
        '로 신고'
      );
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
      if (!openMenuId) {
        console.error('Missing openMenuId for block action');
        return;
      }

      console.log('todo : 차단 API 호출', '>', openMenuId);
      resetAllMenuStates();
    };

  return (
    <>
      <div className='flex flex-col bg-white'>
        {/* 헤더 */}
        <div className='bg-white flex items-center justify-between'>
          <div className='inline-flex items-center'>
            <button onClick={() => window.history.back()}>
              <ChevronLeft className='w-58 h-51 hover:cursor-pointer' />
            </button>
            <h1 className='text-[#000] text-xl font-bold leading-[140%]'>
              {dummyChatRoom.name}
            </h1>
          </div>
        </div>

        {/* 메시지 목록 */}
        <div className='relative flex flex-col gap-15 overflow-y-auto h-675 pt-26 px-10'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-container flex ${message.isMe ? 'justify-end' : 'justify-start'} gap-13 items-start`}>
              {/* 프로필 & 닉네임 - !isMe */}
              {!message.isMe && (
                <div className='flex flex-col justify-center items-center w-57'>
                  <div className='w-37 h-37 rounded-full'>
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className='text-gray-2 text-[13px] leading-20 line-clamp-1'>
                    {message.user.name.length > 5
                      ? message.user.name.slice(0, 5) + '…'
                      : message.user.name}
                  </div>
                </div>
              )}

              {/* 메시지 */}
              <div className='flex items-end pt-18'>
                <div
                  className={`relative max-w-327 ${message.isMe ? 'mr-11' : 'ml-11'} ${
                    openMenuId === message.id ? 'relative z-[10000]' : ''
                  }`}>
                  {message.isMe ? (
                    <BubblePrimary4Tail className='absolute top-0 right-[-11px]' />
                  ) : (
                    <BubbleWhiteTail className='absolute top-0 left-[-11px]' />
                  )}
                  <div
                    className={`${message.isMe ? 'bg-primary-4' : 'bg-[#fff]'} rounded-[11px] py-6 px-12`}>
                    <p className='text-[#171717] leading-20 break-words whitespace-break-spaces'>
                      {message.content}
                    </p>
                    <span className='flex justify-end text-gray-2 text-sm font-light leading-20'>
                      {message.timestamp}
                    </span>
                  </div>
                </div>

                {!message.isMe && openMenuId !== message.id && (
                  <button
                    onClick={(e) => handleMessageMenuClick(e, message.id)}
                    className='relative hover:cursor-pointer'
                    aria-label='메시지 메뉴'>
                    <EllipsisVertical className='w-24 h-24' />
                  </button>
                )}
              </div>

              {/* 프로필 - isMe */}
              {message.isMe && (
                <div className='flex flex-col justify-center items-center w-57'>
                  <div className='w-37 h-37 rounded-full'>
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className='w-full h-full object-cover'
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
          <div ref={autoScrollRef} />
        </div>

        {/* 입력창 */}
        <div className='bg-[#ebebeb] px-13 py-11 flex justify-between items-center '>
          <div className='flex grow items-center gap-10'>
            <div className='w-37 h-37'>
              <img
                src='/img/profile/mock-profile6.svg'
                alt='내 프로필'
                className='w-full h-full object-cover'
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>

            <div className='p-10 flex grow'>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='댓글을 입력하세요.'
                className='flex grow justify-center items-center text-base h-18 placeholder:text-gray-2 text-[#000] leading-[110%] border-0 focus:outline-none resize-none line-clamp-1'
                // disabled={!isConnected}
              />
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            // disabled={!inputMessage.trim() || !isConnected}
          >
            <Send className='w-25 h-25 hover:cursor-pointer' />
          </button>
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
          content={PopupChatCaution.content}
          contentRed={PopupChatCaution.contentRed}
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
