import getSession from "./getSession"
import prisma from "@/app/libs/prismadb"

const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
      return []
    }
    else{
        try {
            const user=await prisma.user.findUnique({
                where:{
                    email:session.user.email
                }
            })
            if(!user){
                return []
            }else{
                const users=await prisma.user.findMany({
                    where:{
                        AND:{

                            id:{
                                in:user.followerId.map((id)=>id)
                            },
                            NOT:{
                                id:user.id
                            },
                            isVarified:true
                         

                        }
                    },
                    select:{
                        id:true,
                        name:true,
                        customTag:true,
                        profileImage:true,
                        isVarified:true,
                      
                    }
                })
                return users
            }

            
        } catch (error) {
            return []
            
        }
        
    }
}
export default getUsers