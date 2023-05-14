import getConversations from "../action/getConversation";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({children}: {children: React.ReactNode}) {
    const conversations=await getConversations()
    return (
           //@ts-expect-error Server Component
        <Sidebar>

        <div className='h-full'>
            <ConversationList conversations={conversations}/>
            {children}
        </div>
        </Sidebar>
    

    )
}