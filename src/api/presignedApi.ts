import { endPoint } from 'constants/endPoint';
import type { PresignedUrlData, PresignedUrlResponse } from 'types';
import { publicAxios, tokenAxios } from 'utils';

export const requestPostPresignedUrl = async (data: PresignedUrlData) => {
  return await publicAxios.post<PresignedUrlResponse>(endPoint.UPDATE_PRESIGNED_URL, data);
};

export const requestDeletePresignedUrl = async (imageUrl: string) => {
  return await tokenAxios.post<PresignedUrlResponse>(
    `${endPoint.DELETE_PRESIGNED_URL}?url=${imageUrl}`
  );
};
