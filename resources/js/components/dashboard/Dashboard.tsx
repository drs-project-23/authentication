import { useAuth } from "../../context/AuthContext";

export default function Dashboard(){
    const { user, logout } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome back, {user?.username}!</p>
            
            <button 
                onClick={logout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Sign Out
            </button>
        </div>
    );
}