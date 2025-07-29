import {dummyChatRoom} from '@/mocks/mockChat';
import type {ChatMessage} from '@/types/chat';
import {useEffect, useRef, useState} from 'react';
import ChevronLeft from '@/assets/arrows/chevron-left.svg?react';
import EllipsisVertical from '@/assets/ellipsis/ellipsis-vertical.svg?react';
import Send from '@/assets/community/send.svg?react';
import BubbleWhiteTail from '@/assets/community/bubble/bubble-white-tail.svg?react';
import BubblePrimary4Tail from '@/assets/community/bubble/bubble-primary4-tail.svg?react';
import Popup from '@/components/global/Popup';
import {PopupChatCaution} from '@/constant';
import {useParams} from 'react-router-dom';

const ChatRoomPage = () => {
  const {id} = useParams<{id: string}>();
  const [messages, setMessages] = useState<ChatMessage[]>(
    dummyChatRoom.id === Number(id) ? dummyChatRoom.messages : []
  );
  const [inputMessage, setInputMessage] = useState('');
  const [isPopupShow, setIsPopupShow] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
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

  return (
    <>
      <div className='flex flex-col bg-white'>
        {/* 헤더 */}
        <div className='bg-white flex items-center justify-between'>
          <div className='inline-flex items-center'>
            <button>
              <ChevronLeft className='w-58 h-51' />
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
              <div className='flex items-end pt-18'>
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

                {!message.isMe && (
                  <button>
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

      {/* 팝업 */}
      {isPopupShow && (
        <Popup
          content={PopupChatCaution.content}
          contentRed={PopupChatCaution.contentRed}
          rightText='네, 확인했어요'
          onRightClick={() => setIsPopupShow(false)}
          onBackdropClick={() => setIsPopupShow(false)} // 배경 클릭으로도 닫기
          closeOnBackdrop={true} // 배경 클릭 허용
          closeOnEscape={true} // ESC 키로 닫기 허용
        />
      )}
    </>
  );
};

export default ChatRoomPage;
