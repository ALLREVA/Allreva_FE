import { endPoint } from 'constants/endPoint';
import type { DepositFormResponse, PageParam, RentalFormData } from 'types';
import type {
  RentalAccountResponse,
  RentalDetailResponse,
  RentalListResponse,
  ManagingRentalListResponse,
  ManagingRentalDetailResponse,
} from 'types';
import { publicAxios, tokenAxios } from 'utils';

export const createRentalQuery = (filterQuery: string, pageParam: PageParam) => {
  const { lastId, lastEndDate } = pageParam;
  let pageQuery = lastId ? `lastId=${lastId}` : '';

  if (filterQuery.includes('CLOSING') && lastEndDate) {
    pageQuery += `&lastEndDate=${lastEndDate}`;
  }

  return pageQuery ? `${filterQuery}&${pageQuery}` : filterQuery;
};

export const requestGetRentalList = async (query: string) => {
  return await publicAxios.get<RentalListResponse>(`${endPoint.GET_RENT_LIST}?${query}`);
};

export const requestGetRentalDetails = async (id: string) => {
  return await tokenAxios.get<RentalDetailResponse>(endPoint.GET_RENT_DETAIL(id));
};

export const requestGetDepositAccount = async (id: string) => {
  return await tokenAxios.get<RentalAccountResponse>(endPoint.GET_DEPOSIT_ACCOUNT(id));
};

export const requestPostDepositForm = async (formData: string) => {
  return await tokenAxios.post<DepositFormResponse>(`${endPoint.APPLY_RENT_FORM}`, formData);
};

export const requestPostRentalForm = async (data: RentalFormData) => {
  return await tokenAxios.post(`${endPoint.CREATE_RENT_FORM}`, data);
};

export const requestGetManagingRentalList = async () => {
  const { data } = await tokenAxios.get<ManagingRentalListResponse>(endPoint.GET_CREATED_RENT_LIST);
  return data.result;
};

export const requestGetManagingRentalDetail = async (id: string, boardingDate: string) => {
  const { data } = await tokenAxios.get<ManagingRentalDetailResponse>(
    endPoint.GET_CREATED_RENT_DETAIL(id),
    {
      params: {
        boardingDate,
      },
    }
  );

  return data;
};

export const requestGetParticipatingRentalList = () => {};
