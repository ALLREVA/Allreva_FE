import { endPoint } from 'constants/endPoint';
import type { ChatListResponse, GroupChatInfoResponse, SingleChatInfoResponse } from 'types';
import { tokenAxios } from 'utils';

export const requestGetChatList = async () => {
  return await tokenAxios.get<ChatListResponse>(endPoint.GET_CHAT_LIST);
};

export const requestGetSingleChatInfo = async (chatId: number) => {
  return await tokenAxios.get<SingleChatInfoResponse>(endPoint.GET_SINGLE_CHAT_INFO(chatId));
};

export const requestGetGroupChatInfo = async (chatId: number) => {
  return await tokenAxios.get<GroupChatInfoResponse>(endPoint.GET_GROUP_CHAT_INFO(chatId));
};
