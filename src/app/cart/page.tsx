"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { getToken } from "@/lib/services";
import { useEffect, useState } from "react";
import { CartsTypes } from "@/lib/definition";
import { formatter, subtotalPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

async function deleteCart(id: string) {
  const token = await getToken();
  const url = process.env.VERCEL_URL  || "http://localhost:3000";
  try {
    const res = await fetch(`${url}/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      console.error("Failed to remove data from cart", await res.json())
    } else {
      window.location.reload()
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Cart() {
  const { toast } = useToast()
  const [cart, setCart] = useState([]);
  const [errorMessage, seterrorMessage] = useState("");
  const subTotal = subtotalPrice(cart)

  useEffect(() => {
    async function getCart() {
      const token = await getToken();
      const url = process.env.VERCEL_URL  || "http://localhost:3000";
      try {
        const res = await fetch(`${url}/api/cart`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 404) {
          const response = await res.json();
          seterrorMessage(response.message);
        } else if (res.status === 200) {
          const response = await res.json();
          const data = response.result.rows;
          setCart(data);
        } else {
          seterrorMessage("Error Mas");
        }
      } catch (error) {
        console.error(error);
      }
    }
    getCart();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart?.map(({ id, title, image, price, quantity }: CartsTypes) => (
              <Card className="overflow-hidden" key={id}>
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <Image
                      alt={title}
                      className="rounded-md mr-4"
                      height={80}
                      src={image}
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "contain",
                      }}
                      width={80}
                    />
                    <div>
                      <h3 className="w-52 text-lg font-semibold truncate">
                        {title}
                      </h3>
                      <p className="text-gray-500">{formatter.format(price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* <Button className="mr-2" size="icon" variant="outline" onClick={decrease}>
                        <MinusIcon className="h-4 w-4" />
                      </Button> */}
                      <span className="text-lg font-semibold">Quantity: {quantity}</span>
                      {/* <Button className="ml-2" size="icon" variant="outline" onClick={increase}>
                        <PlusIcon className="h-4 w-4" />
                      </Button> */}
                    </div>
                    <Button
                      className="text-red-500"
                      size="icon"
                      variant="outline"
                      onClick={() => {
                        deleteCart(id),
                          toast({
                            title: "Successfully remove item from cart"
                          })
                      }}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="pt-4">
            <div className="grid grid-cols-2 items-center gap-2">
              <div className="col-span-1">
                <h3 className="font-medium">Subtotal</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
              <div className="text-right col-span-1">
                <span className="text-2xl font-bold">{formatter.format(subTotal)}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" variant="outline">
                <Link href={"/products"}>Continue Shopping</Link>
              </Button>
              <Button size="lg">Proceed to Checkout</Button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-xl text-center">{errorMessage}</p>
      )}
    </>
  );
}