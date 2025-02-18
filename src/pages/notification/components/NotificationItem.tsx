import styled from '@emotion/styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TbBell } from 'react-icons/tb';

import type { Notification } from '../Notification';

import { endPoint } from 'constants/endPoint';
import { BodyRegularText, ChipText, TitleText2 } from 'styles/Typography';
import { formatFromNowDate, tokenAxios } from 'utils';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const queryClient = useQueryClient();

  const { mutate: patchRead } = useMutation({
    mutationFn: (notificationId: number) =>
      tokenAxios.patch(`${endPoint.PATCH_NOTIFICATION_READ}`, {
        id: notificationId,
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });

  const handlePatchRead = () => {
    if (!notification.read) {
      patchRead(notification.id);
      console.log(notification.id);
    }
  };

  return (
    <NotificationItemContainer onClick={handlePatchRead}>
      <NotificationIcon>
        <TbBellIcon size={28} />
      </NotificationIcon>
      <ContentWrapper>
        <NotificationTitle>
          <TitleText2>{notification.title}</TitleText2>
          {!notification.read && <NotificationDot />}
        </NotificationTitle>
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
  cursor: pointer;
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

const NotificationTitle = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
`;

const NotificationDot = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.colors.red};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default NotificationItem;
