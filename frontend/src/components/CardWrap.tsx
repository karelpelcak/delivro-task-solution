'use client';

import Card, { ICard } from '@/components/card/Card';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

type Props = {
    providers?: string[];
};

const ShipmentDashboard = ({ providers = [] }: Props) => {
    const [allShipments, setAllShipments] = useState<ICard[]>([]);
    const [shipments, setShipments] = useState<ICard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const t = useTranslations('ShipmentDashboard');

    const fetchShipments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://localhost:8080/api/shipments');
            if (!res.ok) throw new Error(t('fetchError'));
            const data = await res.json();
            setAllShipments(data);
            if (!providers || providers.length === 0) setShipments(data);
            else setShipments(data.filter((s: ICard) => providers.includes(s.shipment.provider)));
        } catch (err: any) {
            console.error(err);
            setError(err.message || t('unknownError'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    useEffect(() => {
        if (!providers || providers.length === 0) setShipments(allShipments);
        else setShipments(allShipments.filter((s) => providers.includes(s.shipment.provider)));
    }, [providers, allShipments]);

    if (loading) return <p className="p-6 text-gray-700">{t('loading')}</p>;
    if (error) return <p className="p-6 text-red-500">{t('error')}: {error}</p>;

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shipments.map((shipment, idx) => (
                <Card key={`${shipment.id}-${idx}`} {...shipment} />
            ))}
        </div>
    );
}

export default ShipmentDashboard;