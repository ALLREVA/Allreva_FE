import { Client } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

import { SERVER_URL } from 'constants/url';
import { useAuthStore } from 'stores';

const useWebSocket = (id: string, type: 'single' | 'group') => {
  const { token } = useAuthStore(['token']);
  const [socket, setSocket] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const webSocketClient = (token: string) => {
    return new Client({
      webSocketFactory: () => new SockJS(`${SERVER_URL}/ws-chat`),
      connectHeaders: { Authorization: `${token}` },
      debug: (msg) => console.log('[STOMP Debug]:', msg),
      onDisconnect: () => console.log('WebSocket 연결 해제'),
      onWebSocketClose: (close) => console.warn('WebSocket 연결 종료:', close),
      onWebSocketError: (error) => console.error('WebSocket 연결 오류:', error),
      reconnectDelay: 5000,
    });
  };

  const connect = () => {
    if (!token) return;

    const newToken = token.replace('Bearer ', '');
    const client = webSocketClient(newToken);

    client.onConnect = (conn) => {
      console.log('WS 연결 성공:', conn);
      setIsConnected(true);
    };

    setSocket(client);
    client.activate();
  };

  const disConnect = () => {
    console.log('WS 연결 종료');
    if (socket) {
      void socket.deactivate();
      setSocket(null);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    connect();
    return () => disConnect();
  }, [token]);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const path = type === 'single' ? `/personal/room/${id}` : `/group/room/${id}`;

    const subscription = socket.subscribe(path, (message) => {
      if (message.body) {
        const receiveMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, receiveMessage]);
        console.log('receiveMessage', receiveMessage);
      }
    });

    return () => subscription.unsubscribe();
  }, [socket, isConnected, id, type]);

  return { socket, disConnect, messages, setMessages };
};

export default useWebSocket;
