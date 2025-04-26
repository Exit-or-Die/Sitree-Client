import type { Meta, StoryObj } from '@storybook/react';

import STooltip from '.';

const meta: Meta<typeof STooltip> = {
  title: 'components/common/STooltip',
  component: STooltip,
  args: {
    children: (
      <div>
        test tooltip content
        <ul>
          <li>111</li>
          <li>222</li>
          <li>333</li>
        </ul>
      </div>
    )
  }
};

export default meta;

type Story = StoryObj<typeof STooltip>;

export const Default: Story = {};
