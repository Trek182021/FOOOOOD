import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const foodItems = [
    {
        name: "apple",
        calories: "50",
        instances: 3
    },
    {
        name: "banana",
        calories: "75",
        instances: 10
    },
    {
        name: "burger",
        calories: "500",
        instances: 1
    }
]

const ResultsCarousel = () => {
    const [selectedFood, setSelectedFood] = useState(foodItems[0].name);

    const handleFoodChange = (value: string) => {
        // Update the selectedFood state when the value changes
        setSelectedFood(value);
    };
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
              { false &&
                <img
                    src=""
                    alt="image"
                />
              }
            </div>
          </CarouselItem>
        ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
        <div className="flex flex-col items-center">
            <Select 
                defaultValue="apple"
                onValueChange={(value: string) => handleFoodChange(value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select food" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Food</SelectLabel>
                        {
                            foodItems.map((foodItem) => (
                                <SelectItem value={foodItem.name}>{foodItem.name}</SelectItem>
                            ))
                        }
                    </SelectGroup>
                    
                </SelectContent>
            </Select>
            Calories: {(foodItems.filter((item) => {return item.name == selectedFood}))[0].calories}
            
        </div>
    </Carousel>
  )
}

export default ResultsCarousel