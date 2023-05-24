"use client";
import Avatar from '@/app/components/Avatar';
import AvatarGroup from '@/app/components/AvatarGroup';
import useOtherUser from '@/app/hooks/useOtherUser';
import { Conversation, User } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { HiChevronLeft } from 'react-icons/hi'
import { HiEllipsisHorizontal } from 'react-icons/hi2';
import ProfileDrawer from './ProfileDrawer';

type HeaderProps = {
    conversation: Conversation & {
        users: User[]
      }
    
};

const Header:React.FC<HeaderProps> = ({conversation}) => {
    const otherUser=useOtherUser(conversation)
    const [drawerOpen,setDrawerOpen]=useState<boolean>(false)
    const statusTaxt=useMemo(()=>{
        if(conversation.isGroup){
            return `${conversation.users.length} members`
        }
        return "Active now"
    },[conversation.isGroup,conversation.users.length])
    
    return (
        <>
          <ProfileDrawer 
      data={conversation} 
      isOpen={drawerOpen} 
      onClose={() => setDrawerOpen(false)}
    />
        <div className=' bg-white  w-full  flex  border-b-[1px] sm:px-4 py-3  px-4 lg:px-6 justify-between items-center shadow-sm'>
            <div className='flex gap-5 items-center'>
              <Link href="/conversations" className='lg:hidden block  text-sky-500 hover:text-sky-600 transition  cursor-pointer'>
                <HiChevronLeft size={32} />
              </Link>
              {conversation.isGroup ? (
          <AvatarGroup users={conversation.users} />
        ) : (
          <Avatar user={otherUser} />
        )}
                <div className='flex flex-col'>
                    <h3 className='text-lg font-semibold'>{conversation?.name||otherUser?.name}</h3>
                    <span className='text-sm text-gray-500'>{statusTaxt}</span>
                </div>
               
            </div>
            <HiEllipsisHorizontal
        size={32}
        onClick={() => setDrawerOpen(true)}
        className=" text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
        </div>
        </>
    )
}
export default Header;