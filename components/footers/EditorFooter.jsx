import { TbBrandGithubFilled } from "react-icons/tb";
import { IoMailSharp } from "react-icons/io5";

const EditorFooter = ({language}) => {
  return (
    <div className="primary flex items-center gap-4 fixed w-full bottom-0 justify-between">
      <div className="ml-6 font-medium">codeCat &#169;</div>
      <div className="flex justify-end items-center gap-4">
      <div>{`{ } ${language}`}</div>
      <a href="mailto:hey.usedeep@gmail.com" target="_blank"><IoMailSharp /></a>
      <a href="https://github.com/useDeep/codecat" target="_blank" className="mr-6"><TbBrandGithubFilled /></a>
      </div>
      </div>
  )
}

export default EditorFooter