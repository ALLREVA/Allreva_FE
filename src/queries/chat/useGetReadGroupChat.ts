import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetReadGroupChat } from 'api';
import type { ChatMessage, GroupChatParam } from 'types';

const fetchReadMessages = async (pageParam: GroupChatParam) => {
  const { groupChatId, criteriaNumber } = pageParam;
  const { data } = await requestGetReadGroupChat(groupChatId, criteriaNumber);
  return data.result;
};

export const useGetReadGroupChat = (groupChatId: number, criteriaNumber?: number) => {
  return useInfiniteQuery<ChatMessage[] | []>({
    queryKey: ['readGroupChat', groupChatId],
    queryFn: ({ pageParam }) => fetchReadMessages(pageParam as GroupChatParam),
    initialPageParam: { groupChatId, criteriaNumber },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.length === 0) return undefined;
      return { groupChatId, criteriaNumber: firstPage[0].messageNumber };
    },
    getNextPageParam: () => null,
    enabled: false,
  });
};
