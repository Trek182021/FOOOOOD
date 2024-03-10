import { Food, FoodResult } from "@/types";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type CarouselSelectProps = {
    selectedFood: string;
    handleFoodChange: (value: string) => void;
    currentData: FoodResult;
};

const CarouselSelect = ({
    selectedFood,
    handleFoodChange,
    currentData,
}: CarouselSelectProps) => {
    console.log(selectedFood);
    const [_calories, setCalories] = useState<number>();
    const [_protein, setProtein] = useState<number>();
    const [_carbohydrates, setCarbohydrates] = useState<number>();

    useEffect(() => {
        if (currentData && selectedFood) {
            const matchingFood = currentData.instances.find(
                (food) => food.description === selectedFood
            );
            if (!(matchingFood) || !matchingFood.NutritionFacts) return

            const { calories, carbohydrates, protein } =
                matchingFood!.NutritionFacts;

            setCalories(calories);
            setProtein(protein);
            setCarbohydrates(carbohydrates);
        }
    }, [currentData, selectedFood]);
    return (
        <div className="custom-select flex flex-col gap-4 items-center">
            <Select
                value={selectedFood}
                onValueChange={(value: string) => handleFoodChange(value)}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select food" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup className="group-test">
                        <SelectLabel className="font-nutrition">
                            Food Options
                        </SelectLabel>
                        {currentData["instances"].map((foodItem) => (
                            <SelectItem
                                key={foodItem.description}
                                value={foodItem.description}
                                className="font-nutrition font-inherit"
                            >
                                {foodItem.description}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            <div className="font-nutrition">
                <div>Nutritional Facts:</div>
                <div>{`Calories: ${!_calories ? "0": Math.round(_calories * currentData.quantity)}`}</div>
                <div>{`Protein: ${!_protein ? "Calories Not Found": Math.round(_protein * currentData.quantity)}`}</div>
                <div>{`Carbohydrates: ${!_carbohydrates ? "Calories Not Found": Math.round(_carbohydrates * currentData.quantity)}`}</div>
                <div>Estimated Portion Size: {currentData.quantity * 100}</div>
            </div>
        </div>
    );
};

export default CarouselSelect;
