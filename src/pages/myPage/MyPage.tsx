import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import AccountStatus from './components/AccountStatus';
import ApplicationSection from './components/ApplicationSection';
import ManagementSection from './components/ManagementSection';
import UserProfile from './components/UserProfile';
import { extractAccountInfo } from './utils';

import { requestSignOut } from 'api';
import { FetchErrorBoundary } from 'components/boundary';
import { useGetUserInfo } from 'queries/user/useGetUserInfo';
import { useAuthStore } from 'stores';

const MyPage = () => {
  return (
    <MyPageContainer>
      <FetchErrorBoundary>
        <MyPageContent />
      </FetchErrorBoundary>
    </MyPageContainer>
  );
};

const MyPageContent = () => {
  const navigate = useNavigate();
  const { data: userInfo } = useGetUserInfo();
  const { clearAuthState } = useAuthStore(['clearAuthState']);
  const accountInfo = extractAccountInfo(userInfo);

  const logOutHandler = async () => {
    await requestSignOut();
    clearAuthState();
    navigate('/', { replace: true });
  };

  return (
    <>
      <UserProfile userInfo={userInfo} />
      <AccountStatus accountInfo={accountInfo} />
      <ManagementSection />
      <ApplicationSection />
      <LogoutBtnWrapper onClick={logOutHandler}>로그아웃</LogoutBtnWrapper>
    </>
  );
};

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 3.2rem;
  padding: 2.4rem;
  height: 100%;
`;

const LogoutBtnWrapper = styled.div`
  width: fit-content;
  font-size: 1.6rem;
  text-decoration: underline;
  cursor: pointer;
`;

export default MyPage;
