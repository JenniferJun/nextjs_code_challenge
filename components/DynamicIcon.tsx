// components/DynamicIcon.tsx
import { FC, SVGProps } from 'react'
import {
    EnvelopeIcon,
    UserCircleIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline'

//#name: 'email' | 'username' | 'password'
interface DynamicIconProps {
    name?: string
    className?: string
}

const iconMap: Record<DynamicIconProps['name'], FC<SVGProps<SVGSVGElement>>> = {
    email: EnvelopeIcon,
    username: UserCircleIcon,
    password: LockClosedIcon,
}

export const DynamicIcon: FC<DynamicIconProps> = ({ name, className }) => {
    const IconComponent = iconMap[name] || EnvelopeIcon
    return <IconComponent className={className} />
}
