import { FormEventHandler, useEffect, useState } from "react"
import { getToken } from "./getToken"
import { baseUrl } from "@/lib/utils"
import { AddressTypes } from "@/lib/definition";

interface initialAddress {
    state: string
    city: string
    district: string
    subDistrict: string
    neighborhood: string
    street: string
    zipCode: string
};

export type { initialAddress as AddAddressType }

export const usePostAddress = () => {

    const postAdress = async (data: initialAddress) => {

        const token = await getToken();

        try {
            const res = await fetch(`${baseUrl}/api/address`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await res.json()
            if (!res.ok) {
                return response.message || response.error
            } else {
                window.location.reload()
            }
        } catch (error) {
            console.error(error);
        }
    }
    return postAdress
}

export const useGetAddress = () => {
    const [location, setLocation] = useState<AddressTypes[]>([]);
    useEffect(() => {
        async function getAddress() {
            const token = await getToken();
            try {
                const res = await fetch(`${baseUrl}/api/address`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data: any = await res.json();
                const addresses: AddressTypes[] = data?.result?.rows || [];
                setLocation(addresses)
            } catch (error) {
                console.error(error);
            }
        }
        getAddress()
    }, [])
    return location
};

export const deleteAddress: FormEventHandler = async (e) => {
    e.preventDefault()
    const token = await getToken()
    try {
        await fetch(`${baseUrl}/api/address`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        return window.location.reload()
    } catch (error) {
        console.error(error)
    }
}