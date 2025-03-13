import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { endPoint } from 'constants/endPoint';
import { API_URL } from 'constants/url';
import { authStore } from 'stores/authStore';

let isTokenRefreshing = false;
const refreshSubscribers: ((token: string) => void)[] = [];

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const tokenAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
});

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

tokenAxios.interceptors.request.use((config) => {
  const token = authStore.getState().token;

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

tokenAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    try {
      const config = error.config as CustomInternalAxiosRequestConfig;

      if (error.response?.status === 401 && !config?._retry) {
        config._retry = true;

        if (!isTokenRefreshing) {
          isTokenRefreshing = true;

          try {
            const response = await axios.get(`${API_URL}${endPoint.REISSUE_TOKEN}`, {
              withCredentials: true,
              headers: { 'Content-Type': 'application/json' },
            });

            const newToken = response.headers['authorization'] as string;

            authStore.getState().setToken(newToken);

            const newConfig = { ...config };
            newConfig.headers.Authorization = newToken;

            return tokenAxios(newConfig);
          } catch (error) {
            console.error(error);
          } finally {
            // eslint-disable-next-line require-atomic-updates
            isTokenRefreshing = false;
          }
        } else {
          // 진행 중인 토큰 갱신 작업이 있는 경우 대기를 위함
          return new Promise((resolve) => {
            addRefreshSubscriber((token: string) => {
              const newConfig = { ...config };
              newConfig.headers.Authorization = token;

              resolve(tokenAxios(newConfig));
            });
          });
        }
      }

      return Promise.reject(error);
    } catch (interceptorError) {
      console.error('Interceptor error:', interceptorError);
      return Promise.reject(error);
    }
  }
);

export const publicAxios = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
