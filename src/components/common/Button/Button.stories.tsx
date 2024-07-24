import type { Meta, StoryObj } from '@storybook/react';

import SButton from './Button';

const meta: Meta<typeof SButton> = {
  title: 'components/common/SButton',
  component: SButton,
  tags: ['common button'],
  args: {
    children: 'SButton',
    onClick: () => {
      console.log('click');
    },
    className: ''
  }
};

export default meta;

type Story = StoryObj<typeof SButton>;

export const Default: Story = {};
