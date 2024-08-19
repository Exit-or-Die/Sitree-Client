import type { Meta, StoryObj } from '@storybook/react';

import STextarea from '.';

const meta: Meta<typeof STextarea> = {
  title: 'components/common/STextarea',
  component: STextarea,
  args: {
    className: '',
    onChange: () => {}
  }
};

export default meta;

type Story = StoryObj<typeof STextarea>;

export const Default: Story = {};
