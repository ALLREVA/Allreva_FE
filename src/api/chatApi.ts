import { endPoint } from 'constants/endPoint';
import type { ChatListResponse } from 'types';
import { tokenAxios } from 'utils';

export const requestGetChatList = async () => {
  return await tokenAxios.get<ChatListResponse>(endPoint.GET_CHAT_LIST);
};
