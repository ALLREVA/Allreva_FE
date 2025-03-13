import styled from '@emotion/styled';
import { Outlet, useMatches } from 'react-router-dom';
import type { UIMatch } from 'react-router-dom';

import SubHeader from 'components/subHeader/SubHeader';

interface RouteHandle {
  title: string;
  isSharePage?: boolean;
  isTransparent?: boolean;
}

export const TitleHeaderLayout = () => {
  const matches = useMatches() as Array<UIMatch<unknown, RouteHandle>>;
  const activeRoute = matches[matches.length - 1];
  const { title, isSharePage, isTransparent } = activeRoute.handle;

  return (
    <>
      <SubHeader isSharePage={isSharePage} isTransparent={isTransparent} text={title} />
      <MainWrapper isTransparent={isTransparent}>
        <Outlet />
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.main<{ isTransparent?: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: ${({ isTransparent }) => (isTransparent ? '0' : '5.2rem')};
  min-height: 100vh;
  height: 100%;
`;
