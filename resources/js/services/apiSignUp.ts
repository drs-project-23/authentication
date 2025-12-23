import api from "./api";

const API_URL = "/signup";

export const storeUserCredentials = async (form: any) => {
    const res = await api.post(API_URL, { form });
    return res.data;
}