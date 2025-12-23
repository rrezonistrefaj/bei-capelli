'use client';

import ErrorBoundary from './ErrorBoundary';
import { ReactNode } from 'react';

interface ErrorBoundaryWrapperProps {
  children: ReactNode;
}

/**
 * Client component wrapper that provides error boundary functionality.
 * This is needed because the layout is a server component and error boundaries
 * must be client components.
 */
export default function ErrorBoundaryWrapper({ children }: ErrorBoundaryWrapperProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

