"use client"
import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes';

import React from 'react';
import MobileIteam from './MobileIteam';

type MobileFooterProps = {
    
};

const MobileFooter:React.FC<MobileFooterProps> = () => {
    const routes=useRoutes()
    const {isOpen}=useConversation()
    if(isOpen) return null
    
    return (
        <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
            {routes.map((item)=>(
                <MobileIteam
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                
                
                />
            ))}
        </div>
    )
}
export default MobileFooter;