"use client"

import Avatar from '@/app/components/Avatar';
import { Conversation, User } from '@prisma/client';
import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { format } from "date-fns";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FullConversationType } from '@/app/types';
import useOtherUser from '@/app/hooks/useOtherUser';

type ConversationBoxProps = {
    conversation:FullConversationType
    selected?: boolean;
};

const ConversationBox:React.FC<ConversationBoxProps> = ({conversation,selected}) => {
    const session = useSession();
    const router = useRouter();
    const otherUser = useOtherUser(conversation);
    const handleClick = useCallback(() => {
        router.push(`/conversations/${conversation.id}`);
      }, [conversation, router]);
    
      const lastMessage = useMemo(() => {
        const messages = conversation.messages || [];
    
        return messages[messages.length - 1];
      }, [conversation.messages]);
    
      const userEmail = useMemo(() => session.data?.user?.email,
      [session.data?.user?.email]);
      
      const hasSeen = useMemo(() => {
        if (!lastMessage) {
          return false;
        }
    
        const seenArray = lastMessage.seen || [];
    
        if (!userEmail) {
          return false;
        }
    
        return seenArray
          .filter((user:User) => user.email === userEmail).length !== 0;
      }, [userEmail, lastMessage]);
      const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
          return 'Sent an image';
        }
    
        if (lastMessage?.body) {
          return lastMessage?.body
        }
    
        return 'Started a conversation';
      }, [lastMessage]);
    
    return (
        <div
     onClick={handleClick}
      className={clsx(`
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-3 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
   {/* todo group feature */}
   <Avatar user={otherUser}/>
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {conversation.name}
            </p>
            {lastMessage?.createdAt && (
              <p 
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(lastMessage.createdAt), 'p')}
              </p>
            )}
          </div>
          <p 
            className={clsx(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
        </div>
      </div>
    </div>
    )
}
export default ConversationBox;