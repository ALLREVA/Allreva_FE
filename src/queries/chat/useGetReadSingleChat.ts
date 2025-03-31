import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetReadSingleChat } from 'api';
import type { ChatMessage, SingleChatParam } from 'types';

const fetchReadMessages = async (pageParam: SingleChatParam) => {
  const { singleChatId, criteriaNumber } = pageParam;
  const { data } = await requestGetReadSingleChat(singleChatId, criteriaNumber);
  return data.result;
};

export const useGetReadSingleChat = (singleChatId: number, criteriaNumber?: number) => {
  return useInfiniteQuery<ChatMessage[] | []>({
    queryKey: ['readSingleChat', singleChatId],
    queryFn: ({ pageParam }) => fetchReadMessages(pageParam as SingleChatParam),
    initialPageParam: { singleChatId, criteriaNumber },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.length === 0) return undefined;
      return { singleChatId, criteriaNumber: firstPage[0].messageNumber };
    },
    getNextPageParam: () => null,
    enabled: false,
  });
};
