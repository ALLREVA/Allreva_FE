import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useRef } from 'react';

import { endPoint } from 'constants/endPoint';
import { API_URL } from 'constants/url';
import { useAuthStore, useChatStore } from 'stores';
import type { SSEMessage } from 'types';

export const useSSE = () => {
  const { setIsLoggedIn, setToken } = useAuthStore(['setIsLoggedIn', 'setToken']);
  const { updateNewChat } = useChatStore(['updateNewChat']);
  const sseRef = useRef<EventSourcePolyfill | null>(null);

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${API_URL}${endPoint.REISSUE_TOKEN}`, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      const newToken: string = response.headers['authorization'];

      if (newToken) setIsLoggedIn();
      setToken(newToken);

      return newToken;
    } catch (error) {
      console.error('토큰 재발급 실패:', error);
      return null;
    }
  };

  const subscribeSSE = (token: string | null) => {
    if (sseRef.current) {
      sseRef.current.close();
    }

    if (!token) return;

    const sseEvents = new EventSourcePolyfill(`${API_URL}${endPoint.CHAT_SSE}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    // EventSourcePolyfill 기본 error 로그 비활성화 - No activity within 45000 milliseconds
    console.error = function () {};

    sseEvents.onopen = () => {
      console.log('SSE 연결 성공');
    };

    sseEvents.onmessage = (event) => {
      const data: SSEMessage = JSON.parse(event.data as string);
      updateNewChat(data.previewMessageResponse);
    };

    sseEvents.onerror = async (error) => {
      // @ts-expect-error - EventSource의 status 속성 접근
      if (error.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
          subscribeSSE(newToken);
        }
      }
    };

    sseRef.current = sseEvents;
  };

  useEffect(() => {
    return () => {
      if (sseRef.current) {
        sseRef.current.close();
        sseRef.current = null;
        console.log('SSE 연결 종료');
      }
    };
  }, []);

  return { subscribeSSE };
};
