"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { useGlobal } from "@/contexts/GlobalContext";
import { signIn } from "@/app/action";
import { ClientUser } from "@/types/User";


type signInData = {
    email: string;
    password: string;
}

export default function SignIn() {
    const {register, handleSubmit} = useForm<signInData>();
    const {user, setUser} = useGlobal();

    const onSubmit: SubmitHandler<signInData> = async (data) => {
        const newUser: ClientUser | null = await signIn(data);
        if (newUser == null) {
            console.log("not signed in");
        } else {
            console.log("user is sign in");
            // need to convert fetched User
            setUser(newUser);
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