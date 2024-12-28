"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useEnvironment } from "@/contexts/EnvironmentContext";

export function QuestionCard() {
    const questionImageUrl = null;
    const { question } = useEnvironment();
    
    if (!question?.options) {
        return null;
    }

    return (
        <div className="h-[600px] flex flex-col border-2 border-[var(--duo-gray-200)] rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            {/* Header Section */}
            <div className="p-8 space-y-6">
                {questionImageUrl && (
                    <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100 border-2 border-[var(--duo-gray-200)] flex items-center justify-center">
                        <img
                            src={questionImageUrl}
                            alt="Question illustration"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'%3E%3C/circle%3E%3Cpolyline points='21 15 16 10 5 21'%3E%3C/polyline%3E%3C/svg%3E";
                                target.className = "w-12 h-12 opacity-30";
                            }}
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-[var(--duo-gray-400)] line-clamp-2">
                            {question.text}
                        </h1>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#E5F6D3] text-[var(--duo-green)] shrink-0">
                            Medium
                        </span>
                    </div>
                    <p className="text-[var(--duo-gray-400)] text-lg">
                        {questionImageUrl ?
                            "Look carefully at the road marking shown in the image and select the correct meaning." :
                            "Select the correct answer from the options below."
                        }
                    </p>
                </div>
            </div>

            {/* Options Section - Scrollable if needed */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                <RadioGroup className="space-y-4">
                    {question.options.map((option, index) => (
                        <div
                            key={`${index}-${option.text}`}
                            className="group flex items-center space-x-3 bg-white p-5 rounded-2xl border-2 border-[var(--duo-gray-200)] 
                                hover:border-[var(--duo-green)] hover:bg-[#F7FFF4] hover:shadow-[0_4px_0_0_#58CC02,0_6px_8px_rgba(0,0,0,0.1)] 
                                hover:-translate-y-[2px] active:translate-y-[2px] active:shadow-[0_0px_0_0_#58CC02,0_0px_0px_rgba(0,0,0,0.1)]
                                transition-all duration-75 cursor-pointer
                                data-[state=checked]:border-[var(--duo-green)] data-[state=checked]:bg-[#F7FFF4] data-[state=checked]:shadow-[0_4px_0_0_#58CC02,0_6px_8px_rgba(0,0,0,0.1)]"
                        >
                            <RadioGroupItem 
                                value={option.text} 
                                id={`option-${index}`}
                                className="text-[var(--duo-green)] w-5 h-5 border-2 group-hover:border-[var(--duo-green)]" 
                            />
                            <Label 
                                htmlFor={`option-${index}`}
                                className="text-lg font-bold text-[var(--duo-gray-400)] cursor-pointer group-hover:text-[var(--duo-green)] transition-colors line-clamp-2"
                            >
                                {option.text}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>
        </div>
    );
} 