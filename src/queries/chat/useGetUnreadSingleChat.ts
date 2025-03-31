import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetUnreadSingleChat } from 'api';
import type { ChatMessage, SingleChatParam } from 'types';

const fetchUnreadMessages = async (pageParam: SingleChatParam) => {
  const { singleChatId, criteriaNumber } = pageParam;
  const { data } = await requestGetUnreadSingleChat(singleChatId, criteriaNumber);
  return data.result;
};

export const useGetUnreadSingleChat = (singleChatId: number, criteriaNumber?: number) => {
  return useInfiniteQuery<ChatMessage[] | []>({
    queryKey: ['unreadSingleChat', singleChatId],
    queryFn: ({ pageParam }) => {
      return fetchUnreadMessages(pageParam as SingleChatParam);
    },
    initialPageParam: { singleChatId, criteriaNumber },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      const lastData = lastPage[lastPage.length - 1];
      return { singleChatId, criteriaNumber: lastData.messageNumber };
    },
    enabled: false,
  });
};
