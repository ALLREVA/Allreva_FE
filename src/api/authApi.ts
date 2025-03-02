import { endPoint } from 'constants/endPoint';
import type { MemberRegister } from 'types';
import { tokenAxios } from 'utils';

export const requestPostSignUp = async (data: MemberRegister) => {
  return await tokenAxios.post(`${endPoint.SIGNUP}`, data);
};
