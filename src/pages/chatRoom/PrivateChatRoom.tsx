import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ChatInput from './components/ChatInput';
import Message from './components/Message';

import { useIntersectionObserver } from 'hooks';
import { useGetInitSingleChat, useGetUnreadSingleChat, useGetReadSingleChat } from 'queries/chat';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.6rem;
  padding: 1.6rem 2.4rem 2.4rem 2.4rem;
`;

const PrivateChatRoom = () => {
  const { id = '' } = useParams();
  const location = useLocation();
  const { lastReadMessageNum }: { lastReadMessageNum: number } = location.state || {};

  const [isInitScrollSet, setIsInitScrollSet] = useState(false);
  const [myId, setMyId] = useState<number | null>(null);
  const messageRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

  const { data: initChatMessages } = useGetInitSingleChat(parseInt(id));

  const {
    data: readMessages,
    fetchPreviousPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    refetch: refetchRead,
  } = useGetReadSingleChat(parseInt(id), initChatMessages?.messages[0]?.messageNumber);

  const {
    data: unreadMessages,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch: refetchUnread,
  } = useGetUnreadSingleChat(
    parseInt(id),
    initChatMessages?.messages[initChatMessages?.messages.length - 1]?.messageNumber
  );

  const readTargetRef = useIntersectionObserver(() => {
    if (!readMessages) void refetchRead();
    if (hasPreviousPage && !isFetchingPreviousPage) void fetchPreviousPage();
  });

  const unreadTargetRef = useIntersectionObserver(() => {
    if (!unreadMessages) void refetchUnread();
    if (hasNextPage && !isFetchingNextPage) void fetchNextPage();
  });

  useEffect(() => {
    if (isInitScrollSet || !initChatMessages) return;

    if (lastReadMessageNum) {
      const targetElement = messageRefs.current.get(lastReadMessageNum);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
        requestAnimationFrame(() => setIsInitScrollSet(true));
      }
    }

    setMyId(initChatMessages.myId);
  }, [setMyId, initChatMessages, lastReadMessageNum, isInitScrollSet]);

  return (
    <ContentContainer>
      <ChatContent>
        <div ref={isInitScrollSet ? readTargetRef : undefined} />
        {readMessages?.pages
          .flat()
          .map((message) => <Message key={message.messageNumber} message={message} myId={myId} />)}
        {initChatMessages?.messages.map((message) => (
          <Message
            key={message.messageNumber}
            message={message}
            myId={myId}
            ref={(el) => messageRefs.current.set(message.messageNumber, el)}
          />
        ))}
        {unreadMessages?.pages
          .flat()
          .map((message) => <Message key={message.messageNumber} message={message} myId={myId} />)}
        <div ref={isInitScrollSet ? unreadTargetRef : undefined} />
      </ChatContent>
      <ChatInput />
    </ContentContainer>
  );
};

export default PrivateChatRoom;
