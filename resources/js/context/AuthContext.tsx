import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

// Define what the Auth state looks like
interface AuthContextType {
    user: any;
    setUser: (user: any) => void;
    loading: boolean;
    logout: () => Promise<void>;
    signOut: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [signOut, setSignOut] = useState<any>(null);

    // This runs ONCE when the app starts/refreshes
    useEffect(() => {
        let isMounted = true;
        const checkAuth = async () => {
            setLoading(true);
            try {
                // Try to get the current user from Laravel session
                const res = await api.get('/user');
                setUser(res.data);
                if (isMounted) setUser(res.data);
            } catch (err) {
                if (isMounted) setUser(null);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        checkAuth();
        return () => { isMounted = false; };
    }, []);

    // Inside your AuthProvider component
    const logout = async () => {
        try {
            const res = await api.post('/logout'); // Call Laravel logout
            setSignOut(res.data);
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            // Always clear the local user state regardless of API success
            setUser(null);
            // React Router will automatically kick the user to /signin 
            // because of the PrivateRoute logic
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, logout, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook so you can use 'useAuth()' in any component
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};