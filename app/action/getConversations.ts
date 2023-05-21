import getCurrentUser from "./getCurrentUser";
import prisma from "@/app/libs/prismadb"

const getConversations=async()=>{
    const currentUser=await getCurrentUser()
    if(!currentUser?.id) return []
    try {
        const conversations=await prisma.conversation.findMany({
            where:{
               userIds:{
                has:currentUser.id
               }
            },
            orderBy:{
                lastMessageAt:"desc"
            },
            include:{
                users:true,
                messages:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }

        })
        return conversations
        
    } catch (error:any) {
        return []
        
    }
}
export default getConversations