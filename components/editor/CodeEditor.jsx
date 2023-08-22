'use client'
import { useEffect, useRef, useState } from 'react';
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import { newFiles } from '@/utils/newFiles';

const CodeEditor = ( {files, file, code, onChange, language, fileName} ) => {

  const [updatedFiles, setUpdatedFiles]= useState()

    const editorRef = useRef(null);
    const [value, setValue]= useState(code || "")

  const filesList = Object.keys(files);
  
  const handleEditorChange= (value, e)=>{
    setValue(value)
    filesList.map((item)=>{
      if (item == fileName){
        files[item]['code']= value
        newFiles.updateFiles(files)
        setUpdatedFiles(files)
      }
    })
    onChange("updatedFiles", updatedFiles)
  }

    useEffect(() => {
      editorRef.current?.focus();
    }, [file?.name]);
    return (
      <div className=''>
        <Editor
          height="95vh"
          theme="vs-dark"
          path={file?.name}
          defaultLanguage={language}
          defaultValue={file?.code}
          value={value}
          onChange={handleEditorChange}
          onMount={(editor) => (editorRef.current = editor)} 
          
        />
      </div>
    )
  }

export default CodeEditor