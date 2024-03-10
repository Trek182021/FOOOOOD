import React from 'react'
import ResultsCarousel from './Carousel'

const ResultsPage = () => {
  return (
    <div className="max-w-64 md:max-w-96 flex flex-col gap-4">
        <div className="flex gap-2 justify-center items-center">
            Step
            <div className="grid place-items-center min-w-8 min-h-8 rounded-full bg-black text-white">4</div>
        </div>
        <span className="text-small text-muted-foreground text-center">
            Food Classification Results and Estimation
        </span>

        <ResultsCarousel/>
    </div>
  )
}

export default ResultsPage