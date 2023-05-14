import { User } from "@prisma/client";
import getUsers from "../action/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";


export default async function UserLayout({children}: {children: React.ReactNode}) {
    const users=await getUsers()
    return (
        //@ts-expect-error Server Component
        <Sidebar>

        <div className='h-full'>
            <UserList users={users as User[]}/>
            {children}
        </div>
        </Sidebar>
    )
}