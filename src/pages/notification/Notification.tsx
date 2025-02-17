import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import NotificationItem from './components/NotificationItem';

import { endPoint } from 'constants/endPoint';
import { tokenAxios } from 'utils';

export interface Notification {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: number;
  title: string;
  message: string;
  recipientId: number;
  read: boolean;
}

interface NotificationResult {
  timeStamp: string;
  code: string;
  message: string;
  result: Notification[];
}

const Notification = () => {
  const getNotification = async () => {
    const response = await tokenAxios.get(endPoint.GET_NOTIFICATIONS);

    return response.data.result;
  };

  const { data } = useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: () => getNotification(),
  });

  return (
    <NotificationContainer>
      {data?.map((item) => <NotificationItem key={item.id} notification={item} />)}
    </NotificationContainer>
  );
};

const NotificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  gap: 1.6rem;
  height: 100%;
`;

export default Notification;
