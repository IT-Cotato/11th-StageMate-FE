// 게시글 헤더 정보 컴포넌트
interface PostHeaderInfoProps {
  title: string;
  nickname: string;
  date: string;
  viewCount: number;
  variant?: 'list' | 'detail'; // 'list'는 게시글 목록, 'detail'은 게시글 상세
}

const PostHeaderInfo = ({
  title,
  nickname,
  date,
  viewCount,
  variant = 'list',
}: PostHeaderInfoProps) => {
  {
    /* 글 제목 */
  }
  const titleClass =
    variant === 'detail'
      ? 'text-[32px] font-bold leading-[110%]'
      : 'text-2xl font-medium leading-[110%]';
  {
    /* 글쓴이, 날짜, 조회수 */
  }
  const metaTextClass =
    variant === 'detail'
      ? 'text-lg text-gray-2 font-light leading-[140%]'
      : 'text-[15px] text-gray-2 font-light leading-[140%]';

  return (
    <div className='flex flex-col gap-6'>
      <h2 className={titleClass}>{title}</h2>
      <div className='flex items-start gap-10'>
        <span className={metaTextClass}>{nickname}</span>
        <time className={metaTextClass}>{date}</time>
        <span className={metaTextClass}>조회 {viewCount}</span>
      </div>
    </div>
  );
};

export default PostHeaderInfo;
