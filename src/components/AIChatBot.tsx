"use client"

import { Button } from "@/components/ui/button";
import { chat } from "@/service/chat.service"
import { useGlobal } from "@/contexts/GlobalContext";
import { useState } from "react";

export function AIChatBot() {
    const {questionSet, index} = useGlobal();
    const [isLoading, setIsLoading] = useState(false);
    const [chatResult, setChatResult] = useState("");
    const currentQuestion = questionSet?.questions[index];
    
    const handleChat = async (prompt: string) => {
        setIsLoading(true);
        if (currentQuestion) {
            const content = `${prompt} for this question: "${currentQuestion.text}" with options: ${currentQuestion.options.map(opt => opt.text).join(", ")}`;
            console.log("Sending to OpenAI:", content);
            const result = await chat(content);
            console.log("Received from OpenAI:", result);
            setChatResult(result);
            setIsLoading(false);
        }
    }

    return (
        <div className="relative border-2 border-[var(--duo-gray-200)] rounded-2xl p-6 bg-white space-y-6">
            <div className={`${isLoading ? 'blur-sm pointer-events-none' : ''} transition-all duration-200`}>
                {/* Quick Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="h-auto py-3 px-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 justify-start font-medium"
                        onClick={() => handleChat("Give me a hint")}
                    >
                        Give me a hint
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto py-3 px-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 justify-start font-medium"
                        onClick={() => handleChat("Help me understand this")}
                    >
                        Help me understand this
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto py-3 px-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 justify-start font-medium"
                        onClick={() => handleChat("Show me an example")}
                    >
                        Show me an example
                    </Button>
                    <Button
                        variant="outline"
                        className="h-auto py-3 px-4 border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-blue-600 justify-start font-medium"
                        onClick={() => handleChat("I have a question")}
                    >
                        I have a question
                    </Button>
                </div>
                
                {/* Result Display */}
                {chatResult && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-blue-800 whitespace-pre-wrap">{chatResult}</p>
                    </div>
                )}
            </div>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-blue-600 font-medium">Thinking...</div>
                </div>
            )}
        </div>
    );
} 