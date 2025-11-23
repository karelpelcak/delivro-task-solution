import clsx from 'clsx';

interface IButton {
    label: string;
    className?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

const Button = (props: IButton) => {
    return (
        <button
            onClick={props.onClick}
            className={clsx(
                'bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl hover:cursor-pointer',
                props.className
            )}
        >
            <div className="flex gap-2">
                {props.icon && <span className="font-bold">{props.icon}</span>}
                <span>{props.label}</span>
            </div>
        </button>
    );
};

export default Button;
