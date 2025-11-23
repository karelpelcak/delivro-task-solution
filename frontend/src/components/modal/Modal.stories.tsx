import type { Meta, StoryObj } from '@storybook/nextjs';
import Modal from './Modal';
import { useState } from 'react';
import Button from '../Button/Button';

const meta = {
    title: 'Components/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalWrapper = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">
            <Button
                onClick={() => setOpen(true)}
                label='Otevřít modal'
            />


            <Modal isOpen={open} onClose={() => setOpen(false)} title="Ukázkový modal">
                <p>Ukázkový modal content</p>
            </Modal>
        </div>
    );
};

export const modal: Story = {
    //@ts-expect-error
    args: {},
    render: () => <ModalWrapper />,
};
