import AuthContext from './context/AuthContext'
import ToasterContext from './context/TosterContext'
import './globals.css'

export const metadata = {
  title: 'Threaded',
  description: 'A new solution for team communication and collaboration.'

}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>

        <ToasterContext/>

        {children}
        </AuthContext>
        </body>
    </html>
  )
}
