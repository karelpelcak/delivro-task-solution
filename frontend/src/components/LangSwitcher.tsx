'use client';

import { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import clsx from 'clsx';

const LOCALES = ['cs', 'en'] as const;

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const handleChange = (newLocale: string) => {
        if (newLocale === locale) return;

        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        startTransition(() => {
            router.push(newPath);
        });
    };

    return (
        <div className="flex items-center gap-2">
            {LOCALES.map((l) => (
                <button
                    key={l}
                    onClick={() => handleChange(l)}
                    disabled={isPending}
                    className={clsx(
                        'px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-200 min-w-12',
                        'md:px-3 md:py-1.5 md:text-xs md:min-w-10',
                        l === locale
                            ? 'border-3 border-black'
                            : 'border-3 border-gray-400 text-gray-400',
                        isPending && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    {l}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;