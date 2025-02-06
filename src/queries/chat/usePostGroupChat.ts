import { useMutation } from '@tanstack/react-query';

import { requestPostJoinGroupChat } from 'api';

const createGroupChat = async (uuid: string) => {
  const { data } = await requestPostJoinGroupChat(uuid);
  return data.result;
};

export const usePostGroupChat = () => {
  return useMutation({
    mutationFn: createGroupChat,
    onSuccess: () => {},
    onError: (err) => {
      console.log('채팅방 수정 오류: ', err);
    },
  });
};
