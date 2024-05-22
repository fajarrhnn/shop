import { ProductsTypes } from "@/lib/definition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import Link from "next/link";

async function getData() {
    const url = process.env.URL || "http://localhost:3000"
    const res = await fetch(`${url}/api/products`, {
        method: "GET",
    });
    if (!res.ok) {
        console.error('Failed to fetch data:', res.statusText);
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function ProductsPage() {
    try {
        const data = await getData();
        const products: ProductsTypes[] = data.result.rows;
        console.log(products);

        return (
            <section className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.map((item: ProductsTypes) => (
                    <Card className="rounded-none shadow-none border-none" key={item.id}>
                        <CardHeader className="h-56 flex justify-center items-center">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={120}
                                height={120}
                                className="w-auto h-auto object-contain mx-auto"
                            />
                        </CardHeader>
                        <CardContent>
                            <Link href={`/products/${item.id}`}>
                                <h1 className="text-sm line-clamp-2">{item.title}</h1>
                            </Link>
                            <p className="text-base font-bold">
                                {formatter.format(item.price)}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        );
    } catch (error) {
        console.error('Error rendering ProductsPage:', error);
        return <p>Failed to load products.</p>;
    }
}