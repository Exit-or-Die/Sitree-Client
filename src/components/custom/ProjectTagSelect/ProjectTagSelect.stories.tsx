import type { Meta, StoryObj } from '@storybook/react';

import ProjectTagSelect from '.';

const meta: Meta<typeof ProjectTagSelect> = {
  title: 'components/custom/ProjectTagSelect',
  component: ProjectTagSelect,
  args: {
    className: '',
    onChange: () => {}
  }
};

export default meta;

type Story = StoryObj<typeof ProjectTagSelect>;

export const Default: Story = {};
