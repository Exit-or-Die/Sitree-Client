import type { Meta, StoryObj } from '@storybook/react';

import SEditor from '.';

const meta: Meta<typeof SEditor> = {
  title: 'components/common/SEditor',
  component: SEditor,
  tags: ['common button'],
  args: {}
};

export default meta;

type Story = StoryObj<typeof SEditor>;

export const Default: Story = {};
