import api from "./api";

const API_URL = "/signin";

export const userCredentials = async (username: string, password:string) => {
    try {
        // Get CSRF token first
        await api.get('/sanctum/csrf-cookie');

        // Then login
        const res = await api.post(API_URL, { username, password });
        return res.data;
    } catch (error: any) {
        // Optional: handle errors globally
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
}