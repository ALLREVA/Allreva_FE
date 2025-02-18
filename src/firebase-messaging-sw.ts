import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { endPoint } from 'constants/endPoint';
import { tokenAxios } from 'utils/axios';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'allreva-86be8.firebaseapp.com',
  projectId: 'allreva-86be8',
  storageBucket: 'allreva-86be8.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

export async function requestPermission() {
  console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한이 허용되지 않았습니다');
    return;
  }

  console.log('알림 권한이 허용되었습니다');

  const token = await getToken(messaging, {
    vapidKey: import.meta.env.VITE_VAPID_KEY,
  });

  if (token) {
    console.log('token: ', token);

    try {
      await tokenAxios.post(endPoint.GET_NOTIFICATION_TOKEN, { deviceToken: token });
    } catch (error) {
      console.error('토큰 전송에 실패했습니다', error);
    }
  } else {
    console.log('token을 얻을 수 없습니다');
  }

  onMessage(messaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
  });
}
