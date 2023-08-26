'use client'
import { useRouter } from 'next/navigation'
import FilesDir from "../files/FilesDir"
import { VscNewFile } from "react-icons/vsc";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { IoSettingsSharp } from "react-icons/io5";
import { BsRocketTakeoffFill, BsGithub, BsCommand } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { firestore } from "@/firebase/firestore";
import { useState } from "react";

const Sidebar = ( {file, files, setFiles, setFileName, fileName, fileChange, code, userId, repo, lang} ) => {
  const router = useRouter()
  const [newFileName, setNewFileName]= useState()

  const handleNewFile= async (e)=>{
    e.preventDefault()
    await firestore.addNewFile(userId, repo, lang, newFileName)
  }

  return (
    <div className="bg-slate-400 secondary">
      <Accordion type="single" collapsible className="w-5/6 m-auto">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="w-full flex justify-between mr-2 text-base">
          Files 
          <Popover>
      <PopoverTrigger asChild>
      <Button 
          onClick= {(e)=> e.stopPropagation()}
          variant="ghost" 
          size="icon"
          className= "h-6 w-6 rounded-full text-base"
          >
      <VscNewFile className="h-4 w-4" />
    </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 flex flex-col gap-2 p-1 ">
      <div className=" w-full max-w-sm items-center space-x-2">

        <form onSubmit={handleNewFile}>
      <Input type="text" placeholder="New File" value={newFileName} onChange= {(e)=> setNewFileName(e.target.value)} />
      </form>
    </div>
      </PopoverContent>
    </Popover>
        
    </div>
        </AccordionTrigger>
        <AccordionContent>
        <FilesDir 
        file= {file}
        files= {files}
        setFiles= {setFiles}
        fileName= {fileName}
        setFileName= {setFileName}
        fileChange= {fileChange}
        code= {code}
      />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className= "text-base">Tools</AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="icon" className="bg-white">
      <IoSettingsSharp className="h-4 w-4" />
    </Button>
    <Button variant="outline" size="icon" className="bg-white">
      <BiSearchAlt className="h-4 w-4" />
    </Button>
    <Button variant="outline" size="icon" className="bg-white"
      onClick={()=> {
        if (typeof window !== "undefined"){
        window.open('https://github.com', '_blank')}}}
    >
      <BsGithub className="h-4 w-4" />
    </Button>
    <Button variant="outline" size="icon" className="bg-white" onClick={()=> {
      if (typeof window !== "undefined"){
      window.open('https://vercel.com', '_blank')}}}>
      <BsRocketTakeoffFill className="h-4 w-4" />
    </Button>
    <Button variant="outline" size="icon" className="bg-white">
      <BsCommand className="h-4 w-4" />
    </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    </div>
  )
}

export default Sidebar