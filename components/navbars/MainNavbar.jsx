'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaGithub } from "react-icons/fa6";
import { ReloadIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
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
import NewForm from "../forms/NewForm";
import { GrAdd } from "react-icons/gr";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { firebaseAuth } from "@/firebase/firebaseAuth"

const MainNavbar = ( {user, setUser, signInHandle, signOutHandle, loading, createRepoButton} ) => {

  return (
    <div className=" fixed h-14 w-11/12 z-30 top-0 bg-white">
    <nav className="flex justify-between items-center">
        <Link href='/'>
        <div className="flex justify-center items-center">
        <Image
      src="/cat-logo.png"
      width={60}
      height={60}
      alt="codeCat logo"
    />
    <div className="logo_text font-bold primary_text text-2xl -ml-2">codeCat</div>
        </div>
    </Link>
        <div className="flex justify-center gap-4">
          {createRepoButton && user ? (
            <AlertDialog className='mx-auto'>
            <AlertDialogTrigger>
            <Button variant="outline" size="icon">
      <GrAdd className="h-4 w-4" />
    </Button>
              </AlertDialogTrigger>
            <AlertDialogContent>  
                  <NewForm 
                    user= {user}
                  />
            </AlertDialogContent>
            </AlertDialog>
          ): ( null)}
        {user ? (
          <Popover>
        <PopoverTrigger>
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>CC</AvatarFallback>
        </Avatar>
        <PopoverContent className='w-full'>
        <Button onClick={signOutHandle}>Log Out</Button>
        </PopoverContent>
        </PopoverTrigger>
        </Popover>
      ) : (
        <Button className='hover:opacity-80' onClick={signInHandle}>
          {loading ? 
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 
          <FaGithub className="mr-2 h-4 w-4" />}
          Login</Button>
      )}
        </div>
    </nav>
    </div>
  )
}

export default MainNavbar