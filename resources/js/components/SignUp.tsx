import { Link } from "react-router-dom";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { Icon } from '@iconify/react';
import toast, { Toaster } from "react-hot-toast";

import { useForm } from "../schemas/regSchema";
import { validate } from "../schemas/regSchema";
import { FormEvent, useState } from "react";
import { storeUserCredentials } from "../services/apiSignUp";

const initialData = { username: "", name: "", email: "", password: "", password_confirmation: "" };

export default function SignUp(){

    const { values, errors, touched, handleChange, handleBlur, resetForm } = useForm(initialData, validate);
    const [loading, setLoading] = useState(false);

    const fieldNames: Record<string, string> = {
        "form.username": "Username",
        "form.email": "Email",
        "form.password": "Password",
        "form.confirmPassword": "Confirm Password",
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const finalErrors = validate(values);

        if(Object.keys(finalErrors).length !== 0){
            return;
        }

        setLoading(true);

        try {
            const resSignUp = await storeUserCredentials(values);

            if(resSignUp.success){

                setTimeout(() => {
                    toast.success(resSignUp.message);
                    setLoading(false);
    
                    //setValues(initialData);
                    resetForm();
                }, 3000);
            }
        } catch (error: any) {
            const mapped: Record<string, string> = {};
            for(let [key, value] of Object.entries(error.response.data.errors)){
                const errorKeys = fieldNames[key] || key;

                if (Array.isArray(value) && value.length > 0) {
                    const message = value[0].replace(key, errorKeys);
                    mapped[key] = message;
                    toast.error(message);
                }
            }

        }

        
    }

    return (
        <div>
            <Toaster position="top-right"/>
            <div className="flex flex-col justify-center items-center h-screen overflow-y-auto">
                <div className="card w-full max-w-lg bg-gray-900 shadow-lg shadow-gray-950 rounded-xl py-5 px-10">
                    <div className="px-3 pt-5">
                        <div className="flex flex-col justify-center items-center py-5">
                            <img src="/svg/DRS-icon.svg" alt="" className="w-[100px] h-[95px] mb-3 p-2 rounded-full bg-gray-800" />
                            <p className="text-base-content/80">Sign up for new account</p>
                        </div>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-5">
                                <FloatingLabel type="text" value={values.username} name="username" onChange={handleChange} onBlur={handleBlur} variant="outlined" label="Username" autoComplete="off"/>
                                { touched.username && errors.username && <span className="text-xs text-red-400">{ errors.username }</span> }
                            </div>
                            <div className="mb-5">
                                <FloatingLabel type="text" value={values.name} name="name" onChange={handleChange} onBlur={handleBlur} variant="outlined" label="Fullname" autoComplete="off"/>
                                { touched.name && errors.name && <span className="text-xs text-red-400">{ errors.name }</span> }
                            </div>
                            <div className="mb-5">
                                <FloatingLabel value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} type="email" variant="outlined" label="Email" className="bg-gray-900" autoComplete="off" />
                                { touched.email && errors.email && <span className="text-xs text-red-400">{ errors.email }</span> }
                            </div>
                            <div className="mb-5">
                                <FloatingLabel type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} variant="outlined" label="Password" />
                                { touched.password && errors.password && <span className="text-xs text-red-400">{ errors.password }</span> }
                            </div>
                            <div className="mb-5">
                                <FloatingLabel value={values.password_confirmation} onChange={handleChange} onBlur={handleBlur} name="password_confirmation" type="password" variant="outlined" label="Confirm Password" />
                                { touched.password_confirmation && errors.password_confirmation && <span className="text-xs text-red-400">{ errors.password_confirmation }</span> }
                            </div>
                            <div className="flex justify-center my-5">
                                <Button type="submit" color="light" className="flex justify-center items-center gap-1">
                                    {
                                        !loading ? 
                                        (
                                            <>
                                                <Icon icon="mdi:account-plus" width={22}/> 
                                                <span>Sign up</span>
                                            </>
                                        )
                                        :
                                        (
                                            <>
                                                <span className="loading loading-spinner loading-sm mx-1"></span>
                                                Signing up...
                                            </>
                                        )
                                    }
                                </Button>
                            </div>
                        </form>
                        <div className="flex justify-center pb-5">
                            <p>Already have an account? 
                                <Link to={'/signin'} className="mx-1">
                                    <span className="link text-cyan-500 hover:underline">Sign in</span> 
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}