import React, { useEffect, useState } from "react";
import ResultsCarousel from "./Carousel";
import { Prompt, FoodResult } from "@/types";

const baseURL = "http://127.0.0.1:5000";

type ResultsPageProps = {
    prompt: Prompt;
};

const sampleData: FoodResult[] = [
    {
        name: "BUTTER",
        imageUrl:
            "https://media.istockphoto.com/id/177834117/photo/butter-isolated-on-white.jpg?s=612x612&w=0&k=20&c=wKXNDSvB-tzfT9RPdmKsH2JAGpBv7OISdUmGdegupxg=",
        instances: [
            {
                description: "BUTTER,WITH SALT",
                NutritionFacts: {
                    calories: 717,
                    protein: 0.85,
                    carbohydrates: 0.06,
                },
            },
            {
                description: "BUTTER,WHIPPED,WITH SALT",
                NutritionFacts: {
                    calories: 717,
                    protein: 0.85,
                    carbohydrates: 0.06,
                },
            },
            {
                description: "BUTTER OIL,ANHYDROUS",
                NutritionFacts: {
                    calories: 876,
                    protein: 0.28,
                    carbohydrates: 0,
                },
            },
        ],
        quantity: 1,
    },
    {
        name: "CHEESE",
        imageUrl:
            "https://t3.ftcdn.net/jpg/05/66/02/98/360_F_566029808_X7praimuCQt0MsLCmw5d65Pp5KqmTS8e.jpg",
        instances: [
            {
                description: "CHEESE,WITH SALT",
                NutritionFacts: {
                    calories: 717,
                    protein: 0.85,
                    carbohydrates: 0.06,
                },
            },
            {
                description: "CHEESE,WHIPPED,WITH SALT",
                NutritionFacts: {
                    calories: 717,
                    protein: 0.85,
                    carbohydrates: 0.06,
                },
            },
            {
                description: "CHEESE OIL,ANHYDROUS",
                NutritionFacts: {
                    calories: 876,
                    protein: 0.28,
                    carbohydrates: 0,
                },
            },
        ],
        quantity: 1,
    },
];

const ResultsPage = ({ prompt }: ResultsPageProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<FoodResult[]>();

    const fetchData = async () => {
        if (!prompt.file) {
            throw new Error("No File Uploaded.");
        }
        const form = new FormData();
        form.append("file", prompt.file!);

        try {
            const response = await fetch(`${baseURL}/evaluate`, {
                method: "POST",
                body: form,
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            const jsonData = await response.json();
            console.log(jsonData);
            setData(jsonData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="md:min-w-128 flex flex-col items-center justify-center gap-4 w-full">
            <div className="flex gap-2 justify-center items-center">
                Step
                <div className="grid place-items-center min-w-8 min-h-8 rounded-full bg-black text-white">
                    4
                </div>
            </div>
            <span className="text-small text-muted-foreground text-center">
                Food Classification Results and Estimation
            </span>

            {loading || !data ? (
                <div className="flex flex-col items-center gap-8 mt-12">
                    <img
                        src="/assets/icons/loader.svg"
                        alt="loader"
                        width={24}
                        height={24}
                    />
                    Generating results. Please wait.
                </div>
            ) : (
                <ResultsCarousel data={data} />
            )}
        </div>
    );
};

export default ResultsPage;
