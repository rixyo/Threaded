import getConversationById from '@/app/action/getConversationById';
import EmptyState from '@/app/components/EmptyState';
import React from 'react';
import Body from './components/Body';
import Form from './components/Form';
import Header from './components/Header';

type IParams = {
    conversationId: string;
    
};

const ConversationId=async ({ params }: { params: IParams }) => {
    const conversation = await getConversationById(params.conversationId);
    console.log(conversation);

    if (!conversation) {
        return (
          <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
              <EmptyState />
            </div>
          </div>
        )
      }
    return(
        <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <Header conversation={conversation}  />
      
          <Form />
        </div>
      </div>
    )
}
export default ConversationId;