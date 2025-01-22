import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import type { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

import type { ButtonColor, ButtonSize, ButtonVariant } from './types';

import { MediumButtonText } from 'styles/Typography';

interface BaseButtonColor {
  color: ButtonColor;
}

interface BaseButtonStyle extends BaseButtonColor {
  variant: ButtonVariant;
  size: ButtonSize;
  isFullWidth?: boolean;
}

interface BaseButtonProps extends BaseButtonStyle {
  children: React.ReactNode;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit';
  to?: string;
}

const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 8.8rem;
  padding: 0 1.2rem;
  text-decoration: none;
`;

const FilledStyle = ({ color, theme }: BaseButtonColor & { theme: Theme }) => css`
  background-color: ${color === 'primary' ? theme.colors.primary : theme.colors.dark[500]};
  color: ${theme.colors.white};

  &:active,
  &:hover {
    background-color: ${color === 'primary' ? theme.colors.primaryDark : theme.colors.dark[700]};
    transition: none;
  }

  &:disabled {
    background-color: ${color === 'primary' ? theme.colors.dark[500] : theme.colors.dark[700]};
    color: ${theme.colors.dark[300]};
  }
`;

const OutlineStyle = ({ color, theme }: BaseButtonColor & { theme: Theme }) => css`
  border: 1px solid ${color === 'primary' ? theme.colors.primary : theme.colors.dark[500]};
  background-color: transparent;
  color: ${color === 'primary' ? theme.colors.primary : theme.colors.dark[300]};

  &:active,
  &:hover {
    border-color: ${color === 'primary' ? theme.colors.primaryDark : theme.colors.dark[300]};
    color: ${color === 'primary' ? theme.colors.primaryDark : theme.colors.dark[200]};
    transition: none;
  }

  &:disabled {
    border-color: ${theme.colors.dark[500]};
    color: ${theme.colors.dark[500]};
  }
`;

const StyledButton = styled.button<BaseButtonStyle>`
  ${baseStyles}
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  height: ${({ size }) => (size === 'medium' ? '4.8rem' : '4rem')};
  border-radius: ${({ size }) => (size === 'medium' ? '8px' : '4px')};
  transition:
    background-color 0.4s,
    color 0.4s;

  ${({ variant, color, theme }) =>
    variant === 'fill' ? FilledStyle({ color, theme }) : OutlineStyle({ color, theme })}

  &:disabled {
    pointer-events: none;
  }
`;

const StyledLink = styled(Link)<BaseButtonStyle>`
  ${baseStyles}
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'fit-content')};
  height: ${({ size }) => (size === 'medium' ? '4.8rem' : '4rem')};
  border-radius: ${({ size }) => (size === 'medium' ? '8px' : '4px')};

  ${({ variant, color, theme }) =>
    variant === 'fill' ? FilledStyle({ color, theme }) : OutlineStyle({ color, theme })}
`;

const BaseButton = ({
  variant,
  size,
  color,
  children,
  isDisabled,
  onClick,
  isFullWidth = true,
  type = 'button',
  to,
}: BaseButtonProps) => {
  if (to) {
    return (
      <StyledLink color={color} isFullWidth={isFullWidth} size={size} to={to} variant={variant}>
        <MediumButtonText>{children}</MediumButtonText>
      </StyledLink>
    );
  }

  return (
    <StyledButton
      color={color}
      disabled={isDisabled}
      isFullWidth={isFullWidth}
      onClick={onClick}
      size={size}
      type={type}
      variant={variant}
    >
      <MediumButtonText>{children}</MediumButtonText>
    </StyledButton>
  );
};

export default BaseButton;
