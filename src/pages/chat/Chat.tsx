import styled from '@emotion/styled';
import { useEffect } from 'react';

import ChatItem from './components/ChatItem';

import { useGetChatList } from 'queries/chat';
import { useChatStore } from 'stores';

const ContentContainer = styled.div`
  padding: 1.6rem 0;
`;

const ChatList = styled.ul``;

const Chat = () => {
  const { data: chatList } = useGetChatList();
  const { chatRooms, updateChatRooms } = useChatStore(['chatRooms', 'updateChatRooms']);

  useEffect(() => {
    if (chatList) updateChatRooms(chatList);
  }, [chatList, chatRooms, updateChatRooms]);

  return (
    <ContentContainer>
      <ChatList>{chatRooms?.map((data) => <ChatItem key={data.roomId} {...data} />)}</ChatList>
    </ContentContainer>
  );
};

export default Chat;
