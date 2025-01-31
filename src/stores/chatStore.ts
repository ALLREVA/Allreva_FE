import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';

import type { StoreWithShallow } from './utils';
import { useStoreWithShallow } from './utils';

import type { ChatList } from 'types';

interface ChatStore {
  chatRooms: ChatList[];
  updateChatRooms: (chatList: ChatList[]) => void;
  updateNewChat: (chatRoom: ChatList) => void;
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
        const existRoomIdx = state.chatRooms.findIndex((room) => room.roomId === chatRoom.roomId);
        let updatedChatList;

        if (existRoomIdx === -1) {
          updatedChatList = [chatRoom, ...state.chatRooms];
        } else {
          updatedChatList = [
            chatRoom,
            ...state.chatRooms.filter((room) => room.roomId !== chatRoom.roomId),
          ];
        }

        return updatedChatList;
      });
    },
  }))
);

export const useChatStore: StoreWithShallow<ChatStore> = (keys) =>
  useStoreWithShallow(chatStore, keys);
