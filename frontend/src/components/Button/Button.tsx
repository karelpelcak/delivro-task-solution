import clsx from 'clsx';

interface IButton {
    label: string;
    className?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
}

const Button = ({
    label,
    className,
    onClick,
    icon,
    disabled = false
}: IButton) => {
    return (
        <button
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            className={clsx(
                "px-4 py-2 rounded-lg shadow-lg transition-all",
                !disabled && "bg-white hover:shadow-xl hover:cursor-pointer",
                disabled && "bg-gray-200 text-gray-500 cursor-not-allowed",
                className
            )}
        >
            <div className="flex gap-2">
                {icon && <span className="font-bold">{icon}</span>}
                <span>{label}</span>
            </div>
        </button>
    );
};

export default Button;
