import styled from '@emotion/styled';
import ChatItem from './components/ChatItem';

const ContentContainer = styled.div`
  padding: 1.6rem 0;
`;

const ChatList = styled.ul``;

const dummyData = [
  {
    id: '0',
    chatImg: 'https://photo.newsen.com/news_photo/2024/03/22/202403221104030410_4.jpeg',
    title: '데이식스 천안 차대절 🎸',
    members: 5,
    lastTime: '2025-01-21T22:14:41.488+09:00',
    lastChatContent: '마지막 메시지 입니다. 마지막 메시지 입니다.',
    lastChatNum: 6,
    readChatNum: 2,
  },
  {
    id: '1',
    chatImg: 'https://cf.asiaartistawards.com/news/21/2024/03/2024032008001572152_1.jpg',
    title: '데이식스 광주 차대절 🎸',
    members: 12,
    lastTime: '2025-01-20T22:14:41.488+09:00',
    lastChatContent: '마지막 메시지 입니다. 마지막 메시지 입니다.',
    lastChatNum: 24,
    readChatNum: 8,
  },
  {
    id: '2',
    chatImg: 'https://api.nudge-community.com/attachments/7728799',
    title: '성진',
    members: null,
    lastTime: '2025-01-19T22:14:41.488+09:00',
    lastChatContent: '마지막 메시지 입니다. 마지막 메시지 입니다.',
    lastChatNum: 6,
    readChatNum: 5,
  },
  {
    id: '3',
    chatImg: 'https://i.pinimg.com/474x/0c/6d/40/0c6d404b467dac040b026825e69fd6b9.jpg',
    title: '데이식스 부산 차대절 🎸',
    members: 24,
    lastTime: '2025-01-14T22:14:41.488+09:00',
    lastChatContent: '마지막 메시지 입니다. 마지막 메시지 입니다.',
    lastChatNum: 200,
    readChatNum: 15,
  },
  {
    id: '4',
    chatImg: 'https://pbs.twimg.com/media/GQ0U0hJbEAA86Un.jpg:large',
    title: '도운',
    members: null,
    lastTime: '2024-12-21T22:14:41.488+09:00',
    lastChatContent: '마지막 메시지 입니다. 마지막 메시지 입니다. ',
    lastChatNum: 6,
    readChatNum: 6,
  },
];

const Chat = () => {
  return (
    <ContentContainer>
      <ChatList>
        {dummyData.map((data) => (
          <ChatItem key={data.id} {...data} />
        ))}
      </ChatList>
    </ContentContainer>
  );
};

export default Chat;
