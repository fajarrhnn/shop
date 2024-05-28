import Link from "next/link";
import Image from "next/image";
import { ProductsTypes } from "@/lib/definition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatter } from "@/lib/utils";

async function getData() {
  try {
    const baseUrl = process.env.VERCEL_URL || "http://localhost:3000";
    const url = new URL('/api/products', baseUrl);

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

export default async function ProductsPage() {
  const data = await getData();
  const products: ProductsTypes[] = data?.result?.rows || []

  return (
    <>
      <section className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          products?.map(({ title, image, id, price, slug }) => (
            <Card className="rounded-none shadow-none border-none" key={id}>
              <CardHeader className="h-56 flex justify-center items-center">
                <Image
                  src={image}
                  alt={title}
                  width={120}
                  height={120}
                  className="w-auto h-auto object-contain mx-auto"
                />
              </CardHeader>
              <CardContent>
                <Link href={`/products/${slug}`}>
                  <h1 className="text-sm line-clamp-2">{title}</h1>
                </Link>
                <p className="text-base font-bold">{formatter.format(price)}</p>
              </CardContent>
            </Card>
          ))
        }
      </section>
      {!products && <p className="text-center text-lg text-red-500 my-19">Products not found</p>}
    </>
  )
}

