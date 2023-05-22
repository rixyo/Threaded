"use client"
import useConversation from '@/app/hooks/useConversation';
import axios from 'axios';
import  Picker  from '@emoji-mart/react';
import React from 'react';
import {  FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from './MessageInput';
import { CldUploadButton } from 'next-cloudinary';

const Form:React.FC = () => {
    const {conversationId}=useConversation()
    const uploadPrest=process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    const {register,handleSubmit,setValue,formState:{errors},watch}=useForm<FieldValues>({
        defaultValues:{
            message:'',
          
        },
    })
    const onSubmit:SubmitHandler<FieldValues>=async (data)=>{
        setValue('message','',{shouldValidate:true})
     axios.post('/api/messages',{
        ...data,
        conversationId:conversationId
     })
    }
    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
         
          image: result.info.secure_url,
          conversationId: conversationId
        })
      }
  
    return (
        <div className=' py-4  px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full'>
           <CldUploadButton 
        options={{ maxFiles: 1 }} 
        onUpload={handleUpload} 
        uploadPreset="tw9uaoam"

    
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-2 lg:gap-4 w-full'>
                <MessageInput
                    id="message"
                    
                 
                    placeholder="Type a message"
                    register={register}
                    errors={errors}
                    
                 />
                   <button 
          type="submit" 
          className=" rounded-full   p-2  bg-sky-500 cursor-pointer  hover:bg-sky-600 transition"
        >
          <HiPaperAirplane
            size={18}
            className="text-white"
          />
        </button>

            </form>
        </div>
    )
}
export default Form;