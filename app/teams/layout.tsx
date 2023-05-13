import TeamSidebar from "../components/TeamSidebar/TeamSidebar"

export default async function TeamLayout({children}: {children: React.ReactNode}) {
    return (
        //@ts-expect-error Server Component
        <TeamSidebar>

        <div className='h-full'>
            {children}
        </div>
        </TeamSidebar>

    )
}