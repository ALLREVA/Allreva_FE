import styled from '@emotion/styled';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { FallbackProps } from 'react-error-boundary';

export const FetchErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();

  const handleClickReset = () => {
    resetErrorBoundary();
    reset();
  };

  return (
    <ErrorContainer>
      <ErrorTitle>에러가 발생했습니다</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={handleClickReset}>다시 시도</RetryButton>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fef2f2;
  color: #b91c1c;
`;

const ErrorTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #dc2626;
  color: white;
  border-radius: 0.25rem;

  &:hover {
    background-color: #b91c1c;
  }
`;
