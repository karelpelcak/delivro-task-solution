import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';
import { CardMockData } from './CardMockData';

const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const card: Story = {
    args: {
        ...CardMockData,
    },
};
