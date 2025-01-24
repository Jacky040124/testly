"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "@/app/action";
import { useState } from "react";

type signInData = {
    email: string;
    password: string;
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<signInData>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const onSubmit: SubmitHandler<signInData> = async (data) => {
        setLoading(true);
        setErrorMessage(null);
        const isSuccess = await signUp(data);
        setLoading(false);

        if (!isSuccess) {
            setErrorMessage("Sign up failed, please try again.");
        } else {
            console.log("Sign up successful");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-center">Email:</label>
                        <input 
                            type="email" 
                            {...register("email", { required: "Email is required" })} 
                            className={`mt-1 block w-full border rounded-md p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-blue-300`} 
                        />
                        {errors.email && <span className="text-red-500 text-sm text-center">{errors.email.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 text-center">Password:</label>
                        <input 
                            type="password" 
                            {...register("password", { required: "Password is required" })} 
                            className={`mt-1 block w-full border rounded-md p-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring focus:ring-blue-300`} 
                        />
                        {errors.password && <span className="text-red-500 text-sm text-center">{errors.password.message}</span>}
                    </div>

                    <button 
                        type="submit" 
                        className={`w-full py-2 px-4 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200`}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>

                    {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
                </form>
            </div>
        </div>
    );
}