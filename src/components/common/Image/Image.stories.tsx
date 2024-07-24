import type { Meta, StoryObj } from '@storybook/react';

import CommonImage from './Image';

const meta: Meta<typeof CommonImage> = {
  title: 'components/common/CommonImage',
  component: CommonImage,
  tags: ['common image'],
  args: {
    src: '',
    alt: 'storybook image',
    onClick: () => {
      console.log('common image');
    }
  }
};

export default meta;

type Story = StoryObj<typeof CommonImage>;

export const Default: Story = {};
