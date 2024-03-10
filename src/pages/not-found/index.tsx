import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { MoveDown } from "lucide-react"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <>
      <div className="bg-[url('/assets/images/bg.png')] flex flex-col min-h-96 bg-center h-screen">
        <Navbar />
        <section className="flex flex-col flex-1 justify-center items-center h-screen py-4 text-white relative">
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl font-bold">
              Oops, Page Not Found
            </h1>
            <h3 className="text-xl">
              Please contact the system administrator.
            </h3>
            <Link 
                to="/" 
                className="mt-4"
            >
                <Button className="bg-food">
                    Go back to home.
                </Button>
            </Link>
          </div>

          <div className="absolute bottom-5">
            <a href="#steps">
              <MoveDown stroke="white"/>    
            </a>      
          </div>
        </section>

        
      </div>
    </>
  )
}

export default NotFoundPage