import { useMutation } from '@tanstack/react-query';

import { requestLeaveGroupChat } from 'api';

const exitGroupChat = async (groupChatId: number) => {
  return await requestLeaveGroupChat(groupChatId);
};

export const useLeaveGroupChat = () => {
  return useMutation({
    mutationFn: exitGroupChat,
    onSuccess: () => {
      console.log('단체 채팅 나가기 성공');
    },
    onError: (err) => {
      console.log('채팅방 나가기 오류: ', err);
    },
  });
};
