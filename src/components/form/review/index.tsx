import { Button } from '@/components/ui/button';
import { Prompt } from '@/types';


type ReviewPageProps = {
    prompt: Prompt
    goBack: () => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void>;
}

const ReviewPage = ({ prompt, goBack, handleSubmit }: ReviewPageProps) => {

    return (
        <div className="max-w-64 md:max-w-96 flex flex-col gap-4">
            <div className="flex gap-2 justify-center items-center">
                Step
                <div className="grid place-items-center min-w-8 min-h-8 rounded-full bg-black text-white">3</div>
            </div>
            <span className="text-small text-muted-foreground text-center">
                Review information and submit.
            </span>

            <div className="flex flex-col text-center gap-4">
                <span className="font-bold">Tableware: {prompt.tableware}</span>
                {prompt && prompt.fileUrl && 
                (
                    
                        <img
                            src={prompt.fileUrl}
                            alt="uploaded-image"
                            className="border-2 border-slate-400 hover:border-slate-600 rounded-lg"
                        />
                ) }
            </div>
           

            <div className="flex justify-between mt-8">
                <Button
                    variant="secondary"
                    onClick={() => goBack()}
                >
                    Previous
                </Button>
                <Button
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
            </div>
            
        </div>
    )
}

export default ReviewPage