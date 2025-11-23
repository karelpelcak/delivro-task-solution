import Image from 'next/image';

const CardImage = ({ provider }: { provider: 'GLS' | 'DPD' | 'UPS' | 'PPL' | 'FedEx' }) => {
    const imageAssetUrl = `/assets/${provider.toLowerCase()}.svg`;
    
    return (
        <div className="p-5 flex justify-center items-center min-h-32">
            <Image src={imageAssetUrl} alt={provider} width={70} height={70} />
        </div>
    );
};

export default CardImage;
