import { useQuery } from '@tanstack/react-query';

import { requestGetGroupChatInfo, requestGetSingleChatInfo } from 'api';
import type { ChatInfo, ChatType } from 'types';

export const useGetChatInfo = (chatId: number, chatType: ChatType) => {
  const fetchChatInfo = async () => {
    const { data } =
      chatType === 'GROUP'
        ? await requestGetGroupChatInfo(chatId)
        : await requestGetSingleChatInfo(chatId);
    return data.result;
  };

  return useQuery<ChatInfo>({
    queryKey: ['chatInfo', chatId],
    queryFn: fetchChatInfo,
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5,
  });
};
