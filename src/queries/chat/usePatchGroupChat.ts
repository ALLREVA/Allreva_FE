import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestPatchGroupChat } from 'api';
import type { GroupChatData } from 'types';

const updateGroupChat = async (chatData: GroupChatData) => {
  const formData = new FormData();
  const { imageFile, ...rest } = chatData;

  formData.append('imageFile', imageFile);
  formData.append('request', JSON.stringify(rest));

  return await requestPatchGroupChat(formData);
};

export const usePatchGroupChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateGroupChat,
    onSuccess: async (_, variables: GroupChatData) => {
      await queryClient.invalidateQueries({ queryKey: ['chatInfo', variables.groupChatId] });
    },
    onError: (err) => {
      console.log('채팅방 수정 오류: ', err);
    },
  });
};
