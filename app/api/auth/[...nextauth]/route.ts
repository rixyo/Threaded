import bcrypt from 'bcrypt';
import NextAuth,{AuthOptions} from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/app/libs/prismadb"



export const authOptions:AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
            
            
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if(!credentials?.email|| !credentials?.password){
                    throw new Error("Please enter your email and password")
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                  
                })
                if(!user|| !user.hashedPassword){
                    throw new Error("You are not registered")
                }
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                  );
                    if (!isCorrectPassword) {
                        throw new Error("Invalid password");
                    }
                    return user;
            },
        })
    ],
    callbacks: {
        async signIn({ user}) {
            // here update oauth user with custom tag
          if (user?.email) {
            const userExists = await prisma.user.findUnique({
                where: {
                    email: user.email as string
                }

            })
            if(userExists){
                const username=user?.email?.split("@")[0]
        const customTag=`@${username.replace(/\W+/g, "_")}`
                await prisma.user.update({
                    where:{
                        id:userExists.id
                    },
                    data:{
                        customTag
                    }
                })
            }
            return Promise.resolve(true); 
          } else {
            return Promise.reject(new Error('You are not allowed to sign in.'))
          }
        },
      },
    debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
    maxAge: 3600
  },
  secret: process.env.NEXTAUTH_SECRET,
   
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
