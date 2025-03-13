import { useMutation } from '@tanstack/react-query';

import { requestPostSignUp } from 'api';
import type { ProfileSchemaType as MemberRegister } from 'schemas';

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: async (registerData: MemberRegister) => {
      return await requestPostSignUp(registerData);
    },

    onSuccess: () => {
      console.log('회원 가입 성공');
    },
    onError: (err) => {
      console.log('회원 가입 오류: ', err);
    },
  });
};
