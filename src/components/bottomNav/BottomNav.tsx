import styled from '@emotion/styled';
import { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { LuUserRound } from 'react-icons/lu';
import { TbMessageCircle, TbBell } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import type { BottomNavIcons, BottomNavKey } from './types';

import { ChipText } from 'styles/Typography';

const BottomNav = () => {
  const [selectedIcon, setSelectedIcon] = useState<BottomNavKey>('홈');
  const navigate = useNavigate();
  /**
   * @TODO path 경로 수정
   */
  const bottomNavIcons: BottomNavIcons = {
    홈: {
      icon: <BiHomeAlt size={20} />,
      path: '/',
    },
    채팅: {
      icon: <TbMessageCircle size={20} />,
      path: '/chat',
    },
    알림: {
      icon: <TbBell size={20} />,
      path: '/notifications',
    },
    MY: {
      icon: <LuUserRound size={20} />,
      path: '/mypage',
    },
  };

  const handleClick = (key: BottomNavKey) => {
    setSelectedIcon(key);
    navigate(bottomNavIcons[key].path);
  };

  return (
    <BottomNavContainer>
      {Object.entries(bottomNavIcons).map(([key, { icon }]) => (
        <IconWrapper
          isSelected={selectedIcon === key}
          key={key}
          onClick={() => handleClick(key as BottomNavKey)}
        >
          {icon}
          <ChipText>{key}</ChipText>
        </IconWrapper>
      ))}
    </BottomNavContainer>
  );
};

const BottomNavContainer = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 100%;
  height: 5.8rem;
  padding: 0.8rem 1.6rem;
  background-color: ${({ theme }) => theme.colors.dark[700]};
  z-index: 200;
`;

const IconWrapper = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.2rem;
  flex-shrink: 0;
  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.dark[300])};

  &:hover {
    cursor: pointer;
  }
`;

export default BottomNav;
