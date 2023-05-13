"use client"
import Button from '@/app/components/Inputs/Button';
import Input from '@/app/components/Inputs/Input';
import React,{useCallback, useEffect, useState} from 'react';
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsGoogle  } from 'react-icons/bs';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import {signIn,useSession} from "next-auth/react"
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
type Vairant="Login" | "Register"
const AuthForm:React.FC = () => {
    const [variant, setVariant] = useState<Vairant>("Login")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password")
    const [customError,setError]=useState<string>("")
    const router = useRouter()
    const session = useSession()

    useEffect(()=>{
      if(session?.status==="authenticated"){
        router.push("/users")
      }
      else if(session?.status!="unauthenticated") {
        router.push("/")
      }
    },[session?.status,router])
  //toggle variant
    const toggleVariant = useCallback(() => {
        if(variant === "Login"){
            setVariant("Register")
        }else{
            setVariant("Login")
        }
    },[variant,setVariant])
    //form
    const {register,handleSubmit,formState:{errors}}=useForm<FieldValues>({
        defaultValues:{
            email:"",
            name:"",
            password:""
        }
    })
    //register/login
    const onSubmit:SubmitHandler<FieldValues> = (data) => {

    
       if(variant === "Login"){
        setIsLoading(true)
        signIn('credentials', {
          ...data,
          redirect: false
        })
        .then((callback) => {
          if (callback?.error) {
          
            toast.error(callback?.error);
          }
  
          else if (callback?.ok) {

            router.push("/users")
          
          }
        })
        .finally(() => setIsLoading(false))
      
         }else if(variant === "Register"){
          try {
          
          
         
          
          const isWhitespace = /^(?=.*\s)/;
          if (isWhitespace.test(data.password)) {
            setIsLoading(false)
            throw new Error( "Password must not contain Whitespaces.")
          }
      
      
          const isContainsUppercase = /^(?=.*[A-Z])/;
          if (!isContainsUppercase.test(data.password)) {
            setIsLoading(false)
            throw new Error( "Password must have at least one Uppercase Character.")
          }
      
      
          const isContainsLowercase = /^(?=.*[a-z])/;
          if (!isContainsLowercase.test(data.password)) {
            setIsLoading(false)
            throw new Error( "Password must have at least one Lowercase Character.")
          }
      
      
          const isContainsNumber = /^(?=.*[0-9])/;
          if (!isContainsNumber.test(data.password)) {
            setIsLoading(false)
            throw new Error( "Password must contain at least one Digit.")
          }
          const isContainsSymbol =
          /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
        if (!isContainsSymbol.test(data.password)) {
          setIsLoading(false)
          throw new Error( "Password must contain at least one Special Symbol.")
        }
    
    
        const isValidLength = /^.{6,}$/;
        if (!isValidLength.test(data.password)) {
          setIsLoading(false)
          throw new Error( "Password must be  minimam 6 Characters Long.")
        }
        else{
        
          setError("")
          setIsLoading(true)
  
          axios.post('/api/register', data)
        
          .then(() => signIn('credentials', {
            ...data,
            redirect: false,
          }))
          .then((callback) => {
            if (callback?.error) {
              toast.error(callback?.error);
            }
    
            if (callback?.ok) {
              toast.success("Account Created Successfully")
              router.push("/users")
            }
          })
          .catch((error:any) => {
            toast.error(error.message)
          })
          
          .finally(() => setIsLoading(false))
        }
            
          } catch (error:any) {
          console.log(error.message)
          setError(error.message)
            
          }
          
        
           
             
         }
    }
    //show password
    const showPassword=useCallback(()=>{
   
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      },[passwordType,setPasswordType])
      //social login
      const socialAction = (action:string) => {
        setIsLoading(true);
    
        signIn(action, { redirect: false })
          .then((callback) => {
            if (callback?.error) {
              toast.error(callback?.error);
            }
    
            else if (callback?.ok) {
              toast.success("Logged in")

              router.push('/users')
            }
          })
          .finally(() => setIsLoading(false));
      } 
    
    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'> 
            <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    
                  {variant==="Register" &&
                   <Input
                   id='name'
                   label='Name'
                    type='text'
                   register={register}
                   required
                   errors={errors}
                   />
                  } 
                    <Input
                    id='email'
                    label='Email'
                    type='email'
                    register={register}
                    required
                    disabled={isLoading}
                    errors={errors}
                    
                    />
                    <div className='relative'>
                    <Input
                    id='password'
                    label='Password'
                    type={passwordType}
                    register={register}
                    required
                    disabled={isLoading}
                    errors={errors}
                    
                    />
                       {customError && <p className='text-red-500 text-sm my-2' >{customError}</p>}
                      <div className='absolute -right-7 top-10  ' onClick={showPassword}>{passwordType==="password"?<AiOutlineEye className='text-2xl text-gray-400'/>:<AiOutlineEyeInvisible className='text-2xl text-gray-400'/>}</div>
                    </div>
                    <div>
            <Button disabled={isLoading} fullWidth type="submit">
                {variant === "Login" ? "Login" : "Register"}
            </Button>
          </div>
                  
                </form>
                <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}


            />
           
          </div>
        </div>
        <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-500
          "
        >
          <div>
          {variant === 'Login' ? 'New to Messenger?' : 'Already have an account?'} 
          </div>
          <div 
            onClick={toggleVariant} 
            className="underline cursor-pointer"
          >
         {variant === 'Login' ? 'Create an account' : 'Login'}
          </div>
        </div>
                
              </div>
            </div>

    
    )
}
export default AuthForm;