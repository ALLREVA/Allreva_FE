import styled from '@emotion/styled';
import { TbBell } from 'react-icons/tb';

import type { Notification } from '../Notification';

import { BodyRegularText, ChipText, TitleText2 } from 'styles/Typography';
import { formatFromNowDate } from 'utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  return (
    <NotificationItemContainer>
      <NotificationIcon>
        <TbBellIcon size={28} />
      </NotificationIcon>
      <ContentWrapper>
        <TitleText2>{notification.title}</TitleText2>
        <BodyRegularText>{notification.message}</BodyRegularText>
        <ChipText>{formatFromNowDate(notification.createdAt)}</ChipText>
      </ContentWrapper>
    </NotificationItemContainer>
  );
};

const NotificationItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  min-height: 14rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  padding: 1.2rem 2.2rem;
`;

const NotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.colors.dark[100]};
`;

const TbBellIcon = styled(TbBell)`
  fill: ${({ theme }) => theme.colors.dark[300]};
  color: ${({ theme }) => theme.colors.dark[300]};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default NotificationItem;
