import type { Meta, StoryObj } from '@storybook/react';

import SImage from './Image';

const meta: Meta<typeof SImage> = {
  title: 'components/common/SImage',
  component: SImage,
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

type Story = StoryObj<typeof SImage>;

export const Default: Story = {};
