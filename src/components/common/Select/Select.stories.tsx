import type { Meta, StoryObj } from '@storybook/react';

import SSelect from '.';

const meta: Meta<typeof SSelect> = {
  title: 'components/common/SSelect',
  component: SSelect,
  tags: ['common input'],
  args: {
    options: ['option1', 'option2', 'option3'],
    onSelect: (selected) => {
      console.log('selected', selected);
    },
    placeholder: 'Select an option'
  }
};

export default meta;

type Story = StoryObj<typeof SSelect>;

export const Default: Story = {};
