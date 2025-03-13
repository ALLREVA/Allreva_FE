import styled from '@emotion/styled';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { MoonLoader } from 'react-spinners';

import { FetchErrorFallback } from 'components/boundary';

interface FetchErrorBoundaryProps {
  children: ReactNode;
  loadingFallback?: ReactNode;
  onReset?: () => void;
}

export const FetchErrorBoundary = ({
  children,
  loadingFallback = (
    <SuspenseWrapper>
      <MoonLoader color="#5E45BF" />
    </SuspenseWrapper>
  ),
}: FetchErrorBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={FetchErrorFallback}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

const SuspenseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100vh;
  max-width: ${({ theme }) => theme.maxWidth};
`;
