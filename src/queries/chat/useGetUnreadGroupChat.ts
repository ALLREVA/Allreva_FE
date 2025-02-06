import { useInfiniteQuery } from '@tanstack/react-query';

import { requestGetUnreadGroupChat } from 'api';
import type { ChatMessage, GroupChatParam } from 'types';

const fetchUnreadMessages = async (pageParam: GroupChatParam) => {
  const { groupChatId, criteriaNumber } = pageParam;
  const { data } = await requestGetUnreadGroupChat(groupChatId, criteriaNumber);
  return data.result;
};

export const useGetUnreadGroupChat = (groupChatId: number, criteriaNumber?: number) => {
  return useInfiniteQuery<ChatMessage[] | []>({
    queryKey: ['unreadGroupChat', groupChatId],
    queryFn: ({ pageParam }) => {
      return fetchUnreadMessages(pageParam as GroupChatParam);
    },
    initialPageParam: { groupChatId, criteriaNumber },
    getNextPageParam: (lastPage) => {
      if (lastPage.length === 0) return undefined;
      const lastData = lastPage[lastPage.length - 1];
      return { groupChatId, criteriaNumber: lastData.messageNumber };
    },
    enabled: false,
  });
};
