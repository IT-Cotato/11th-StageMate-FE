// 커뮤니티 게시글 이미지 리스트 컴포넌트

interface PostImageListProps {
  imgUrls?: string[];
  wrapperRef?: React.RefObject<HTMLUListElement>;
}

const PostImageList = ({imgUrls = [], wrapperRef}: PostImageListProps) => {
  return (
    <ul ref={wrapperRef} className='flex w-full overflow-x-auto gap-20'>
      {imgUrls.length > 0
        ? imgUrls.map((url, index) => (
            <li
              key={index}
              className='min-w-[220px] h-[220px] bg-no-repeat bg-center bg-cover rounded-md shrink-0'
              style={{backgroundImage: `url(${url})`}}
            />
          ))
        : Array(4)
            .fill(null)
            .map((_, index) => (
              <li
                key={index}
                className='min-w-[220px] h-[220px] bg-gray-1 rounded-md shrink-0 flex items-center justify-center text-sm text-black'>
                게시글 사진
              </li>
            ))}
    </ul>
  );
};

export default PostImageList;
