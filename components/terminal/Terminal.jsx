"use client"
import { RiCopilotFill } from "react-icons/ri";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Console from "../console/Console"

const Terminal = ( {output, userInput, setUserInput} ) => {

  const handleChange= (e)=>{
    setUserInput(e.target.value)
  }

  return (
    <Tabs defaultValue="console" className="h-full">
  <TabsList className= "w-full flex justify-between">
    <TabsTrigger
      className= "w-full"
    value="input">Input</TabsTrigger>
    <TabsTrigger className= "w-full" value="console">Console</TabsTrigger>
    <TabsTrigger className= "w-full" value="chat">AI Kitty</TabsTrigger>
  </TabsList>
  <TabsContent value="input" className="h-full">
    <Textarea 
      value= {userInput}
      placeholder= "Enter your input here. Incase of multiple inputs, place them in a separate line."
      className= "h-96"
      onChange= {handleChange}
    />
  </TabsContent>
  <TabsContent value="console">
  <Console 
      output= {output}
    />
  </TabsContent>
  <TabsContent value="chat" className="h-full">
    <div className="flex flex-col justify-center items-center">
    <h2 className="text-4xl font-bold mt-10 gradient_text">AI Kitty</h2>
    <p className="text-xl font-medium mt-2">Your AI pair programmer</p>
    <div className="">
    <RiCopilotFill className="text-9xl mt-2 "/>
    </div>
    <p>Comming Sooon...</p>
    </div>
    </TabsContent>
</Tabs>

  )
}

export default Terminal