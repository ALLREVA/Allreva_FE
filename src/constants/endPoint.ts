export const endPoint = {
  // Rent API
  GET_RENT_LIST: '/rents/list',
  GET_RENT_MAIN_LIST: '/rents/main',
  GET_CREATED_RENT_LIST: '/rents/register/list',
  GET_APPLIED_RENT_LIST: '/rents/join/list',
  GET_RENT_DETAIL: (id: string) => `/rents/${id}`,
  GET_CREATED_RENT_DETAIL: (id: string) => `/rents/${id}/register`,
  GET_DEPOSIT_ACCOUNT: (id: string) => `/rents/${id}/deposit-account`,

  // Rent Form API
  CREATE_RENT_FORM: '/rents',
  UPDATE_RENT_FORM: '/rents',
  APPLY_RENT_FORM: '/rents/apply',
  DELETE_APPLIED_RENT_FORM: '/rents/apply',
  UPDATE_APPLIED_RENT_FORM: '/rents/apply',
  CLOSE_RENT_FORM: '/rents/close',

  // Survey API
  GET_SURVEY_LIST: '/surveys/list',
  GET_CREATED_SURVEY_LIST: '/surveys/member/list',
  GET_APPLIED_SURVEY_LIST: '/surveys/member/apply/list',
  GET_SURVEY_DETAIL: (surveyId: string) => `/surveys/${surveyId}`,

  // Survey Form API
  CREATE_SURVEY_FORM: '/surveys',
  UPDATE_SURVEY_FORM: '/surveys',
  DELETE_SURVEY_FORM: '/surveys',
  APPLY_SURVEY_FORM: '/surveys/apply',

  // Auth API
  AUTH_KAKAO: '/auth/token/kakao',
  LOGIN_CHECK: '/auth/login/check',
  REISSUE_TOKEN: '/auth/token/reissue',
  SIGNIN: '/signin',
  SIGNUP: '/members/register',
  SIGNOUT: '/auth/logout',

  // User API
  GET_PROFILE: '/members',
  UPDATE_PROFILE: '/members/info',
  CHECK_NICKNAME: '/members/check-nickname',
  CREATE_REFUND_ACCOUNT: '/members/refund-account',
  UPDATE_REFUND_ACCOUNT: '/members/refund-account',
  DELETE_REFUND_ACCOUNT: '/members/refund-account',

  // Concert API
  GET_CONCERT_LIST: '/concerts/list',
  GET_CONCERT_DETAIL: (concertId: number) => `/concerts/${concertId}`,

  // Concert Hall API
  GET_CONCERT_HALL_LIST: '/concert-halls/list',
  GET_CONCERT_HALL: (hallCode: string) => `/concert-halls/${hallCode}`,
  GET_SEAT_REVIEW: '/seat-review',
  GET_RELATE_CONCERT: '/concert-halls/relate/list',

  // Search API
  GET_CONCERT_SEARCH: '/search/concert',
  GET_MORE_CONCERT_SEARCH: '/search/concert/list',
  GET_RENTS_SEARCH: '/search/rents',
  GET_MORE_RENTS_LIST: '/search/rents/list',
  GET_SURVEYS_SEARCH: '/search/surveys',
  GET_MORE_SURVEYS_SEARCH: '/search/surveys/list',
  GET_CONCERT_SEARCH_LIST: '/search/concert/list',
  GET_CONCERT_SEARCH_ALL: '/search/concert/list/all',
  SEARCH_ARTISTS: '/artists/search',
  SEARCH_POPULAR_KEYWORD: '/search/popular',

  // Concert Record API
  GET_CONCERT_RECORD_LIST: '/diaries/list',
  GET_CONCERT_RECORD_DETAILS: (diaryId: string) => `/diaries/${diaryId}`,
  CREATE_CONCERT_RECORD: '/diaries',
  UPDATE_CONCERT_RECORD: '/diaries',
  DELETE_CONCERT_RECORD: (diaryId: string) => `/diaries/${diaryId}`,

  // Alarm
  GET_NOTIFICATION_TOKEN: '/notifications/device-token',
  GET_NOTIFICATIONS: '/notifications',
  PATCH_NOTIFICATION_READ: '/notifications/read',

  // Presigned API
  UPDATE_PRESIGNED_URL: '/file/presigned-url',
  DELETE_PRESIGNED_URL: '/file/presigned-url',

  // Chat API
  GET_GROUP_CHAT_INVITCODE: (groupChatId: number) => `/chat/group/invitation/${groupChatId}`,
  GET_GROUP_CHAT_INFO: (groupChatId: number) => `/chat/group/${groupChatId}`,
  GET_JOIN_GROUP_CHAT: (uuid: string) => `/chat/group/${uuid}`,
  CREATE_GROUP_CHAT: '/chat/group/join',
  UPDATE_GROUP_CHAT: '/chat/group',
  DELETE_GROUP_CHAT: '/chat/group',
  LEAVE_GROUP_CHAT: '/chat/group/leave',
  GET_GROUP_CHAT_INIT_MESSAGES: '/message/group/enter',
  GET_GROUP_CHAT_READ_MESSAGES: '/message/group/read',
  GET_GROUP_CHAT_UNREAD_MESSAGES: '/message/group/unread',

  GET_SINGLE_CHAT_INFO: (singleChatId: number) => `/chat/single/${singleChatId}`,
  CREATE_SINGLE_CHAT: '/chat/single',
  LEAVE_SINGLE_CHAT: '/chat/single',
  GET_SINGLE_CHAT_INIT_MESSAGES: '/message/single/enter',
  GET_SINGLE_CHAT_READ_MESSAGES: '/message/single/read',
  GET_SINGLE_CHAT_UNREAD_MESSAGES: '/message/single/unread',

  GET_CHAT_LIST: '/chat/list',
  CHAT_SSE: `/chat/stream`,

  GROUP_CHAT_WS: (groupChatId: string) => `/group/connection/${groupChatId}`,
  SINGLE_CHAT_WS: (singleChatId: string) => `/single/connection/${singleChatId}`,

  // Presigned API
  UPDATE_PRESIGNED_URL: '/file/presigned-url',
  DELETE_PRESIGNED_URL: '/file/presigned-url',
};
