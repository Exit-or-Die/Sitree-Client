import type { Meta, StoryObj } from '@storybook/react';

import SInput from '.';

const meta: Meta<typeof SInput> = {
  title: 'components/common/SInput',
  component: SInput,
  tags: ['common input'],
  args: {
    className: '',
    onChange: () => {}
  }
};

export default meta;

type Story = StoryObj<typeof SInput>;

export const Default: Story = {};
