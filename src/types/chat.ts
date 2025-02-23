import type { ApiResponse } from './api';

export type ChatType = 'SINGLE' | 'GROUP';
export type MessageType = 'TEXT' | 'IMAGE';

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

export interface ChatListItem {
  chatId: number;
  chatType: ChatType;
  chatInfoSummary: ChatInfoSummary;
  previewMessage: ChatPreviewMessage | null;
  lastReadMessageNumber: number;
}

export interface NewChatPreviewMessage {
  messageId: number;
  content: string;
  timestamp: string;
  sender: {
    id: number;
    name: string;
  };
}

export interface NewChatListItem {
  chatId: number;
  chatType: ChatType;
  previewMessage: NewChatPreviewMessage;
}

export interface SSEMessage {
  previewMessageResponse: NewChatListItem;
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

// edit group chat
export interface GroupChatData {
  groupChatId: number;
  title: string;
  description: string;
  imageFile: File;
}

// chat room
export interface MessageContent {
  contentType: MessageType;
  payload: string;
}

export interface ChatMessage {
  messageNumber: number;
  content: MessageContent;
  sender: {
    memberId: number;
    nickname: string;
    profileImage: {
      url: string;
    };
  };
  sentAt: string;
}

export interface EnterChat {
  myId: number;
  lastReadMessageNumber: number;
  messages: ChatMessage[] | [];
}

export interface SingleChatParam {
  singleChatId: number;
  criteriaNumber: number;
}

export interface GroupChatParam {
  groupChatId: number;
  criteriaNumber: number;
}

// join group chat
export interface JoinGroupChat {
  title: string;
  description: string;
  headcount: number;
  image: {
    url: string;
  };
}

export type ChatListResponse = ApiResponse<ChatListItem[]>;
export type SingleChatInfoResponse = ApiResponse<SingleChatInfo>;
export type GroupChatInfoResponse = ApiResponse<GroupChatInfo>;

export type CreateSingleChatResponse = ApiResponse<number>;
export type EnterSingleChatResponse = ApiResponse<EnterChat>;
export type ReadSingleChatResponse = ApiResponse<ChatMessage[]>;
export type UnreadSingleChatResponse = ApiResponse<ChatMessage[]>;

export type JoinGroupChatResponse = ApiResponse<JoinGroupChat>;
export type CreateGroupChatResponse = ApiResponse<number>;
export type EnterGroupChatResponse = ApiResponse<EnterChat>;
export type ReadGroupChatResponse = ApiResponse<ChatMessage[]>;
export type UnreadGroupChatResponse = ApiResponse<ChatMessage[]>;
