import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FoodResult } from "@/types";
import { useEffect, useState } from "react";
import CarouselSelect from "./select";

type ResultsCarouselProps = {
    data: FoodResult[];
};

const ResultsCarousel = ({ data }: ResultsCarouselProps) => {
    const [selectedFood, setSelectedFood] = useState(
        data[0].instances[0].description
    );
    const [api, setApi] = useState<CarouselApi>();
    const [currentData, setCurrentData] = useState<FoodResult>(data[0]);

    const handleFoodChange = (value: string) => {
        // Update the selectedFood state when the value changes
        setSelectedFood(value);
    };

    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            const selectedSnap = api.selectedScrollSnap();

            // Ensure the selectedSnap is within the bounds of the data array
            // console.log(selectedSnap);
            setCurrentData(data[selectedSnap]);
            setSelectedFood(data[selectedSnap].instances[0].description);
        });
    }, [api]);

    return (
        <div className="flex flex-col justify-center md:flex-row w-full gap-16">
            <Carousel className="w-full max-w-xs" setApi={setApi}>
                <CarouselContent>
                    {data.map((food, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex flex-col aspect-square items-center justify-between p-6">
                                        <span className="text-4xl font-semibold font-nutrition">
                                            {currentData.name}
                                        </span>
                                        {data && (
                                            <div
                                                style={{
                                                    position: "relative",
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            >
                                                {/* Bottom image */}
                                                <img
                                                    src={food.backgroundUrl}
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        zIndex: 0,
                                                    }}
                                                />
                                                {/* Top image with transparency */}
                                                <img
                                                    src={food.imageUrl}
                                                    style={{
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        zIndex: 1,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="flex flex-col items-center justify-center font-nutrition">
                {currentData && (
                    <>
                        <CarouselSelect
                            currentData={currentData}
                            selectedFood={selectedFood}
                            handleFoodChange={handleFoodChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultsCarousel;
