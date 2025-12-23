import { useState, ChangeEvent, FormEvent, ChangeEventHandler } from "react";

export type SignUpFields = "name" | "username" | "email" | "password" | "password_confirmation";
export type FormErrors = Partial<Record<SignUpFields, string>>;

export const validate = (values: Record<SignUpFields, string>): FormErrors => {
    const errors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!values.username){
        errors.username = "Please enter username";
    }

    if(!values.name){
        errors.name = "Please enter fullname";
    }

    if(!values.email.includes("@") || !emailRegex.test(values.email)){
        errors.email = "Please enter a valid email.";
    }

    if(values.password.length < 8){
        errors.password = "Password must be at least 8 characters.";
    }

    if(values.password !== values.password_confirmation){
        errors.password_confirmation = "Passwords do not match.";
    }

    return errors;
}

export const useForm = (initialValues: any, validateFn: typeof validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };
        setValues(newValues);

        const validationErrors = validateFn(newValues);
        setErrors(validationErrors);
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        setTouched({ ...touched, [e.target.name]: true });
    }

    return { values, errors, touched, handleChange, handleBlur, resetForm }
}