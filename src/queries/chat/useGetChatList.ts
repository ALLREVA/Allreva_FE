import { useQuery } from '@tanstack/react-query';

import { requestGetChatList } from 'api';
import type { ChatList } from 'types';

export const useGetChatList = () => {
  const fetchChatList = async () => {
    const { data } = await requestGetChatList();
    return data.result;
  };

  return useQuery<ChatList[]>({
    queryKey: ['chatList'],
    queryFn: fetchChatList,
  });
};
