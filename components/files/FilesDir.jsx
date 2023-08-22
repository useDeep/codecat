import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

import { BiDotsVerticalRounded } from "react-icons/bi";

const FilesDir = ( { files, fileChange} ) => {

  const filesList = Object.keys(files);

  const handleChangeFile= (key)=>{
    
    fileChange(key)
  }
  return (
    <div className="flex flex-col">
      {filesList.map((key) => (
    <div key={key} className="w-full flex justify-between group/item">
      <div className='w-full text-base flex justify-between hover:bg-slate-200 rounded-md cursor-pointer my-0.5 '>
        <div className={`p-0.5 ml-0.5 w-full`}
        onClick={()=>handleChangeFile(key)}
        >{key}</div>
        <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full w-6 h-6 group/edit invisible bg-slate-200 hover:bg-white group-hover/item:visible"
          >
          <BiDotsVerticalRounded />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 flex flex-col gap-2 p-1">
        <Button variant="secondary">Rename</Button>
        <Button variant="destructive">Delete</Button>
      </PopoverContent>
    </Popover>
    </div>
    </div>
  ))}
    </div>
  )
}

export default FilesDir