import { useState } from "react";
import { baseUrl } from "@/lib/utils";

interface AuthLoginData {
    email: string;
    password: string;
}

interface AuthSignUpData {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export type { AuthSignUpData as SignUpDataType }
export type { AuthLoginData as LoginDataType }

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>('')

    const login = async (data: AuthLoginData) => {
        setLoading(true);

        try {
            const response = await fetch(`${baseUrl}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await response.json()

            if (response.status === 404) {
                setMessage(result?.message)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            } else if (response.status === 401) {
                setMessage(result?.message)
                setTimeout(() => {
                    setLoading(false)
                }, 300);
            } else if (response.ok) {
                return window.location.href = "/";
            } else {
                setMessage('Failed to Sign In')
            }
        } catch (error) {
            console.error(error)
        }
    };

    return { login, loading, message };
}

export function useSignUp() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const signup = async (data: AuthSignUpData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${baseUrl}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await response.json()

            if (response.status === 404) {
                return result.message
            } else if (response.status === 401) {
                return result.message
            } else if (response.ok) {
                return window.location.href = "/";
            } else {
                new Error('Failed to Sign Up')
            }
        } catch (error) {
            console.error(error)
        }
    };

    return { signup, loading, error };
}