import type { Meta, StoryObj } from '@storybook/react';

import CommonButton from './Button';

const meta: Meta<typeof CommonButton> = {
  title: 'components/common/CommonButton',
  component: CommonButton,
  tags: ['common button'],
  args: {
    children: 'CommonButton',
    onClick: () => {
      console.log('click');
    },
    className: ''
  }
};

export default meta;

type Story = StoryObj<typeof CommonButton>;

export const Default: Story = {};
