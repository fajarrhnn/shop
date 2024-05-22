import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { Card } from "@/components/ui/card"

export default function Cart() {
    return (
        <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                    <div className="p-4">
                        <div className="flex items-center mb-4">
                            <Image
                                alt="Product Image"
                                className="rounded-md mr-4"
                                height={80}
                                src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
                                style={{
                                    aspectRatio: "80/80",
                                    objectFit: "contain",
                                }}
                                width={80}
                            />
                            <div>
                                <h3 className="w-52 text-lg font-semibold truncate">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</h3>
                                <p className="text-gray-500">$49.99</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Button className="mr-2" size="icon" variant="outline">
                                    <MinusIcon className="h-4 w-4" />
                                </Button>
                                <span className="text-lg font-semibold">1</span>
                                <Button className="ml-2" size="icon" variant="outline">
                                    <PlusIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <Button className="text-red-500" size="icon" variant="outline">
                                <TrashIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="pt-4">
                <div className="grid grid-cols-2 items-center gap-2">
                    <div className="col-span-1">
                        <h3 className="font-medium">Subtotal</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout</p>
                    </div>
                    <div className="text-right col-span-1">
                        <span className="text-2xl font-bold">$149.98</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-8">
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" variant="outline">
                        <Link href={'/products'}>
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button size="lg">Proceed to Checkout</Button>
                </div>
            </div>
        </div>
    )
}