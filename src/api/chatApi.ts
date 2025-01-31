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

export const requestPatchGroupChat = async (formData: FormData) => {
  return await tokenAxios.patch(endPoint.UPDATE_GROUP_CHAT, formData);
};

export const requestDeleteGroupChat = async (groupChatId: number) => {
  return await tokenAxios.delete(endPoint.DELETE_GROUP_CHAT, { data: { groupChatId } });
};

export const requestLeaveGroupChat = async (groupChatId: number) => {
  return await tokenAxios.delete(endPoint.LEAVE_GROUP_CHAT, { data: { groupChatId } });
};

export const requestLeaveSingleChat = async (singleChatId: number) => {
  return await tokenAxios.delete(endPoint.LEAVE_SINGLE_CHAT, { data: { singleChatId } });
};
