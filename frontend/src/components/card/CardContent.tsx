'use client';

import { MoveRight } from 'lucide-react';
import TravelMode from './TravelMode';

interface ICardContent {
    companyId: string;
    companyName: string;
    id: string;
    invoicedWeight: number;
    invoicedPrice: number;
    shipmentId: string;
    shipmentCreatedAt: string;
    shipmentTrackingNumber: string;
    shipmentMode: 'EXPORT' | 'IMPORT';
    shipmentOriginCountry: string;
    shipmentDestinationCountry: string;
}

const CardContent = (data: ICardContent) => {
    const formatDate = (iso: string): string => {
        const date = new Date(iso);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center gap-4">
                <h2 className="font-semibold text-gray-900 text-sm">{data.companyName}</h2>
                <TravelMode mode={data.shipmentMode} />
            </div>

            <div className="text-xs text-gray-600">
                <span className="font-medium">Tracking:</span> {data.shipmentTrackingNumber}
            </div>

            <div className="flex gap-4 text-xs mt-1">
                <div>
                    <span className="font-medium text-gray-700">Weight:</span> {data.invoicedWeight} kg
                </div>
                <div>
                    <span className="font-medium text-gray-700">Price:</span> {data.invoicedPrice} CZK
                </div>
            </div>

            <div className="text-xs text-gray-600 pt-1 flex justify-between items-center">
                <div className='flex items-center gap-2'>
                    <span>
                        {data.shipmentOriginCountry}
                    </span>
                    <MoveRight strokeWidth={4} width={10} />
                    <span>
                        {data.shipmentDestinationCountry}
                    </span>
                </div>
                <span>{formatDate(data.shipmentCreatedAt)}</span>
            </div>
        </div>
    );
};

export default CardContent;
