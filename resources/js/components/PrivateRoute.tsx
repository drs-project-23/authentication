import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast, {Toaster} from "react-hot-toast";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { user, loading, logout, signOut } = useAuth();

    if (loading) return <div className="flex flex-col justify-center items-center h-screen"><span className="loading loading-spinner loading-xl"></span></div>;

    if (!user) {
        if(signOut){
            toast.success(signOut.message);
            return <Navigate to="/signin" replace />;
        }else{

            toast(" ‼️Unauthorized You must be sign in first", { duration: 3000 });
            return <Navigate to="/signin" replace />;
        }

    }

    return <>{children}</>;
}