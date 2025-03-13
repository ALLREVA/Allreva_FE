import type { UserInfo, BankAccount } from 'types';

export const extractAccountInfo = (userInfo: UserInfo): BankAccount | null => {
  if (!userInfo?.bank || !userInfo?.number) {
    return null;
  }

  return {
    bank: userInfo.bank,
    number: userInfo.number,
  };
};
