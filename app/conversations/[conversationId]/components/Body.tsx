"use client"
import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';

type BodyProps = {
    initialMessages:FullMessageType[]
    
};

const Body:React.FC<BodyProps> = ({initialMessages}) => {
    
    const [messages,setMessages]=useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();
    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
      }, [conversationId]);

    return (
        <div className='flex-1 overflow-y-auto'>
            {messages.map((message,index) => (
             <MessageBox
                key={message.id}
                message={message}
                isLast={index === messages.length - 1}
                
             />
            ))}
            <div ref={bottomRef} className="pt-24"/>

        </div>
    )
}
export default Body;