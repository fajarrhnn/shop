import { useRouter } from "next/router";
import { useState } from "react";

export const useLogout = async () => {
    const [user, setUser] = useState(null)
    const router = useRouter()
    try {
        const res = await fetch('/api/protect', {
            method: 'POST',
        });
        const data = await res.json();

        if (data.success) {
            setUser(null);
            router.push('/login');
        } else {
            console.error('Failed to logout');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
