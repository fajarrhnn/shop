import { baseUrl } from "@/lib/utils";

export async function getDataProducts() {
    try {
        const url = new URL(baseUrl);
        url.pathname = '/api/products';

        const res = await fetch(url.toString());

        if (!res.ok) {
            console.error(`Failed to fetch data (status code: ${res.status})`);
            const text = await res.text();
            console.error(`Response body error: ${text}`);
            return [];
        }

        const text = await res.text();
        const data = JSON.parse(text);

        return data;

    } catch (error) {
        console.error("Error Pak", error)
    }
}

export async function getDataProductsBySlug(slug: string) {
    try {
        const res = await fetch(`${baseUrl}/api/products/${slug}`, {
            method: "GET",
        });

        if (!res.ok) {
            console.error(`Error: ${res.statusText}`);
        }
        return res.json();
    } catch (error) {
        console.error(error);
    }
}