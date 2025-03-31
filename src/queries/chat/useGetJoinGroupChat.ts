import { useQuery } from '@tanstack/react-query';

import { requestGetJoinGroupChat } from 'api';
import type { JoinGroupChat } from 'types';

export const useGetJoinGroupChat = (uuid: string) => {
  const fetchChatInfo = async () => {
    const { data } = await requestGetJoinGroupChat(uuid);
    return data.result;
  };

  return useQuery<JoinGroupChat>({
    queryKey: ['joinGroupChat', uuid],
    queryFn: fetchChatInfo,
    enabled: !!uuid,
    staleTime: 1000 * 60 * 5,
  });
};
