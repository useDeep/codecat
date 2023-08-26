'use client'
import './globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaCode } from "react-icons/fa6"
import { ReloadIcon } from "@radix-ui/react-icons"
import { TbBrandGithubFilled } from "react-icons/tb";
import { HiBuildingStorefront } from "react-icons/hi2";
import { IoMailUnreadSharp } from "react-icons/io5";
import MainNavbar from '@/components/navbars/MainNavbar'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { firebaseAuth } from '@/firebase/firebaseAuth'
import { firestore } from '@/firebase/firestore'
const page = () => {
  const router= useRouter()
  const [user, setUser]= useState(null)
  const [loading, setLoading]= useState(false)

  const signInHandle= async ()=>{
    setLoading(true)
    const data=await firebaseAuth.signInWithGithub()
    await firestore.addUser(data)

    const token = sessionStorage.getItem("Token")
    if (token){
      const getUser= async (token)=>{
        try{
          const data= firebaseAuth.decrypt(token)
          setUser(data)
        }catch(error){
          console.log(error)
        }
      }
      getUser(token)
    }
    setLoading(false)
  }

  const signOutHandle= async ()=>{
    await firebaseAuth.logout()
    router.push('/')
    const token = sessionStorage.getItem("Token")
    const data= await firebaseAuth.decrypt(token)
      setUser(data)
  }
  const goToDashboard= ()=> {
    setLoading(true)
    router.push(`dashboard/${user.user_id
    }`)
    setLoading(false)
  }

  return (
    <div className=''>
    <div className='m-auto w-11/12 '>
    <MainNavbar 
      user= {user}
      setUser= {setUser}
      signInHandle= {signInHandle}
      signOutHandle= {signOutHandle}
      loading={loading}
    />
    <main className='main '>
      <div className='flex flex-col gap-4 mb-6'>
        <h1 className='text-center text-4xl font-black leading-[1.15] text-black sm:text-6xl'>WHAT ARE YOU COOKING TODAY?</h1>
        <p className='bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent text-center text-2xl font-bold'>Unlock the door to code mastery with our online editor</p>
      </div>
    <div className='z-30 -mb-4'>
      {!user ?
      <Button
        className= "bg-[#EE7D2F] "
      onClick={signInHandle}>Start Cooking
          {loading ? 
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin" /> : 
          <FaCode className="ml-2 h-4 w-4" />}
      </Button> :
      <Button onClick={goToDashboard}>Go to Dashboard
      {loading ? 
                <ReloadIcon className="ml-2 h-4 w-4 animate-spin" /> : 
          <FaCode className="ml-2 h-4 w-4" />}
      </Button>
}

    </div>
    <div className='absolute z-30 right-0 text-2xl flex flex-col gap-3'>
      <a href='https://github.com/usedeep' target='_blank'>
    <TbBrandGithubFilled className='hover:text-orange-500'/>
    </a>
    <a href="mailto:hey.usedeep@gmail.com" target="_blank">
    <IoMailUnreadSharp className='hover:text-orange-500'/>
    </a>
    <a href='/'>
    <HiBuildingStorefront className='hover:text-orange-500'/>
    </a>
    
    </div>
    <Image
      src="/cat-hero.png"
      width={550}
      height={550}
      alt="codeCar logo"
    />
    
    </main>
    </div>
    </div>
  )
}

export default page