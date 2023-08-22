'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { RiEdit2Fill } from "react-icons/ri";
import Image from "next/image"
import Link from "next/link"
import { languages } from "@/constants/languages";

const RepoCard = ( {repoDetails} ) => {
  const location= window.location.href
  console.log(repoDetails)
  if (!repoDetails) {
    return 
  }

  return(
    <>
    <div className="w-full grid grid-cols-3 gap-5">
  {repoDetails.map((item)=>{
    const s = languages.find((ele) => ele.id === item.languageId);
    let language
    if (s) {
        language= s.name
      };
    return(
      
    <Card 
    key={item.name}
    className="h-60 w-72">
           <Link 
      href={`${location}/editor?repo=${item.repo}&lang=${item.languageId}`}
    >
      <Image 
        className="w-full h-28"
        src="/cat-hero.png"
        width={100}
        height={100}
    />
  <CardHeader className=''>
    
    <CardTitle>{item.repo}</CardTitle>
    <CardDescription>{language}</CardDescription>
  </CardHeader>
  <CardFooter className="flex justify-end">
    <p className="flex items-center">Edit <RiEdit2Fill /></p>
  </CardFooter>
</Link>
</Card>

  )})}
  </div>
  </>
  )

}

export default RepoCard