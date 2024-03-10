import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { MoveDown } from "lucide-react"
import { Link } from "react-router-dom"

const GettingStartedPage = () => {
  return (
    <>
      <div className="bg-[url('/assets/images/bg.png')] flex flex-col min-h-96 bg-center h-screen">
        <Navbar />
        <section className="flex flex-col flex-1 justify-center items-center h-screen py-4 text-white relative">
          <div className="flex flex-col justify-center items-center mt-20">
            <h1 className="text-4xl font-bold">
              Food Calorie Tracker
            </h1>
            <h3 className="text-xl">
              Eating done better
            </h3>
            <Link
              to="/track"
            >
              <Button className="mt-2 bg-food">Get Started</Button>
            </Link>
            
          </div>

          <div className="absolute bottom-5">
            <a href="#steps">
              <MoveDown stroke="white"/>    
            </a>      
          </div>
        </section>

        
      </div>

      {/* Steps */}
      <section id="steps" className="flex flex-col items-center py-10 px-8 gap-8">
          <h2 className="text-xl">
            How to use
          </h2>
          <div className="flex flex-col gap-8">
            <div className="flex gap-8 min-h-16">
              <div className="min-w-8 h-8 rounded-full bg-black text-white grid place-items-center">
                1
              </div>
              <p>
              Pick which type of tableware is used. (small bowl, medium bowl or plate).
              </p>
            </div>
            <div className="flex gap-8 min-h-16">
              <div className="min-w-8 h-8 rounded-full bg-black text-white grid place-items-center">
                2
              </div>
              <p>
              Upload Image
              </p>
            </div>
            <div className="flex gap-8 min-h-16">
              <div className="min-w-8 h-8 rounded-full bg-black text-white grid place-items-center">
                3
              </div>
              <p>
              Submit and verify results!
              </p>
            </div>
          </div>
      </section>

      {/* How it works */}
      <section className="flex flex-col items-center py-10 px-8 lg:px-48 gap-8 bg-black text-white">
        <h2 className="text-xl">
          How it works
        </h2>
        <div className="flex flex-col gap-8">
          <div className="flex gap-8 min-h-16">
            <div className="min-w-8 h-8 rounded-full bg-white text-black grid place-items-center">
              1
            </div>
            <p>
              Our segmentation algorithm builds upon the Yolov8 architecture, fine-tuned using the comprehensive FoodSeg103 dataset—a recognized benchmark for food-segmentation models.
            </p>
          </div>
          <div className="flex gap-8 min-h-16">
            <div className="min-w-8 h-8 rounded-full bg-white text-black grid place-items-center">
              2
            </div>
            <p>
            Upon receiving user-uploaded images, we meticulously extract crucial information such as masks and bounding boxes for each distinct food item. These masks are then applied to the original image, allowing us to isolate and identify individual food pieces
            </p>
          </div>
          <div className="flex gap-8 min-h-16">
            <div className="min-w-8 h-8 rounded-full bg-white text-black grid place-items-center">
              3
            </div>
            <p>
            Leveraging the pre-trained model, we predict the specific type of each segmented food item. Subsequently, we cross-reference these predictions with the USDA food nutrition dataset to retrieve detailed nutritional facts for each identified food component. If the food item has variations, we provide the user with a list of options to choose from. (i.e: Salted or Unsalted butter, etc.)
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default GettingStartedPage