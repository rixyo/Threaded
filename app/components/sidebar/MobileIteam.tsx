import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IconType } from 'react-icons';

type MobileIteamProps = {
    label: string;
    icon: IconType;
    href: string;
    onClick?: () => void;
    active?: boolean;
};

const MobileIteam:React.FC<MobileIteamProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick

}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }
    
    return (
        <li onClick={handleClick} className="list-none" key={label}>
      <Link
        href={href}
        className={clsx(`
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold 
            text-sky-400 
            hover:text-black 
            hover:bg-gray-100
          `,
            active && 'bg-gray-100 text-black'
          )}
      >
        <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <p className="sr-only" title={label}>{label}</p>
      </Link>
    </li>
    )
}
export default MobileIteam;