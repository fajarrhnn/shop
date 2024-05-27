"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/services";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatter } from "@/lib/utils";
import { ProductsTypes } from "@/lib/definition";
import { useCounter } from "@/lib/useCounter";
import DetailProductSkeleton from "./loader";

async function fetchData(slug: string) {
  try {
    const url = process.env.URL || "http://localhost:3000";
    const res = await fetch(`${url}/api/products/${slug}`, {
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


export default function DetailProduct({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const { slug } = params;
  const [products, setProducts] = useState<ProductsTypes[]>([]);
  const { count, increase, decrease } = useCounter()
  const { back } = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  async function postData(id: string, qty: number) {
    const token = await getToken();
    try {
      const url = process.env.URL || "http://localhost:3000";
      const res = await fetch(`${url}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ product_id: id, quantity: qty }),
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getProductData() {
      try {
        const res = await fetchData(slug);
        const product: ProductsTypes[] = res.result.rows;
        setProducts(product);
      } catch (error) {
        console.error(error);
      }
    }

    getProductData();
  }, [slug]);

  if (isLoading) {
    return <DetailProductSkeleton />
  }

  return (
    <>
      {products.length > 0 &&
        <>
          {products?.map(({ title, image, id, description, price, category }) => (
            <Card key={id} className="bg-white w-full mx-auto h-max flex flex-col">
              <div className="mt-4 w-1/3 md:w-44 mx-auto">
                <Image
                  src={image}
                  alt={title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
              <CardContent className="relative flex flex-col">
                <div className="flex justify-between items-center">
                  <Button size="icon" onClick={() => back()} variant="secondary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                      />
                    </svg>
                  </Button>
                  <p className="text-purple-600">{category}</p>
                </div>
                <div className="space-y-3 mt-5">
                  <h1 className="text-lg">{title}</h1>
                  <p className="text-xl font-bold">
                    {formatter.format(price)}
                  </p>
                  <p className="text-gray-600">{description}</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center space-x-3">
                <div className="flex flex-row space-x-2 items-center">
                  <Button size="icon" variant="secondary" onClick={decrease}>
                    <MinusIcon className="w-4 h-4" />
                  </Button>
                  <p className="text-lg">{count}</p>
                  <Button size="icon" variant="secondary" onClick={increase}>
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={() => {
                  postData(id, count),
                    toast({
                      title: "Successfully add to cart",
                    })
                }}
                  variant="secondary">
                  Add To Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </>
      }
    </>
  );
}