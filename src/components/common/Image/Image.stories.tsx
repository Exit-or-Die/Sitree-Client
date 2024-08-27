import type { Meta, StoryObj } from '@storybook/react';

import SImage from '.';

const meta: Meta<typeof SImage> = {
  title: 'components/common/SImage',
  component: SImage,
  tags: ['common image'],
  args: {
    src: 'https://photographylife.com/wp-content/uploads/2023/05/Nikon-Z8-Official-Samples-00002.jpg',
    alt: 'storybook image',
    onClick: () => {}
  }
};

export default meta;

type Story = StoryObj<typeof SImage>;

export const Default: Story = {};
