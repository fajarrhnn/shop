import { baseUrl } from "@/lib/utils";
import { getToken } from "./getToken";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { CartsTypes } from "@/lib/definition";

export async function deleteCart(id: string) {
  const token = await getToken();
  try {
    const res = await fetch(`${baseUrl}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      toast({
        title: "Failed to remove item from cart"
      })
    } else {
      return window.location.reload()
    }
  } catch (error) {
    console.error(error);
  }
}

export async function addCart(id: string, qty: number) {
  const token = await getToken();
  try {
    const response = await fetch(`${baseUrl}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ product_id: id, quantity: qty }),
    });

    return response.json()
  } catch (error) {
    console.error(error);
  }
}

export function useGetCart() {
  const [cart, setCart] = useState<CartsTypes[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchGetDataCart() {
      try {
        const token = await getToken();
        const res = await fetch(`${baseUrl}/api/cart`, {
          method: "GET",
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
        });
        const response = await res.json()
        if (res.status === 404) {
          setMessage(response?.message)
        } else if (res.status === 200) {
          const data = response?.result?.rows || [];
          setCart(data);
        } else {
          return new Error("Error Mas");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchGetDataCart()
  }, [])

  return { cart, message }
}
