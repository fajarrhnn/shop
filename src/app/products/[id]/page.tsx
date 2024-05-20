
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductsTypes } from "@/lib/definition";
import { formatter } from "@/lib/utils";


export default function DetailProduct() {
    const [product, setProduct] = useState<ProductsTypes>()
    const count = 1;
    const { id } = useParams()
    const back = useRouter();

    async function getProduct() {
        const fetchData = await fetch(`https://fakestoreapi.com/products/${id}`)
        const data = await fetchData.json()
        setProduct(data)
    }

    useEffect(() => {
        getProduct()
    }, [id])

    if (!product) {
        return <h1>Loading.....</h1>
    }

    return (
        <>
            {product &&
                <Card
                    key={product.id}
                    className="bg-white w-full mx-auto h-max flex flex-col"
                >
                    <div className="mt-4 w-1/3 md:w-44 mx-auto">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                    <CardContent className="relative flex flex-col">
                        <div className="flex justify-between items-center">
                            <Button size="icon" onClick={() => back.back()} variant={'secondary'}>
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
                            <p className="text-purple-600">{product.category}</p>
                        </div>
                        <div className="space-y-3 mt-5">
                            <h1 className="text-lg">{product.title}</h1>
                            <p className="text-xl font-bold">{formatter.format(product.price)}</p>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center space-x-3">
                        <div className="flex flex-row space-x-2 items-center">
                            <Button size="icon" variant={'secondary'}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 12h14"
                                    />
                                </svg>
                            </Button>
                            <p className="text-lg">{count}</p>
                            <Button size="icon" variant={'secondary'}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"
                                    />
                                </svg>
                            </Button>
                        </div>
                        <Button variant={'secondary'}>Add To Cart</Button>
                    </CardFooter>
                </Card>
            }
        </>
    )
}
