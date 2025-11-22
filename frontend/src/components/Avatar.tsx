export enum AvatarSize {
    SMALL = 5,
    BIG = 10,
}

interface AvatarProps {
    userInitials: string;
    size?: AvatarSize;
}

const SizeStyles: Record<AvatarSize, string> = {
    [AvatarSize.SMALL]: 'w-7 h-7 text-xs',
    [AvatarSize.BIG]: 'w-10 h-10 text-sm',
};

const Avatar = ({ userInitials, size = AvatarSize.BIG }: AvatarProps) => {
    return (
        <div className={
            "w-10 h-10 rounded-full bg-primary-lightbrown3 flex items-center justify-center text-sm font-semibold text-primary-brown2"
        }>
            <span>{userInitials}</span>
        </div>
    )
}

export default Avatar