import { useMutation } from '@tanstack/react-query';

import { requestDeleteGroupChat } from 'api';

const deleteGroupChat = async (groupChatId: number) => {
  return await requestDeleteGroupChat(groupChatId);
};

export const useDeleteGroupChat = () => {
  return useMutation({
    mutationFn: deleteGroupChat,
    onSuccess: () => {
      console.log('단체 채팅 삭제 성공');
    },
    onError: (err) => {
      console.log('채팅방 나가기 오류: ', err);
    },
  });
};
