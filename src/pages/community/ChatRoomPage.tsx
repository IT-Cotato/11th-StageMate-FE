import {dummyChatRoom} from '@/mocks/mockChat';
import type {ChatMessage} from '@/types/chat';
import {useEffect, useRef, useState} from 'react';
import ChevronLeft from '@/assets/arrows/chevron-left.svg?react';
import ChevronRight from '@/assets/arrows/chevron-right.svg?react';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import Send from '@/assets/community/send.svg?react';
import BubbleWhiteTail from '@/assets/community/bubble/bubble-white-tail.svg?react';
import BubblePrimary4Tail from '@/assets/community/bubble/bubble-primary4-tail.svg?react';
import Popup from '@/components/global/Popup';
import {PopupChatCaution} from '@/constant';
import {useParams} from 'react-router-dom';
import Portal from '@/components/global/Portal';
import Ban from '@/assets/community/modal-icons/ban.svg?react';
import Exclamation from '@/assets/community/modal-icons/exclamation.svg?react';

const ChatRoomPage = () => {
  const {id} = useParams<{id: string}>();
  const [messages, setMessages] = useState<ChatMessage[]>(
    dummyChatRoom.id === Number(id) ? dummyChatRoom.messages : []
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isCautionPopupShow, setIsCautionPopupShow] = useState(true);
  const [isBlockPopupShow, setIsBlockPopupShow] = useState(false);
  const [isMessageMenuShow, setIsMessageMenuShow] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  // 외부 클릭 및 ESC 키 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenMenuId(null);
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
  }, [openMenuId]);

  // 메시지 전송
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
          hour: '2-digit',
          minute: '2-digit',
        }),
        isMe: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 메시지 점 3개 메뉴 클릭
  const handleMessageMenuClick = (
    event: React.MouseEvent,
    messageId: string
  ) => {
    event.stopPropagation();

    if (openMenuId === messageId) {
      setIsMessageMenuShow(false);
      setOpenMenuId(null);
      return;
    }

    const buttonRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    const scrollY = window.scrollY;

    let top = buttonRect.bottom + scrollY + 20;
    let left = buttonRect.left - 110;

    if (left < 10) {
      left = buttonRect.right + 10;
    }

    if (top + 70 > window.innerHeight + scrollY - 120) {
      top = buttonRect.bottom + scrollY - 70;
      left = buttonRect.right;
    }

    setMenuPosition({top, left});
    setIsMessageMenuShow(true);
    setOpenMenuId(messageId);
  };

  // 신고하기
  const handleReport = () => {
    console.log('todo : 신고 API 호출');
    setIsMessageMenuShow(false);
    setOpenMenuId(null);
  };

  // 차단하기
  const handleBlock = () => {
    setIsBlockPopupShow(true);
    setIsMessageMenuShow(false);
  };

  const handleBlockPopupLeftClick = () => {
    setOpenMenuId(null);
    setIsBlockPopupShow(false);
  };

  const handleBlockPopupRightClick = () => {
    console.log('todo : 차단 API 호출', '>', openMenuId);
    setOpenMenuId(null);
    setIsBlockPopupShow(false);
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
        <div className='relative flex flex-col gap-6 overflow-y-auto h-675 pt-26 px-10'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'} gap-13 items-start`}>
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
              <div
                className={`flex items-end pt-18 ${openMenuId === message.id ? 'relative z-[10000]' : ''}`}>
                <div
                  className={`relative max-w-327 ${message.isMe ? 'mr-11' : 'ml-11'}`}>
                  {message.isMe ? (
                    <BubblePrimary4Tail className='absolute top-0 right-[-11px]' />
                  ) : (
                    <BubbleWhiteTail className='absolute top-0 left-[-11px]' />
                  )}
                  <div
                    className={`${message.isMe ? 'bg-primary-4' : 'bg-[#fff]'} rounded-[11px] py-6 px-12`}>
                    <p className='text-[#171717] leading-20'>
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
          <div ref={messagesEndRef} />
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

            <div className='p-10'>
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder='댓글을 입력하세요.'
                className='flex grow justify-center items-center text-base h-18 placeholder:text-gray-2 text-[#000] leading-[110%] border-0 focus:outline-none resize-none line-clamp-1'
              />
            </div>
          </div>

          <button onClick={handleSendMessage}>
            <Send className='w-25 h-25 hover:cursor-pointer' />
          </button>
        </div>
      </div>

      {/* 배경 오버레이 */}
      {openMenuId && (
        <div
          className='fixed inset-0 bg-[#979797]/44 z-[9999] max-w-[600px] m-auto backdrop-blur-[2px]'
          onClick={() => {
            setOpenMenuId(null);
          }}
        />
      )}

      {/* 메시지 점3개 메뉴 */}
      {isMessageMenuShow && (
        <Portal>
          <div
            ref={menuRef}
            className='fixed bg-[#fff] rounded-[5px] z-50'
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            role='menu'
            aria-label='메시지 옵션'>
            <button
              onClick={() => handleReport()}
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
              onClick={() => handleBlock()}
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
      )}

      {/* 주의 팝업 */}
      {isCautionPopupShow && (
        <Popup
          content={PopupChatCaution.content}
          contentRed={PopupChatCaution.contentRed}
          rightText='네, 확인했어요'
          onRightClick={() => setIsCautionPopupShow(false)}
          onBackdropClick={() => setIsCautionPopupShow(false)} // 배경 클릭으로도 닫기
          closeOnBackdrop={true} // 배경 클릭 허용
          closeOnEscape={true} // ESC 키로 닫기 허용
        />
      )}

      {/* 차단 팝업 */}
      {isBlockPopupShow && (
        <Popup
          content={PopupChatCaution.content}
          contentRed={PopupChatCaution.contentRed}
          leftText='아니오'
          rightText='네, 확인했어요'
          onLeftClick={() => handleBlockPopupLeftClick()}
          onRightClick={() => handleBlockPopupRightClick()}
          onBackdropClick={() => handleBlockPopupLeftClick()}
          closeOnBackdrop={true}
          closeOnEscape={true}
        />
      )}
    </>
  );
};

export default ChatRoomPage;
