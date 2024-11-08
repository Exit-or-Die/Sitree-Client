import type { Meta, StoryObj } from '@storybook/react';

import SDropdown from '.';

const meta: Meta<typeof SDropdown> = {
  title: 'components/common/SDropdown',
  component: SDropdown,
  tags: ['common button'],
  args: {
    onChange: () => {},
    options: ['123', '456']
  }
};

export default meta;

type Story = StoryObj<typeof SDropdown>;

export const Default: Story = {};
