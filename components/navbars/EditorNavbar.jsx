"use client"
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaPlay } from "react-icons/fa6"
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ReloadIcon } from "@radix-ui/react-icons"
import { RxAvatar } from "react-icons/rx";
import { HiOutlineDownload } from "react-icons/hi";
import { compileCode } from "@/utils/judge0Api";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { newFiles, newFilesObject } from "@/utils/newFiles";
import { firestore } from "@/firebase/firestore";

const EditorNavbar = ( { user, file, onCodeSubmit, repo, userId, lang, userInput} ) => {
    const [processing, setProcessing]= useState(false)
    const [saving, setSaving]= useState(false)
    
    const handleSave= async ()=>{
        setSaving(true)
        const newFilesObject= await newFiles.getNewFiles()
        await firestore.saveFiles(userId, repo, newFilesObject)
        setSaving(false)
    }

    const handleCompile= async (e)=>{
        e.preventDefault()
        setProcessing(true)
        const newFilesObject= await newFiles.getNewFiles()
        const payload = {
            language_id: lang,
            source_code: btoa(newFilesObject[file.name]?.code),
            stdin: btoa(userInput),
          };
          const data= await compileCode( payload )
          const token= await data?.token
          await onCodeSubmit(token)
          setProcessing(false)
    }
    

  return (
    <div className="flex bg-gray-300 h-12 justify-between secondary">
        <div className="ml-5 flex items-center select-none">
            <Link 
            href='/'
            >
        <Image
      src="/cat-logo.png"
      alt= "codeCat logo"
      width={50}
      height={50}
    />
    </Link>
            <h5 className="text-lg font-semibold">
                {repo}
            </h5>
        </div>

        <div className="flex items-center gap-2">
            <Button onClick={handleSave} variant="secondary">
                {!saving ? <AiOutlineCloudUpload /> :
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                 Save
            </Button>
            <Button 
                onClick={handleCompile}
                className={`bg-green-300 text-green-900 hover:text-white hover:bg-green-700`}>
                {processing ? 
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : 
                <FaPlay /> }
                Run
            </Button>
        </div>

        <div className="flex items-center text-xl gap-3 mr-3">
            <div>
                <HiOutlineDownload />
            </div>
            <div>
                {user ? 
                    <Avatar>
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback>CC</AvatarFallback>
                  </Avatar> :
                  <RxAvatar />
                }
                
            </div>
        </div>
    </div>
  )
}

export default EditorNavbar