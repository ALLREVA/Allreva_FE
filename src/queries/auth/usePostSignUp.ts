import { useMutation } from '@tanstack/react-query';

import { requestPostSignUp } from 'api';
import type { MemberRegister } from 'types';

const signUp = async (registerData: MemberRegister) => {
  return await requestPostSignUp(registerData);
};

export const usePostSignUp = () => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      console.log('회원 가입 성공');
    },
    onError: (err) => {
      console.log('회원 가입 오류: ', err);
    },
  });
};
