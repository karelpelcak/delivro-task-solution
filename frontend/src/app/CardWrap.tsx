'use client';

import Card, { ICard } from '@/components/card/Card';
import { useEffect, useState } from 'react';

export default function ShipmentDashboard() {
    const [shipments, setShipments] = useState<ICard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchShipments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:8080/api/shipments');
            if (!res.ok) throw new Error('Chyba při načítání dat');
            const data = await res.json();
            console.log(data)
            setShipments(data);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Neznámá chyba');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    if (loading) return <p className="p-6 text-gray-700 dark:text-gray-200">Načítám data...</p>;
    if (error) return <p className="p-6 text-red-500">Chyba: {error}</p>;

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shipments.map((shipment, idx) => (
                <Card key={`${shipment.id}-${idx}`} {...shipment} />
            ))}
        </div>
    );
}
