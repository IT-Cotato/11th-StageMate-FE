import {useState, useCallback, useMemo, type ReactNode} from 'react';
import {CommunityPostContext} from './CommunityPostContext';

interface CommunityPostProviderProps {
  children: ReactNode;
}

export default function CommunityPostProvider({
  children,
}: CommunityPostProviderProps) {
  const [postData, setPostData] = useState({
    postId: null as number | null,
    likeCount: 0,
    scrapCount: 0,
    commentCount: 0,
    isLiked: false,
    isScrapped: false,
  });

  const [handlers, setHandlers] = useState<{
    onLikeClick?: () => void;
    onScrapClick?: () => void;
  }>({});

  const updatePostData = useCallback(
    (data: {
      postId: number;
      likeCount: number;
      scrapCount: number;
      commentCount: number;
      isLiked: boolean;
      isScrapped: boolean;
    }) => setPostData(data),
    []
  );

  const updateHandlers = useCallback(
    (newHandlers: {onLikeClick: () => void; onScrapClick: () => void}) =>
      setHandlers(newHandlers),
    []
  );

  const value = useMemo(
    () => ({
      ...postData,
      setPostData: updatePostData,
      onLikeClick: handlers.onLikeClick,
      onScrapClick: handlers.onScrapClick,
      setHandlers: updateHandlers,
    }),
    [postData, handlers, updatePostData, updateHandlers]
  );

  return (
    <CommunityPostContext.Provider value={value}>
      {children}
    </CommunityPostContext.Provider>
  );
}
