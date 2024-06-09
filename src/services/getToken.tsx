import { baseUrl } from "@/lib/utils";

export async function getToken() {
    const res = await fetch(`${baseUrl}/api/protect`, {
        method: "GET",
    });
    const data = await res.json();
    const token = await data.token;
    return token;
}