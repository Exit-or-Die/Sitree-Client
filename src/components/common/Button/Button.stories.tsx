import type { Meta, StoryObj } from '@storybook/react';

import SButton from '.';

const meta: Meta<typeof SButton> = {
  title: 'components/common/SButton',
  component: SButton,
  tags: ['common button'],
  args: {
    children: '버튼 테스트',
    onClick: () => {},
    className: ''
  }
};

export default meta;

type Story = StoryObj<typeof SButton>;

export const Default: Story = {};
