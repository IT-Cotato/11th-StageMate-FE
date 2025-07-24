// 커뮤니티 게시글 이미지 리스트 컴포넌트

interface PostImageListProps {
  imgUrls?: string[];
  wrapperRef?: React.RefObject<HTMLUListElement>;
}

const PostImageList = ({imgUrls = [], wrapperRef}: PostImageListProps) => {
  if (!imgUrls.length) return null; // 이미지 없으면 아예 렌더링하지 않음 (선택)

  return (
    <ul ref={wrapperRef} className='flex w-full overflow-x-auto gap-20'>
      {imgUrls.map((url, index) => (
        <li
          key={index}
          className='min-w-[220px] h-[220px] bg-no-repeat bg-center bg-cover rounded-md shrink-0'
          style={{backgroundImage: `url(${url})`}}
        />
      ))}
    </ul>
  );
};

export default PostImageList;
