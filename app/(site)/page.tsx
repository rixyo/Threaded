 import Image from 'next/image'
import AuthForm from './components/AuthForm'

export default function Home() {
  return (
   <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
     
      <Image
      alt='Threaded Logo'
      src='/logo1.png'
      width="100"
      height="100"
      className="mx-auto  w-auto"
      loading="eager"

       /> 
      <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tighter">
        Signin to your account
      </h2>

    </div>
    <AuthForm/>
   </div>
  )
}
