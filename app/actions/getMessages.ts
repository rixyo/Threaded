import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"

const getMessages = async (conversationId:string) => {
    const currentUser=await getCurrentUser()
    try {
        if(!currentUser?.email) return []
    const messages = await prisma.message.findMany({
        where: {
            conversationId: conversationId,
        },
        include: {
            sender: true,
            seen: true,
        },
        orderBy: {
            createdAt: "asc",
        }
    })
    return messages
        
    } catch (error: any) {
        console.log(error)
        return []
        
    }
}
export default getMessages