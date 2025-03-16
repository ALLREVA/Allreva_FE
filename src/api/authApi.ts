import { endPoint } from 'constants/endPoint';
import type { ProfileSchemaType as MemberRegister } from 'schemas';
import { tokenAxios } from 'utils';

export const requestPostSignUp = async (data: MemberRegister) => {
  return await tokenAxios.post(`${endPoint.SIGNUP}`, data);
};

export const requestSignOut = async () => {
  return await tokenAxios.get(endPoint.SIGNOUT);
};
