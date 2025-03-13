import type { BusInfo, DepositFormData, RentalFormFields } from 'types';

type DepositFormPlaceholder = Partial<Record<keyof DepositFormData, string>>;
type RentalFormPlaceholder = Partial<Record<keyof RentalFormFields | keyof BusInfo, string>>;

export const DEPOSIT_FORM_PLACEHOLDER: DepositFormPlaceholder = {
  depositorName: `성함을 입력해주세요`,
  depositorTime: `예시) 23:02`,
  phone: `010-1234-5678`,
  refundAccount: `예시) 우리은행 012345678910111`,
};

export const RENTAL_FORM_PLACEHOLDER: RentalFormPlaceholder = {
  title: `제목을 입력해주세요.`,
  region: `지역을 선택해주세요`,
  depositAccount: `예시) 우리은행 012345678910111 홍길동`,
  boardingArea: `상행 출발 장소를 입력해주세요`,
  upTime: `11:00`,
  downTime: `23:00`,
  busInfo: `차량을 선택해주세요`,
  maxPassenger: `25`,
  roundPrice: `30,000`,
  upTimePrice: `30,000`,
  downTimePrice: `30,000`,
  recruitmentCount: `20`,
  endDate: `날짜를 선택해주세요`,
  chatUrl: `https://open.kakao.com/o/abcDeF`,
  information: `전달할 안내 사항이 있다면 입력해주세요`,
};

export const SEARCH_PLACEHOLDER = {
  concert: `공연을 검색해주세요`,
  artist: `아티스트를 검색해주세요`,
};

export const CONCERT_RECORD_PLACEHOLDER = {
  date: `날짜를 선택해주세요`,
  seatName: `예시) 3층 309구역 B열 05번`,
  content: `공연에 대한 간단한 기록을 남겨주세요`,
};

export const SEAT_REVIEW_PLACEHOLDER = {
  seatName: `예시) 3층 309구역 B열 05번`,
  content: `좌석에 대한 간단한 후기를 작성해주세요`,
};

export type SearchPlaceholderKeys = keyof typeof SEARCH_PLACEHOLDER;
