import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb"

const getConversationById=async(conversationId: string)=>{
    try {
        const currentUser=await getCurrentUser()
        if(!currentUser?.email) return null
        const conversation=await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true,
            }
        })
        if(!conversation) return null
        //if(!conversation.userIds.includes(currentUser.id)) return null
        return conversation
        
    } catch (error:any) {
        console.log(error)
        return null
        
    }


}
export default getConversationById