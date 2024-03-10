import React, { useState } from 'react'
import TablewarePage from './tableware'
import Navbar from '../navbar'
import UploadPage from './upload'
import { Prompt } from '@/types'
import ReviewPage from './review'
import ResultsPage from './results'



const CalorieTrackerPage = () => {
  const [counter, setCounter] = useState(0);
  const [prompt, setPrompt] = useState<Prompt>({
    tableware: "rg-plate",
    file: null,
    fileUrl: "",
  })

  function goNext() {
    if (counter + 1 > 2) {
      return
    }
    setCounter(counter+1);
  }
  
  function goBack() {
    if (counter - 1 < 0) {
      return
    }
    setCounter(counter-1);
  }

  // function updateForm()

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    if (!prompt.file) {
      console.log("No File Uploaded")
      return
    }
  }


  const forms = [
    {
      title: "Tableware",
      element: <TablewarePage prompt={prompt} goNext={goNext} setPrompt={setPrompt}/>,
    },
    {
      title: "Upload",
      element: <UploadPage prompt={prompt} goNext={goNext} goBack={goBack} setPrompt={setPrompt}/>,
    },
    {
      title: "Review",
      element: <ReviewPage prompt={prompt} goBack={goBack} handleSubmit={handleSubmit}/>
    },
    {
      title: "Results",
      element: <ResultsPage prompt={prompt} />
    }
  ]
  return (
    <>
        <Navbar isBlack/>
        <section className="flex flex-col items-center">
           {/* {forms[counter].element} */}
           <ResultsPage prompt={prompt}/>
        </section>

    </>
  )
}

export default CalorieTrackerPage