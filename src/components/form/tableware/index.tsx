import { Prompt } from "@/types";
import { TablewareForm } from "./form"
import React from "react";

type TablewareProps = {
  prompt: Prompt;
  goNext: () => void;
  setPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
}

const TablewarePage = ({ prompt, goNext, setPrompt }: TablewareProps) => {

  return (
    <>
        <div className="flex gap-2 justify-center items-center mb-8">
            Step
            <div className="grid place-items-center min-w-8 min-h-8 rounded-full bg-black text-white">1</div>
        </div>
        <TablewareForm prompt={prompt} goNext={goNext} setPrompt={setPrompt}/>
    </>
  )
}

export default TablewarePage