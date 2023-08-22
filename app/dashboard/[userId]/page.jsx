'use client'
import NewForm from "@/components/forms/NewForm"
import UserProfile from "@/components/profile/UserProfile"
import { useRouter } from 'next/navigation'
import { firebaseAuth } from '@/firebase/firebaseAuth'
import { firestore } from '@/firebase/firestore'
import { useEffect, useState } from "react"
import MainNavbar from "@/components/navbars/MainNavbar"
import { BsPlusLg } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Firestore } from "firebase/firestore"
import RepoCard from "@/components/cards/RepoCard"

const page = () => {
  const router= useRouter()
  const [user, setUser]= useState()
  let [repoDetails, setRepoDetails]= useState()

  useEffect(()=> {
    const token = sessionStorage.getItem("Token")
    if (token == null){
      router.push('/')
    }
    const getUser= async (token)=>{
      const data= await firebaseAuth.decrypt(token)
      setUser(data)
    }
    getUser(token)
  }, [])

  
  useEffect( ()=>{
    const getRepoData= async() =>{
    if (user){
      const re= await firestore.getMyRepos(user?.user_id)
    setRepoDetails(re)
      }
    }
    getRepoData()
  }, [user])
  
  return (
    <>
    <div className="m-auto w-11/12 relative">
    <MainNavbar 
    user= {user}
    setUser= {setUser}
    createRepoButton= {true}
    />
    <div className="h-64 cover mt-14 flex">
    <div className="w-1/4 fixed top-40 mt-10">
        <UserProfile 
          user= {user}
        />
      </div>
    <div className=' m-auto'>
      <AlertDialog className='mx-auto'>
  <AlertDialogTrigger>
    <Button variant="secondary" className="hover:bg-black hover:text-white">
      <BsPlusLg className="mr-2 h-4 w-4 hover:text-white hover:font-bold"/>Create new Repo</Button></AlertDialogTrigger>
  <AlertDialogContent>  
        <NewForm 
          user= {user}
        />
  </AlertDialogContent>
  </AlertDialog>
  </div>
  </div>
  <div className="flex justify-between">
      <div className="w-1/3 h-full"></div>
    <div className="w-2/3">
      <h1 className="text-xl mt-5 font-bold">Your Repos</h1>
    <div className="mt-5">

    {repoDetails && repoDetails.length > 0 ? (
    <RepoCard 
      repoDetails= {repoDetails}
    />) :
    (
      <div className="flex flex-col w-full h-32 justify-center ">
        <p>such empty :(</p>
        <p>Create a repo to continue</p>
      </div>
    )
  
  }
    </div>
    </div>
  </div>
  
    </div>
    </>
  )
}

export default page