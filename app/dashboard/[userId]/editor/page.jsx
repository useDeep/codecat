"use client"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import CodeEditor from '@/components/editor/CodeEditor';
import { useRouter } from 'next/navigation';
import { firebaseAuth } from '@/firebase/firebaseAuth'
import { firestore } from '@/firebase/firestore'
import EditorNavbar from '@/components/navbars/EditorNavbar';
import Sidebar from '@/components/sidebar/Sidebar';
import Terminal from '@/components/terminal/Terminal';
import Split from 'react-split'
import EditorFooter from '@/components/footers/EditorFooter';
import { languages } from '@/constants/languages';
import { getOutput } from '@/utils/judge0Api';

const page = ( {params} ) => {
  const router= useRouter()
  const searchParams= useSearchParams()
  const [user, setUser] = useState()
  const [code, setCode]= useState("")
  const [userInput, setUserInput]= useState('')
  const [userDataFetched, setUserDataFetched]= useState(false)
  const [files, setFiles]= useState({})
  const [updatedFiles, setUpdatedFiles]= useState(files)
    const userId= params.userId
    const repo= searchParams.get('repo')
    const lang= parseInt(searchParams.get('lang'))
  const [fileName, setFileName]= useState('main')
  const [output, setOutput]= useState({})
  const s = languages.find((ele) => ele.id === lang);
  
  let language
  let file= {}
  if (s) {
      language= s.value
    };
  
  useEffect( ()=> {
    const token = sessionStorage.getItem("Token")
    if (token == null){
      router.push('/')
    }
    const getUser= async (token)=>{
      const data= await firebaseAuth.decrypt(token)
      setUser(data)

      if (data){
        const re= await firestore.getFiles(userId, repo)
        setFiles(re)
      }
    }
    getUser(token)
    setUserDataFetched(true)
  }, [userDataFetched])

  if (files){
    file= files[fileName]
  }
  const onChange = (action, data) => {
    switch (action) {
      case "updatedFiles": {
        setUpdatedFiles(data);
        break;
      }
    }
  };
  const fileChange=(data) =>{
    setFileName(data)
  }

  const onCodeSubmit= async (token)=>{

    const data= await getOutput(token)
    setOutput(data)
  }

  return(
    <div className='h-100vh w-100vw overflow-y-hidden'>

      <EditorNavbar 
        user= {user}
        repo= {repo}
        lang= {lang}
        onCodeSubmit= {onCodeSubmit}
        userId= {userId}
        userInput= {userInput}
        file={file}
      />

      <Split
      className='flex'
      sizes={[15, 60, 25]}
      minSize={100}
      expandToMin={false}
      gutterSize={10}
      gutterAlign="center"
      snapOffset={30}
      dragInterval={1}
      direction="horizontal"
      cursor="col-resize"
      visiable={true}
      >
        <Sidebar 
          files= {files}
          fileChange= {fileChange}
          userId= {userId}
          repo= {repo}
          lang= {lang}
        />
        <CodeEditor 
          files= {files}
          file= {file}
          fileName= {fileName}
          code= {code}
          language= {language}
          onChange= {onChange}
        />
        <Terminal 
          user= {user}
          output= {output}
          userInput= {userInput}
          setUserInput= {setUserInput}
        />
      </Split>

      <EditorFooter 
        language= {language}
      />
    </div>
  )
}
    

export default page