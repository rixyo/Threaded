import getCurrentUser from "@/app/action/getCurrentUser"
import { User } from "@prisma/client"
import DesktopSidebar from "./DesktopSidebar"
import MobileFooter from "./MobileFooter"

async function Sidebar({children}: {children: React.ReactNode}) {
    const currentUser=await getCurrentUser()
   

    return (
        <div className='h-full'>
            <DesktopSidebar currentUser={currentUser as User}/>
            <MobileFooter/>
            <main className="lg:pl-20 h-full">

         {children}
            </main>
        </div>
    )
    
}  
export default Sidebar