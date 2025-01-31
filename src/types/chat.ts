import type { ApiResponse } from './api';

export type ChatType = 'SINGLE' | 'GROUP';

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

export type ChatListResponse = ApiResponse<ChatList[]>;
