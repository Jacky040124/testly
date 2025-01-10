"use client"
import { useForm, SubmitHandler } from "react-hook-form";

type signInData = {
    email: string;
    password: string;
}

export default function SignIn() {
    const {register, handleSubmit} = useForm<signInData>();

    const onSubmit: SubmitHandler<signInData> = data => console.log(data);

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