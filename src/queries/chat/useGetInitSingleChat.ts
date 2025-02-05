import { useQuery } from '@tanstack/react-query';

import { requestGetEnterSingleChat } from 'api';
import type { EnterSingleChat } from 'types';

export const useGetInitSingleChat = (singleChatId: number) => {
  const fetchChatMessages = async () => {
    const { data } = await requestGetEnterSingleChat(singleChatId);
    return data.result;
  };

  return useQuery<EnterSingleChat>({
    queryKey: ['initSingleChat', singleChatId],
    queryFn: fetchChatMessages,
    enabled: !!singleChatId,
  });
};
