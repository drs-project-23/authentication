
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

import { userCredentials } from "../services/apiSignIn";

import { Link } from "react-router-dom";

import { FloatingLabel } from "flowbite-react";
import { Button } from "flowbite-react";
import { Icon } from '@iconify/react';
import toast, {Toaster} from "react-hot-toast";

export default function App(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        try {
            const data = await userCredentials(username, password);
            setUser(data); // This updates the Context!
            navigate('/dashboard');
        } catch (error: any) {
            setErrorMsg(error.response?.data.message || 'Login failed');
            toast.error(error.response?.data.message);
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Toaster position="top-right"/>
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="card w-full max-w-lg bg-gray-900 shadow-lg shadow-gray-950 rounded-2xl py-5 px-10">
                    <div className="px-3 pt-5">
                        <div className="flex flex-col justify-center items-center py-5">
                            <img src="/svg/DRS-icon.svg" alt="" className="w-[100px] h-[95px] mb-3 p-2 rounded-full bg-gray-800" />
                            <h2 className="text-3xl font-bold text-base-content mb-2">Welcome</h2>
                            <p className="text-sm text-base-content">Login to DRS</p>
                        </div>
                        <form onSubmit={handleSignIn}>
                            <div className="mb-5">
                                <FloatingLabel type="text" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" label="Username" autoComplete="off" />
                            </div>
                            <div className="mb-5">
                                <FloatingLabel type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" label="Password" />
                            </div>
                            <div className="flex justify-center my-5">
                                <Button type="submit" color="light" className="flex justify-center items-center gap-1">
                                    <Icon icon="mdi:account-lock-open" width={22}/> 
                                    <span>{loading ? 'Signing in...' : 'Sign in'}</span>
                                </Button>
                            </div>
                        </form>
                        <div className="flex justify-center pb-5">
                            <p>Don’t have an account?
                                <Link to={'/signup'} className="mx-1">
                                    <span className="link text-cyan-500 hover:underline">Sign up</span> 
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}