import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import type { TopNavData } from './types';

import { TitleText2 } from 'styles/Typography';

const TopNav = () => {
  /**
   * @TODO path 경로 지정
   */
  const topNavInfo: TopNavData = {
    rental: {
      name: '차 대절',
      path: '/bus-rental',
    },
    survey: {
      name: '수요 조사',
      path: '/surveys',
    },
    concert: {
      name: '공연 정보',
      path: '/concerts',
    },
    concertHall: {
      name: '공연장 정보',
      path: '/concert-halls',
    },
  };
  return (
    <TopNavContainer>
      {Object.entries(topNavInfo).map(([key, { name, path }]) => (
        <StyledLink key={key} to={path}>
          <TitleText2>{name}</TitleText2>
        </StyledLink>
      ))}
    </TopNavContainer>
  );
};

const TopNavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.2rem;
  padding: 0 2.4rem;
  white-space: nowrap;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.dark[700]};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
`;

export default TopNav;
