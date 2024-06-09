import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";
import { getToken } from "./getToken";
import { UsersTypes } from "@/lib/definition";

export function useGetFullName() {
    const [user, setUser] = useState<UsersTypes>();

    useEffect(() => {
        async function fetchUser() {
            try {
                const token = await getToken();
                const decoded: any = jwt.decode(token);
                if (decoded) {
                    setUser({
                        id: decoded?.id,
                        firstName: decoded?.firstName,
                        lastName: decoded?.lastName,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser()
    }, [])
    return user;
}
