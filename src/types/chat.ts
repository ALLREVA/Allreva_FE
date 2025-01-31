import type { ApiResponse } from './api';

export type ChatType = 'SINGLE' | 'GROUP';

// chat list
export interface ChatInfoSummary {
  title: string;
  thumbnail: {
    url: string;
  };
  headcount: number;
}

export interface ChatPreviewMessage {
  previewMessageNumber: number;
  previewText: string;
  sentAt: string;
}

export interface ChatList {
  roomId: number;
  chatType: ChatType;
  chatInfoSummary: ChatInfoSummary;
  previewMessage: ChatPreviewMessage;
  lastReadMessageNumber: number;
}

// chat info
export interface MemberInfo {
  memberId: number;
  nickname: string;
  profileImage: {
    url: string;
  };
}

export interface SingleChatInfo {
  thumbnail: { url: string };
  title: string;
  me: MemberInfo;
  otherMember: MemberInfo;
}

export interface GroupChatInfo {
  thumbnail: { url: string };
  title: string;
  description: string;
  me: MemberInfo;
  manager: MemberInfo;
  participants: MemberInfo[];
}

export interface ChatInfo {
  thumbnail: { url: string };
  title: string;
  description?: string;
  me: MemberInfo;
  manager?: MemberInfo;
  participants?: MemberInfo[];
  otherMember?: MemberInfo;
}

// Edit Group Chat
export interface GroupChatData {
  groupChatId: number;
  title: string;
  description: string;
  imageFile: File;
}

export type ChatListResponse = ApiResponse<ChatList[]>;
export type SingleChatInfoResponse = ApiResponse<SingleChatInfo>;
export type GroupChatInfoResponse = ApiResponse<GroupChatInfo>;
