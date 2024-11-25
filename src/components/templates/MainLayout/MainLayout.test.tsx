import { render, screen } from '@/tests/test-utils';

import SessionWrapper from '@/components/SessionWrapper';

import { MainLayout } from '.';

describe('MainLayout', () => {
  it('should render the children components', () => {
    render(
      <SessionWrapper>
        <MainLayout>
          <h1>MainLayout children</h1>
        </MainLayout>
      </SessionWrapper>
    );

    // Assert
    screen.getByRole('heading', { name: /MainLayout children/i });
  });
});
