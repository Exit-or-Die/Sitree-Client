'use client';

import { render, screen } from '@/tests/test-utils';
import { SessionProvider } from 'next-auth/react';

import { MainLayout } from '.';

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <SessionProvider>
        <MainLayout>
          <h1>MainLayout children</h1>
        </MainLayout>
      </SessionProvider>
    );

    // Assert
    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
