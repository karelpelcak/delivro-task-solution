import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from './Avatar';

const meta = {
    title: 'Components/User/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const sideBox: Story = {
    args: {
        userInitials: 'Vy',
    },
};