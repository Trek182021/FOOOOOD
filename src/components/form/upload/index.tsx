import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Prompt } from '@/types';
import { TriangleAlert, Upload } from 'lucide-react';
import { useEffect, useState } from 'react'


type UploadPageProps = {
    prompt: Prompt;
    goNext: () => void;
    goBack: () => void;
    setPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
}

const UploadPage = ({ prompt, goNext, goBack, setPrompt }: UploadPageProps) => {
    const [newFile, setFile] = useState<File>();
    const [alert, setAlert] = useState<boolean>(false);

    function handleStep(status: "back" | "next") {
        
        setPrompt((prevPrompt) => ({
            tableware: prevPrompt?.tableware || "",
            file: newFile!
        }));
        if (status == "back") {
            goBack();
        } else if (status == "next") {
            if (!newFile) {
                setAlert(true);
                return
            }
            goNext();
        }
        
    }

    useEffect(() => {
        if (prompt && prompt.file) {
            setFile(prompt.file)
        }
    }, [prompt])

    return (
        <div className="max-w-64 md:max-w-96 flex flex-col gap-4">
            { alert &&
            <Alert variant="destructive">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    Please upload an image in order to continue.
                </AlertDescription>
            </Alert>
            }
            <div className="flex gap-2 justify-center items-center">
                Step
                <div className="grid place-items-center min-w-8 min-h-8 rounded-full bg-black text-white">2</div>
            </div>
            <span className="text-small text-muted-foreground text-center">
                Upload image with at most 500x500 resolution (png, jpeg).
            </span>

            {newFile ? 
            (
                <div className="grid place-items-center h-64 bg-slate-200 border-2 border-slate-400 hover:border-slate-600 rounded-lg border-dotted gap-4 mt-8">
                    File uploaded: {newFile.name}
                </div>
            ) 
            : 
            (<label htmlFor="fileInput" className="h-64 bg-slate-200 border-2 border-slate-400 hover:border-slate-600 flex flex-col items-center justify-center rounded-lg border-dotted gap-4 mt-4">
                <input
                    type="file"
                    id="fileInput"
                    className="hidden" 
                    onChange={(e) => (setFile(e.target.files![0]))}
                />

                <Upload className="w-12 h-12" />

                <div className="flex flex-col text-center">
                    <span>Drag File</span>
                    <span>or</span>
                    <span>Click here to upload</span>
                </div>
            </label>
            )}

            <div className="flex justify-between mt-8">
                <Button
                    variant="secondary"
                    onClick={() => handleStep("back")}
                >
                    Previous
                </Button>
                <Button
                    onClick={() => handleStep("next")}
                >
                    Next
                </Button>
            </div>
            
        </div>
    )
}

export default UploadPage