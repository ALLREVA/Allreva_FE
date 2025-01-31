import { http, HttpResponse } from 'msw';

import { endPoint } from 'constants/endPoint';
import { API_URL } from 'constants/url';

export const handlers = [
  http.get(`${API_URL}${endPoint.GET_CHAT_LIST}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: [
        {
          roomId: 1,
          chatType: 'GROUP',
          chatInfoSummary: {
            title: '데이식스 천안 차대절 🎸',
            thumbnail: {
              url: 'https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F3%2F15%2F6537495%2Fhigh.jpg&w=1920&q=75',
            },
            headcount: 5,
          },
          previewMessage: {
            previewMessageNumber: 6,
            previewText: '마지막 메시지 입니다. 마지막 메시지 입니다.',
            sentAt: '2025-01-31T05:37:31.318Z',
          },
          lastReadMessageNumber: 2,
        },
        {
          roomId: 2,
          chatType: 'GROUP',
          chatInfoSummary: {
            title: '데이식스 광주 차대절 🎸',
            thumbnail: {
              url: 'https://cf.asiaartistawards.com/news/21/2024/03/2024032008001572152_1.jpg',
            },
            headcount: 12,
          },
          previewMessage: {
            previewMessageNumber: 24,
            previewText: '마지막 메시지 입니다. 마지막 메시지 입니다.',
            sentAt: '2025-01-30T14:14:41.318Z',
          },
          lastReadMessageNumber: 8,
        },
        {
          roomId: 3,
          chatType: 'SINGLE',
          chatInfoSummary: {
            title: '성진',
            thumbnail: {
              url: 'https://api.nudge-community.com/attachments/7728799',
            },
            headcount: 2,
          },
          previewMessage: {
            previewMessageNumber: 3,
            previewText: '마지막 메시지 입니다. 마지막 메시지 입니다.',
            sentAt: '2025-01-29T14:14:41.318Z',
          },
          lastReadMessageNumber: 2,
        },
        {
          roomId: 4,
          chatType: 'GROUP',
          chatInfoSummary: {
            title: '데이식스 부산 차대절 🎸',
            thumbnail: {
              url: 'https://i.pinimg.com/474x/0c/6d/40/0c6d404b467dac040b026825e69fd6b9.jpg',
            },
            headcount: 24,
          },
          previewMessage: {
            previewMessageNumber: 200,
            previewText: '마지막 메시지 입니다. 마지막 메시지 입니다.',
            sentAt: '2025-01-14T22:14:41.318Z',
          },
          lastReadMessageNumber: 15,
        },
        {
          roomId: 5,
          chatType: 'SINGLE',
          chatInfoSummary: {
            title: '도운',
            thumbnail: {
              url: 'https://pbs.twimg.com/media/GQ0U0hJbEAA86Un.jpg:large',
            },
            headcount: 2,
          },
          previewMessage: {
            previewMessageNumber: 3,
            previewText: '마지막 메시지 입니다. 마지막 메시지 입니다.',
            sentAt: '2024-12-21T22:14:41.318Z',
          },
          lastReadMessageNumber: 3,
        },
      ],
    });
  }),
];
