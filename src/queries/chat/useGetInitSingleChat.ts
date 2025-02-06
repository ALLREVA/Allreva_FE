import { useQuery } from '@tanstack/react-query';

import { requestGetEnterSingleChat } from 'api';
import type { EnterChat } from 'types';

export const useGetInitSingleChat = (singleChatId: number) => {
  const fetchChatMessages = async () => {
    const { data } = await requestGetEnterSingleChat(singleChatId);
    return data.result;
  };

  return useQuery<EnterChat>({
    queryKey: ['initSingleChat', singleChatId],
    queryFn: fetchChatMessages,
    enabled: !!singleChatId,
  });
};
