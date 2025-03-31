import { useMutation } from '@tanstack/react-query';

import { requestLeaveGroupChat } from 'api';

const exitSingleChat = async (singleChatId: number) => {
  return await requestLeaveGroupChat(singleChatId);
};

export const useLeaveSingleChat = () => {
  return useMutation({
    mutationFn: exitSingleChat,
    onSuccess: () => {
      console.log('개인 채팅 나가기 성공');
    },
    onError: (err) => {
      console.log('채팅방 나가기 오류: ', err);
    },
  });
};
