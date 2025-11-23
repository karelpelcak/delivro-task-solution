import type { Meta, StoryObj } from '@storybook/nextjs';
import Dropdown from './Dropdown';
import { Apple, Banana, Carrot, icons } from 'lucide-react';
import { useState } from 'react';

const meta = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const DropdownWrapper = () => {
    const [values, setValues] = useState<string[]>([]);

    return (
        <div className="p-6">
            <Dropdown
                options={[
                    { label: 'Jablko', value: 'apple' },
                    { label: 'Banán', value: 'banana' },
                    { label: 'Mrkev', value: 'carrot' },
                ]}
                values={values}
                onChange={setValues}
                placeholder="Vyber položky"
            />
        </div>
    );
};

export const dropdown: Story = {
    //@ts-expect-error
    args: {},
    render: () => <DropdownWrapper />,
};
