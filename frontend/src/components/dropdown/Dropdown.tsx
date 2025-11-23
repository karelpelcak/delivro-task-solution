'use client';

import { useEffect, useRef, useState } from 'react';

interface Option {
    label: string;
    value: string;
}

interface DropdownProps {
    options: Option[] | string[];
    values: string[];
    onChange: (values: string[]) => void;
    placeholder?: string;
}

const Dropdown = ({ options, values, onChange, placeholder = 'Vyber...' }: DropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const normalized: Option[] =
        typeof options[0] === 'string'
            ? (options as string[]).map((o) => ({ label: o, value: o }))
            : (options as Option[]);

    const toggleValue = (v: string) => {
        if (values.includes(v)) {
            onChange(values.filter((x) => x !== v));
        } else {
            onChange([...values, v]);
        }
    };

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative w-64" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full rounded-lg border shadow-lg hover:cursor-pointer border-neutral-300 bg-white px-3 py-2 text-left text-neutral-800 
                           transition"
            >
                {values.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {values.map((v) => {
                            const opt = normalized.find((o) => o.value === v);
                            return (
                                <span
                                    key={v}
                                    className="flex items-center gap-1 rounded-md bg-neutral-200 px-2 py-1 text-sm"
                                >
                                    {opt?.label}
                                </span>
                            );
                        })}
                    </div>
                ) : (
                    <span className="text-neutral-400">{placeholder}</span>
                )}
            </button>

            {open && (
                <div
                    className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-neutral-300 bg-white 
                                shadow-lg"
                >
                    {normalized.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => toggleValue(option.value)}
                            className={`flex cursor-pointer items-center gap-2 px-3 py-2 transition 
                                       hover:bg-neutral-100 dark:hover:bg-neutral-100`}
                        >
                            <input
                                type="checkbox"
                                readOnly
                                checked={values.includes(option.value)}
                                className="accent-blue-600"
                            />

                            <span
                                className={`${
                                    values.includes(option.value)
                                        ? 'font-medium text-neutral-900'
                                        : 'text-neutral-700'
                                }`}
                            >
                                {option.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
