import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Prompt } from "@/types";

type TablewareProps = {
    prompt: Prompt
    goNext: () => void;
    setPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
}

const formSchema = z.object({
    tableware: z.enum(["sm-bowl", "rg-bowl","sm-plate", "rg-plate"], {
        required_error: "Please select a tableware.",
    }),
})

export function TablewareForm({ prompt, goNext, setPrompt }: TablewareProps) {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        tableware: prompt ? prompt.tableware : "rg-plate",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      setPrompt((prevPrompt) => ({
        tableware: values.tableware,
        file: prevPrompt?.file || null
      }));
      goNext();
    }
    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-center space-y-8">
            <FormField
                control={form.control}
                name="tableware"
                render={({ field }) => (
                <FormItem>
                    <FormDescription>
                    Pick which type of tableware is used. (small bowl, medium bowl or plate).
                    </FormDescription>
                    <FormMessage />
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid md:min-w-16 md:min-h-16 md:grid-cols-2 gap-8 pt-2"
                    >
                    <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-slate-400">
                        <FormControl>
                            <RadioGroupItem value="sm-bowl" className="sr-only" />
                        </FormControl>
                        <div className="flex flex-col justify-between gap-2 items-center bg-slate-200 rounded-md border-2 border-muted p-1 hover:border-slate-400 h-full pt-2 pb-4">
                            <span className="block w-full p-2 text-center text-lg font-normal">
                                Small Bowl
                            </span>
                            <img
                                src="/assets/icons/sm-bowl.svg"
                                alt="small-bowl"
                                className="w-16 h-16 mb-4"
                            />
                        </div>
                        
                        </FormLabel>
                    </FormItem>
                    <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-slate-400">
                        <FormControl>
                            <RadioGroupItem value="rg-bowl" className="sr-only" />
                        </FormControl>
                        <div className="flex flex-col justify-between gap-2 items-center bg-slate-200 rounded-md border-2 border-muted p-1 hover:border-slate-400 h-full pt-2 pb-4">
                            <span className="block w-full p-2 text-center text-lg font-normal">
                                Regular Bowl
                            </span>
                            <img
                                src="/assets/icons/sm-bowl.svg"
                                alt="small-bowl"
                                className="w-20 h-20"
                            />
                        </div>
                        
                        </FormLabel>
                    </FormItem>
                    <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-slate-400">
                        <FormControl>
                            <RadioGroupItem value="sm-plate" className="sr-only" />
                        </FormControl>
                        <div className="flex flex-col justify-between gap-2 items-center bg-slate-200 rounded-md border-2 border-muted p-1 hover:border-slate-400 h-full pt-2 pb-4">
                            <span className="block w-full p-2 text-center text-lg font-normal">
                                Small Plate
                            </span>
                            <img
                                src="/assets/icons/rg-plate.svg"
                                alt="small-plate"
                                className="w-16 h-16"
                            />
                        </div>
                        
                        </FormLabel>
                    </FormItem>
                    <FormItem>
                        <FormLabel className="[&:has([data-state=checked])>div]:border-slate-400">
                        <FormControl>
                            <RadioGroupItem value="rg-plate" className="sr-only" />
                        </FormControl>
                        <div className="flex flex-col justify-between gap-2 items-center bg-slate-200 rounded-md border-2 border-muted p-1 hover:border-slate-400 h-full pt-2 pb-4">
                            <span className="block w-full p-2 text-center text-lg font-normal">
                                Regular Plate
                            </span>
                            <img
                                src="/assets/icons/rg-plate.svg"
                                alt="regular-plate"
                                className="w-20 h-20"
                            />
                        </div>
                        
                        </FormLabel>
                    </FormItem>
                    </RadioGroup>
                </FormItem>
                )}
            />
            
            <div className="flex w-full justify-center">
                <Button type="submit">Next</Button>
            </div>
        </form>
    </Form>
    )
}