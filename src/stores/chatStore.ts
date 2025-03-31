import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { ChatListItem, NewChatListItem } from 'types';

interface ChatStore {
  chatRooms: ChatListItem[];
  updateChatRooms: (chatList: ChatListItem[]) => void;
  updateNewChat: (chatRoom: NewChatListItem) => void;
}

export const chatStore = createWithEqualityFn(
  immer<ChatStore>((set) => ({
    chatRooms: [],
    updateChatRooms: (chatList) => {
      set((state) => {
        state.chatRooms = chatList;
      });
    },
    updateNewChat: (chatRoom) => {
      set((state) => {
        const { chatId, chatType, previewMessage } = chatRoom;
        const existRoomIdx = state.chatRooms.findIndex((room) => room.chatId === chatRoom.chatId);
        const prevTargetRoom = existRoomIdx === -1 ? null : state.chatRooms[existRoomIdx];

        // 개인 채팅일 때만 목록에 존재하지 않음
        if (!prevTargetRoom && chatType === 'SINGLE') {
          state.chatRooms = [
            {
              chatId,
              chatType,
              chatInfoSummary: {
                title: previewMessage.sender.name,
                thumbnail: { url: '' }, // 추가 수정 필요
                headcount: 2,
              },
              previewMessage: {
                previewMessageNumber: previewMessage.messageId,
                previewText: previewMessage.content,
                sentAt: previewMessage.timestamp,
              },
              lastReadMessageNumber: 0,
            },
            ...state.chatRooms,
          ];
        }

        if (prevTargetRoom) {
          const targetRoom = {
            ...prevTargetRoom,
            previewMessage: {
              previewMessageNumber: previewMessage.messageId,
              previewText: previewMessage.content,
              sentAt: previewMessage.timestamp,
            },
          };

          state.chatRooms = [
            targetRoom,
            ...state.chatRooms.filter((room) => room.chatId !== chatRoom.chatId),
          ];
        }
      });
    },
  }))
);

export const useChatStore: StoreWithShallow<ChatStore> = (keys) =>
  useStoreWithShallow(chatStore, keys);
