import { endPoint } from 'constants/endPoint';
import type {
  ChatListResponse,
  CreateGroupChatResponse,
  CreateSingleChatResponse,
  EnterGroupChatResponse,
  EnterSingleChatResponse,
  GroupChatInfoResponse,
  JoinGroupChatResponse,
  ReadGroupChatResponse,
  ReadSingleChatResponse,
  SingleChatInfoResponse,
  UnreadGroupChatResponse,
  UnreadSingleChatResponse,
} from 'types';
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

// Single Chat Room
export const requestPostSingleChat = async (otherMemberId: number) => {
  return await tokenAxios.post<CreateSingleChatResponse>(endPoint.CREATE_SINGLE_CHAT, {
    data: { otherMemberId },
  });
};

export const requestGetEnterSingleChat = async (singleChatId: number) => {
  return await tokenAxios.get<EnterSingleChatResponse>(
    `${endPoint.GET_SINGLE_CHAT_INIT_MESSAGES}?singleChatId=${singleChatId}`
  );
};

export const requestGetReadSingleChat = async (singleChatId: number, criteriaNumber: number) => {
  return await tokenAxios.get<ReadSingleChatResponse>(
    `${endPoint.GET_SINGLE_CHAT_READ_MESSAGES}?singleChatId=${singleChatId}&criteriaNumber=${criteriaNumber}`
  );
};

export const requestGetUnreadSingleChat = async (singleChatId: number, criteriaNumber: number) => {
  return await tokenAxios.get<UnreadSingleChatResponse>(
    `${endPoint.GET_SINGLE_CHAT_UNREAD_MESSAGES}?singleChatId=${singleChatId}&criteriaNumber=${criteriaNumber}`
  );
};

// Group Chat Room
export const requestGetJoinGroupChat = async (uuid: string) => {
  return await tokenAxios.get<JoinGroupChatResponse>(endPoint.GET_JOIN_GROUP_CHAT(uuid));
};

export const requestPostGroupChat = async (uuid: string) => {
  return await tokenAxios.post<CreateGroupChatResponse>(endPoint.CREATE_GROUP_CHAT, {
    data: { uuid },
  });
};

export const requestGetEnterGroupChat = async (groupChatId: number) => {
  return await tokenAxios.get<EnterGroupChatResponse>(
    `${endPoint.GET_GROUP_CHAT_INIT_MESSAGES}?groupChatId=${groupChatId}`
  );
};

export const requestGetReadGroupChat = async (groupChatId: number, criteriaNumber: number) => {
  return await tokenAxios.get<ReadGroupChatResponse>(
    `${endPoint.GET_GROUP_CHAT_READ_MESSAGES}?groupChatId=${groupChatId}&criteriaNumber=${criteriaNumber}`
  );
};

export const requestGetUnreadGroupChat = async (groupChatId: number, criteriaNumber: number) => {
  return await tokenAxios.get<UnreadGroupChatResponse>(
    `${endPoint.GET_GROUP_CHAT_UNREAD_MESSAGES}?groupChatId=${groupChatId}&criteriaNumber=${criteriaNumber}`
  );
};
