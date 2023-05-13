import DesktopSidebar from "./DesktopSidebar"

async function TeamSidebar({children}: {children: React.ReactNode}) {
    return (
        <div className='h-full'>
          <DesktopSidebar/>
            <main className="lg:pl-20 h-full">

         {children}
            </main>
        </div>
    )
    
}  
export default TeamSidebar