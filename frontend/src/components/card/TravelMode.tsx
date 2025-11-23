'use client';

interface ITravelMode {
    mode: 'IMPORT' | 'EXPORT';
}

const TravelMode = ({ mode }: ITravelMode) => {
    const variant: Record<ITravelMode['mode'], string> = {
        IMPORT: 'bg-blue-100 text-blue-700 border-blue-300',
        EXPORT: 'bg-green-100 text-green-700 border-green-300',
    };

    return <span className={`text-xs px-2 py-0.5 rounded-md border font-medium ${variant[mode]}`}>{mode}</span>;
};

export default TravelMode;
