'use client';

import { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    const handleClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    return (
        <div
            ref={overlayRef}
            onClick={handleClickOverlay}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <div className="relative w-[90%] rounded-xl bg-gray-100 p-6 shadow-xl">
                {title && <h2 className="mb-4 text-xl font-semibold text-neutral-900">{title}</h2>}

                <div>{children}</div>

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-md px-2 py-1 text-neutral-400 transition hover:text-neutral-700"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Modal;
