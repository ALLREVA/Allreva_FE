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

  // Info
  http.get(`${API_URL}${endPoint.GET_GROUP_CHAT_INFO(1)}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {
        thumbnail: {
          url: 'https://www.news1.kr/_next/image?url=https%3A%2F%2Fi3n.news1.kr%2Fsystem%2Fphotos%2F2024%2F3%2F15%2F6537495%2Fhigh.jpg&w=1920&q=75',
        },
        title: '데이식스 천안 차대절 🎸',
        description: '데이식스 FOREVER YOUNG 천안 차대절 단체 채팅방 입니다!',
        me: {
          memberId: 1,
          nickname: '짱구',
          profileImage: {
            url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
          },
        },
        manager: {
          memberId: 1,
          nickname: '짱구',
          profileImage: {
            url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
          },
        },
        participants: [
          {
            memberId: 1,
            nickname: '짱구',
            profileImage: {
              url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
            },
          },
          {
            memberId: 2,
            nickname: '닉네임1',
            profileImage: {
              url: 'https://api.nudge-community.com/attachments/7728799',
            },
          },
        ],
      },
    });
  }),
  http.get(`${API_URL}${endPoint.GET_GROUP_CHAT_INFO(2)}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {
        thumbnail: {
          url: 'https://cf.asiaartistawards.com/news/21/2024/03/2024032008001572152_1.jpg',
        },
        title: '데이식스 광주 차대절 🎸',
        description: '데이식스 FOREVER YOUNG 광주 차대절 단체 채팅방 입니다!',
        me: {
          memberId: 1,
          nickname: '짱구',
          profileImage: {
            url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
          },
        },
        manager: {
          memberId: 2,
          nickname: '닉네임1',
          profileImage: {
            url: 'https://api.nudge-community.com/attachments/7728799',
          },
        },
        participants: [
          {
            memberId: 1,
            nickname: '짱구',
            profileImage: {
              url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
            },
          },
          {
            memberId: 2,
            nickname: '닉네임1',
            profileImage: {
              url: 'https://api.nudge-community.com/attachments/7728799',
            },
          },
        ],
      },
    });
  }),
  http.get(`${API_URL}${endPoint.GET_SINGLE_CHAT_INFO(3)}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {
        thumbnail: {
          url: 'https://api.nudge-community.com/attachments/7728799',
        },
        title: '성진',
        me: {
          memberId: 1,
          nickname: '짱구',
          profileImage: {
            url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
          },
        },
        otherMember: {
          memberId: 2,
          nickname: '성진',
          profileImage: {
            url: 'https://api.nudge-community.com/attachments/7728799',
          },
        },
      },
    });
  }),
  http.get(`${API_URL}${endPoint.GET_GROUP_CHAT_INFO(4)}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {
        thumbnail: {
          url: 'https://i.pinimg.com/474x/0c/6d/40/0c6d404b467dac040b026825e69fd6b9.jpg',
        },
        title: '데이식스 부산 차대절 🎸',
        description: '데이식스 FOREVER YOUNG 부산 차대절 단체 채팅방 입니다!',
        me: {
          memberId: 1,
          nickname: '짱구',
          profileImage: {
            url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
          },
        },
        manager: {
          memberId: 2,
          nickname: '닉네임1',
          profileImage: {
            url: 'https://api.nudge-community.com/attachments/7728799',
          },
        },
        participants: [
          {
            memberId: 1,
            nickname: '짱구',
            profileImage: {
              url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
            },
          },
          {
            memberId: 2,
            nickname: '닉네임1',
            profileImage: {
              url: 'https://api.nudge-community.com/attachments/7728799',
            },
          },
          {
            memberId: 3,
            nickname: '닉네임2',
            profileImage: {
              url: 'https://pbs.twimg.com/media/GQ0U0hJbEAA86Un.jpg:large',
            },
          },
        ],
      },
    });
  }),
  http.get(`${API_URL}${endPoint.GET_SINGLE_CHAT_INFO(5)}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {
        thumbnail: {
          url: 'https://pbs.twimg.com/media/GQ0U0hJbEAA86Un.jpg:large',
        },
        title: '도운',
        me: {
          memberId: 1,
          nickname: '짱구',
          profileImage: {
            url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMTRfMjkx/MDAxNjA3ODczNTIyMTY1.SWSlQJjMYvMZE3PcvMVkd2GLEECywGS9zi3Ps9eoh8sg.z9Gmy-mCezPiSkK0lTbzSaHSinbl5B4sBcT0o5W9ZnAg.JPEG.sosohan_n/24_(2).jpg?type=w800',
          },
        },
        otherMember: {
          memberId: 3,
          nickname: '도운',
          profileImage: {
            url: 'https://pbs.twimg.com/media/GQ0U0hJbEAA86Un.jpg:large',
          },
        },
      },
    });
  }),

  // edit chat
  http.patch(`${API_URL}${endPoint.UPDATE_GROUP_CHAT}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {},
    });
  }),

  // exit group chat
  http.delete(`${API_URL}${endPoint.LEAVE_GROUP_CHAT}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {},
    });
  }),

  // exit single chat
  http.delete(`${API_URL}${endPoint.LEAVE_SINGLE_CHAT}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {},
    });
  }),

  // delete group chat
  http.delete(`${API_URL}${endPoint.DELETE_GROUP_CHAT}`, () => {
    return HttpResponse.json({
      timeStamp: '2025-01-31T17:13:56.217Z',
      code: '200',
      message: 'Success',
      result: {},
    });
  }),
];
