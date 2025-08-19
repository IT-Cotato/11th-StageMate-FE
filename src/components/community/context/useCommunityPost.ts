import {useContext} from 'react';
import {
  CommunityPostContext,
  type CommunityPostContextType,
} from './CommunityPostContext';

export function useCommunityPost(): CommunityPostContextType {
  const ctx = useContext(CommunityPostContext);
  if (!ctx)
    throw new Error(
      'useCommunityPost must be used within CommunityPostProvider'
    );
  return ctx;
}

export function useCommunityPostSafe() {
  return useContext(CommunityPostContext);
}
