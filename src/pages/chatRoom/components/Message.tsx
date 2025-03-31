import { forwardRef } from 'react';

import MyChat from './MyChat';
import OtherChat from './OtherChat';

import type { ChatMessage } from 'types';
import { formatTime } from 'utils';

interface ChatMessageProps {
  message: ChatMessage;
  myId: number | null;
}

const Message = forwardRef<HTMLDivElement, ChatMessageProps>(({ message, myId }, ref) => {
  return (
    <div ref={ref}>
      {message.sender.memberId === myId ? (
        <MyChat
          content={message.content.payload}
          contentType={message.content.contentType}
          time={formatTime(message.sentAt)}
        />
      ) : (
        <OtherChat
          content={message.content.payload}
          contentType={message.content.contentType}
          nickname={message.sender.nickname}
          profileImg={message.sender.profileImage.url}
          time={formatTime(message.sentAt)}
        />
      )}
    </div>
  );
});

export default Message;
