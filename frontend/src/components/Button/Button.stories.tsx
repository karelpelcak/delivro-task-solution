import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './Button';
import { Plus } from 'lucide-react';

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const button: Story = {
    args: {
        label: "Button",
        icon: <Plus strokeWidth={3}/>
    }
};
