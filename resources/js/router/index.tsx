import { createBrowserRouter } from "react-router-dom";
import App from "../components/App";
import SignUp from "../components/SignUp";
import Dashboard from "../components/dashboard/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import NotFound from "../components/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/signin',
        element: <App />
    },
    {
        path: '/signup',
        element: <SignUp />
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )
    },
    {
        path: '*',
        element: <NotFound />
    }
]);

export default router;