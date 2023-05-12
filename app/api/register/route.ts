import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server"
import {StatusCodes} from "http-status-codes"


export async function POST(req:Request){
    try {
        
        const body=await req.json()
        const {email,password,name}=body
        console.log("registration",body)
        if(!email||!password||!name){
           throw new Error("Please enter your email, password and name")
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const username=email?.split("@")[0]
        const customTag=`@${username.replace(/\W+/g, "_")}`
        const userExists=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(userExists){
            throw new Error("User already exists")
        }
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
                customTag
               
            }
        })
       
        return NextResponse.json(user,{status:StatusCodes.CREATED})
    } catch (error:any) {
        console.log("registration",error)
        return NextResponse.json(error.message,{status:StatusCodes.INTERNAL_SERVER_ERROR})
        
    }



}

