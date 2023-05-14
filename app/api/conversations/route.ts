import getCurrentUser from "@/app/action/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import {StatusCodes} from "http-status-codes"

export async function POST(req:Request){
    try {
        const currentUser=await getCurrentUser()
  
        const body=await req.json()
        const {userId,isGroup,members,name}=body
        if(!currentUser?.id || !currentUser?.email){
            throw new Error("Please login to continue")
        }
        if(isGroup &&(!members||members.length<2||!name)){
            throw new Error("Please enter group name and members")
        }
        if(isGroup){
            const conversation=await prisma.conversation.create({
                data:{
                    name,
                    isGroup,
                    users:{
                        connect:[
                            ...members.map((id:string)=>({id})),
                            {id:currentUser.id}
                        ],


                    }

                    
                    
                },
                include:{
                    users:true
                }
            })
            return NextResponse.json(conversation,{status:StatusCodes.CREATED})
        }
        const existingConversations=await prisma.conversation.findMany({
            where:{
                OR:[
                    {
                        userIds:{
                            equals:[currentUser.id,userId]

                        }
                    },
                    {
                        userIds:{
                            equals:[userId,currentUser.id]
                        }
                    }
                ]
            }

          
           
        })
        const singleConverstaion=existingConversations[0]
        if(singleConverstaion){
            return NextResponse.json(singleConverstaion,{status:StatusCodes.CREATED})
        }
        else{
            const newConversation=await prisma.conversation.create({
                data:{
                    isGroup:false,
                    users:{
                        connect:[
                            {
                                id:currentUser.id
                            },
                            {
                                id:userId
                            }
                        ]
                    }
                },
                include:{
                    users:true
                }
            })
            return NextResponse.json(newConversation,{status:StatusCodes.CREATED})
        }

    
        
    } catch (error:any) {
        console.log("registration",error)
        return NextResponse.json(error.message,{status:StatusCodes.INTERNAL_SERVER_ERROR})
        
        
    }
}