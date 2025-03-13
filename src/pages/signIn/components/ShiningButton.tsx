import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { MediumButtonText } from 'styles/Typography';

interface ShiningButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

const ShiningButton = ({ onClick, children }: ShiningButtonProps) => {
  return (
    <GlowingButton onClick={onClick}>
      <MediumButtonText>{children}</MediumButtonText>
    </GlowingButton>
  );
};

const shiningEffect = keyframes`
  0% {
    box-shadow: -10px 0 10px -10px transparent;
  }
  25% {
    box-shadow: 0 0 20px 0px rgba(255, 255, 255, 0.7);
  }
  50% {
    box-shadow: 10px 0 10px -10px transparent;
  }
  100% {
    box-shadow: -10px 0 10px -10px transparent;
  }
`;

const GlowingButton = styled.button`
  width: 100%;
  height: 5.4rem;
  border-radius: 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.dark[100]};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.dark[100]};
  position: relative;
  overflow: hidden;
  animation: ${shiningEffect} 3s infinite;
  transition: all 0.3s;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    transform: skewX(-25deg);
    animation: shine 3s infinite;
  }

  &:hover {
    background-color: #fae100;
    color: ${({ theme }) => theme.colors.dark[800]};
    border-color: transparent;
  }

  @keyframes shine {
    0% {
      left: -100%;
    }
    50% {
      left: 100%;
    }
    100% {
      left: 100%;
    }
  }
`;

export default ShiningButton;
