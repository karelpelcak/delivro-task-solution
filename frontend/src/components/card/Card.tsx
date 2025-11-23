'use client';

import clsx from 'clsx';
import CardContent from './CardContent';
import CardImage from './CardImage';

export interface ICompany {
    id: string;
    name: string;
}

export interface IShipment {
    id: string;
    createdAt: string;
    trackingNumber: string;
    company: ICompany;
    provider: 'GLS' | 'DPD' | 'UPS' | 'PPL' | 'FedEx';
    mode: 'EXPORT' | 'IMPORT';
    originCountry: string;
    destinationCountry: string;
}

export interface ICard {
    id: string;
    shipment: IShipment;
    invoicedWeight: number;
    invoicedPrice: number;
}

const Card = (props: ICard) => {
    const variant: Record<IShipment['mode'], string> = {
        IMPORT: 'shadow-blue-300',
        EXPORT: 'shadow-green-300',
    };
    return (
        <div
            className={clsx(
                'flex flex-col rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden min-h-64',
                'hover:shadow-md transition-shadow duration-200 shadow-2xl hover:cursor-pointer',
                variant[props.shipment.mode]
            )}
        >
            <CardImage provider={props.shipment.provider} />

            <div className="bg-gray-200 h-0.5 mx-3" />

            <div className="p-3">
                <CardContent
                    companyId={props.shipment.company.id}
                    companyName={props.shipment.company.name}
                    id={props.id}
                    invoicedPrice={props.invoicedPrice}
                    invoicedWeight={props.invoicedWeight}
                    shipmentId={props.shipment.id}
                    shipmentCreatedAt={props.shipment.createdAt}
                    shipmentTrackingNumber={props.shipment.trackingNumber}
                    shipmentMode={props.shipment.mode}
                    shipmentOriginCountry={props.shipment.originCountry}
                    shipmentDestinationCountry={props.shipment.destinationCountry}
                />
            </div>
        </div>
    );
};

export default Card;
