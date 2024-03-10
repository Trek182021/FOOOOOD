export type Prompt = {
    tableware: "sm-bowl" | "rg-bowl" | "sm-plate" | "rg-plate",
    file: File | null,
    fileUrl: string;
}

export type NutritionFacts = {
    calories: number;
    protein: number;
    carbohydrates: number;
}

export type Food = {
    name: string;
    description: string;
    nutritionalFacts: NutritionFacts;
}

export type FoodResult = {
    name: string;
    imageUrl: string;
    instances: Food[]
}