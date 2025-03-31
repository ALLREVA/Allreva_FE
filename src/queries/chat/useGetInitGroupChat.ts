import { useQuery } from '@tanstack/react-query';

import { requestGetEnterGroupChat } from 'api';
import type { EnterChat } from 'types';

export const useGetInitGroupChat = (groupChatId: number) => {
  const fetchChatMessages = async () => {
    const { data } = await requestGetEnterGroupChat(groupChatId);
    return data.result;
  };

  return useQuery<EnterChat>({
    queryKey: ['initGroupChat', groupChatId],
    queryFn: fetchChatMessages,
    enabled: !!groupChatId,
  });
};
