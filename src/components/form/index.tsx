import React, { useState } from 'react'
import TablewarePage from './tableware'
import Navbar from '../navbar'
import UploadPage from './upload'
import { Prompt } from '@/types'



const CalorieTrackerPage = () => {
  const [counter, setCounter] = useState(0);
  const [prompt, setPrompt] = useState<Prompt>({
    tableware: "rg-plate",
    file: null
  })

  function goNext() {
    if (counter + 1 > 1) {
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

  // function onSubmit() {
  //   console.log("Submit form")
  // }


  const forms = [
    {
      title: "Tableware",
      element: <TablewarePage prompt={prompt} goNext={goNext} setPrompt={setPrompt}/>,
    },
    {
      title: "Upload",
      element: <UploadPage prompt={prompt} goNext={goNext} goBack={goBack} setPrompt={setPrompt}/>,
    },
    // {
    //   title: "Review",
    //   element: <ReviewPage goBack={goBack} onSubmit={onSubmit}
    // }
  ]
  return (
    <>
        <Navbar isBlack/>
        <section className="flex flex-col items-center">
           {forms[counter].element}
        </section>

    </>
  )
}

export default CalorieTrackerPage