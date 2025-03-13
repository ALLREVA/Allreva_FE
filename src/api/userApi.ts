import { endPoint } from 'constants/endPoint';
import type { ProfileSchemaType as UserUpdateRequest } from 'schemas';
import type { UserInfoResponse } from 'types';
import { tokenAxios } from 'utils';

const getUserInfo = async () => {
  const { data } = await tokenAxios.get<UserInfoResponse>(endPoint.GET_PROFILE);
  return data.result;
};

const updateUserProfile = async (profileData: UserUpdateRequest) => {
  const { data } = await tokenAxios.patch(endPoint.UPDATE_PROFILE, profileData);
  return data;
};

const checkNickName = async (nickname: string) => {
  const { data } = await tokenAxios.get(endPoint.CHECK_NICKNAME, {
    params: {
      nickname,
    },
  });

  return data;
};

export { getUserInfo, updateUserProfile, checkNickName };
