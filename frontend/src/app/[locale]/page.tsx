'use client';

import Button from "@/components/Button/Button";
import ShipmentDashboard from "../../components/CardWrap";
import { useState } from "react";
import Modal from "@/components/modal/Modal";
import FileUpload from "@/components/FileUpload";
import Dropdown from "@/components/dropdown/Dropdown";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LangSwitcher";
import { ToastContainer } from "react-toastify";

interface ICompany {
    id: string;
    name: string;
}

interface IShipment {
    id: string;
    createdAt: string;
    trackingNumber: string;
    company: ICompany;
    provider: 'GLS' | 'DPD' | 'UPS' | 'PPL' | 'FedEx';
    mode: 'EXPORT' | 'IMPORT';
    originCountry: string;
    destinationCountry: string;
}

export interface IInvoice {
    id: string;
    shipment: IShipment;
    invoicedWeight: number;
    invoicedPrice: number;
}

const page = () => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<string[]>([]);
    const t = useTranslations('HomePage');
    const [refreshDashboard, setRefreshDashboard] = useState(0);

    return (
        <div>
            <ToastContainer />
            <div className="p-6 flex justify-between sm:flex-row flex-col">
                <Button
                    onClick={() => setOpen(true)}
                    label={t('Modal')}
                />
                <div className="flex gap-4">
                    <Dropdown
                        options={[
                            { label: 'GLS', value: 'GLS' },
                            { label: 'DPD', value: 'DPD' },
                            { label: 'UPS', value: 'UPS' },
                            { label: 'PPL', value: 'PPL' },
                            { label: 'FedEx', value: 'FedEx' },
                        ]}
                        values={values}
                        onChange={setValues}
                        placeholder={t('SelectProvider')}
                    />
                    <LanguageSwitcher />
                </div>
            </div>
            <ShipmentDashboard providers={values} key={refreshDashboard} />
            <Modal isOpen={open} onClose={() => setOpen(false)} title={t('ModalTitle')}>
                <FileUpload
                    onClose={() => {
                        setOpen(false);
                        setRefreshDashboard(prev => prev + 1);
                    }}
                />
            </Modal>
        </div>
    )
};

export default page;
