import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetReadSingleChat } from 'api';
import type { ChatMessage, ChatMessageParam } from 'types';

const fetchReadMessages = async (pageParam: ChatMessageParam) => {
  const { singleChatId, criteriaNumber } = pageParam;
  const { data } = await requestGetReadSingleChat(singleChatId, criteriaNumber);
  return data.result;
};

export const useGetReadSingleChat = (singleChatId: number, criteriaNumber?: number) => {
  return useInfiniteQuery<ChatMessage[] | []>({
    queryKey: ['readSingleChat', singleChatId],
    queryFn: ({ pageParam }) => fetchReadMessages(pageParam as ChatMessageParam),
    initialPageParam: { singleChatId, criteriaNumber },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.length === 0) return undefined;
      return { singleChatId, criteriaNumber: firstPage[0].messageNumber };
    },
    getNextPageParam: () => null,
    enabled: false,
  });
};
