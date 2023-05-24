"use client"
import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";
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

  useEffect(() => {
    pusherClient.subscribe(conversationId as string)
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message]
      });
      
      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) => current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
  
        return currentMessage;
      }))
    };
  

    pusherClient.bind('messages:new', messageHandler)
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId as string)
      pusherClient.unbind('messages:new', messageHandler)
      pusherClient.unbind('message:update', updateMessageHandler)
    }
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