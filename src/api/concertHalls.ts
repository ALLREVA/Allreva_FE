import { endPoint } from 'constants/endPoint';
import { publicAxios } from 'utils';

const getConcertHallsList = async (
  address: string,
  seatScale: number | null,
  searchAfter?: [string, string, string] | null
) => {
  const PAGE_SIZE = 7;
  const params = new URLSearchParams();

  const hasAddressFilter = address !== '전체';
  const hasSeatScaleFilter = seatScale !== null;

  if (hasAddressFilter) params.append('address', address);

  if (hasSeatScaleFilter) {
    params.append('seatScale', seatScale.toString());
  }
  params.append('pageSize', PAGE_SIZE.toString());

  if (searchAfter) {
    params.append('searchAfter1', searchAfter[0].toString());

    if (hasAddressFilter || hasSeatScaleFilter) {
      params.append('searchAfter2', searchAfter[1]);
    }

    if (hasAddressFilter && hasSeatScaleFilter) {
      params.append('searchAfter3', searchAfter[2]);
    }
  }

  const response = await publicAxios.get(`${endPoint.GET_CONCERT_HALL_LIST}?${params.toString()}`);
  return response;
};

export { getConcertHallsList };
