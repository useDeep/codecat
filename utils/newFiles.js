export let newFilesObject = {}
export const newFiles=  {
 updateFiles: (files)=>{
    newFilesObject= files
},
 getNewFiles: ()=>{
    return newFilesObject
}
}