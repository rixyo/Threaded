import React from 'react';
import { IoMdAdd } from 'react-icons/io';
type DesktopSidebarProps = {
    
};

const DesktopSidebar:React.FC<DesktopSidebarProps> = () => {
    
    return (
        <div className="hidden lg:fixed lg:inset-y-0  lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto  lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
                <nav className="mt-4 flex flex-col justify-between">
                    {/* todo add team iteams*/}
            <ul role="list" className="flex flex-col items-center space-y-1">
                <IoMdAdd className='border-2 text-sky-400  rounded-full p-2  hover:bg-black cursor-pointer ' size={50} title="Create team"/>
            </ul>
                </nav>
        </div>
    )
}
export default DesktopSidebar;