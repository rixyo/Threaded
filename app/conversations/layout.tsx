import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { User } from '@prisma/client';
export default async function ConversationLayout({children}: {children: React.ReactNode}) {
    const conversations=await getConversations()
    const users=await getUsers()
    return (
           //@ts-expect-error Server Component
        <Sidebar>

        <div className='h-full'>
            <ConversationList  initialItems={conversations} 
            users={users as User[]}
            />
            {children}
        </div>
        </Sidebar>
    

    )
}