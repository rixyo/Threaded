"use client"
import Avatar from '@/app/components/Avatar';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from 'react';
import { GoVerified } from 'react-icons/go';

type UserBoxProps = {
    user:User
};

const UserBox:React.FC<UserBoxProps> = ({user}) => {
    const [isLoading,setLoading]=useState<boolean>(false)
    const router=useRouter()
    const handleClick=useCallback(()=>{
        setLoading(true)
        axios.post('/api/conversations',{
            userId:user.id
        }).then((res)=>{
            router.push(`/chat/${res.data.id}`)
            
        }).finally(()=>{
            setLoading(false)
        })

    },[user,router])
    return (
        <div
        onClick={handleClick}
      
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={user} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
                <div className='flex flex-col items-center'>
                    <div className='flex items-center gap-2'>

              <p className="text-md font-medium text-gray-900 ">{user.name}</p>
             {user.isVarified && <GoVerified className='text-blue-500'/> } 
                    </div>
            
        
              <p className='text-md text-gray-400 font-medium'> {user.customTag}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}
export default UserBox;