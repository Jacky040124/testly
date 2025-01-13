"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { signUp } from "@/app/action";

type signInData = {
    email: string;
    password: string;
}


export default function SignUp() {
    const {register, handleSubmit} = useForm<signInData>();

    const onSubmit: SubmitHandler<signInData> = async (data) => {
        const isSucess = await signUp(data);
        if (isSucess) {
            console.log("sign up sucessful");
        } else {
            console.log("sign up failed");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
                <label className="flex flex-col"> 
                    Email: 
                    <input {...register("email")} /> 
                </label>

                <label className="flex flex-col"> 
                    Password: 
                    <input {...register("password")} /> 
                </label>
                <button type="submit" value="submit"> Submit </button>
            </form>
        </div>
    );
}