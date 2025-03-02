import styled from '@emotion/styled';
import { useEffect } from 'react';
import { TbMessageChatbot } from 'react-icons/tb';

import ChatItem from './components/ChatItem';

import { useGetChatList } from 'queries/chat';
import { useChatStore } from 'stores';
import { BodyRegularText } from 'styles/Typography';

const ContentContainer = styled.div`
  padding: 1.6rem 0;
`;

const EmptyChatList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;
  padding: 24rem 0;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
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
      {chatRooms.length === 0 ? (
        <EmptyChatList>
          <TbMessageChatbot size={64} />
          <BodyRegularText>참여 중인 채팅이 없어요</BodyRegularText>
        </EmptyChatList>
      ) : (
        <ChatList>{chatRooms?.map((data) => <ChatItem key={data.chatId} {...data} />)}</ChatList>
      )}
    </ContentContainer>
  );
};

export default Chat;
