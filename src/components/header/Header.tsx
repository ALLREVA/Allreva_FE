import styled from '@emotion/styled';
import { FaUser } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import logoTitle from 'assets/logoTitle.svg';
import { useAuthStore } from 'stores';
import { TitleText2, CaptionText } from 'styles/Typography';

const Header = () => {
  const { userProfile } = useAuthStore(['isLoggedIn', 'userProfile']);

  console.log(userProfile);
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <img alt="logoTitle" src={logoTitle} />
      </StyledLink>
      <Wrapper>
        <StyledLink to="/search">
          <IoSearch size={24} />
        </StyledLink>
        {userProfile !== null ? (
          <UserProfileWrapper>
            <ProfileLink to="/mypage">
              {userProfile?.profileImageUrl ? (
                <ProfileImage alt="프로필 이미지" src={userProfile?.profileImageUrl} />
              ) : (
                <DefaultProfileIcon>
                  <FaUser size={16} />
                </DefaultProfileIcon>
              )}
              <CaptionText>{userProfile?.nickname}</CaptionText>
            </ProfileLink>
          </UserProfileWrapper>
        ) : (
          <StyledLink to="/signin">
            <TitleText2>로그인</TitleText2>
          </StyledLink>
        )}
      </Wrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 36rem;
  height: 5.2rem;
  padding: 0 1.6rem;
  background-color: ${({ theme }) => theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark[500]};

  img {
    width: 11rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  color: ${({ theme }) => theme.colors.white};
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileLink = styled(StyledLink)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const ProfileImage = styled.img`
  max-width: 3.2rem;
  max-height: 3.2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultProfileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.dark[200]};
  color: ${({ theme }) => theme.colors.white};
`;

export default Header;
