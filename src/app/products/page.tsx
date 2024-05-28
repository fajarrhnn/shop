import Link from "next/link";
import Image from "next/image";
import { ProductsTypes } from "@/lib/definition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatter } from "@/lib/utils";

async function getData() {
  try {
    const url = process.env.URL || "http://localhost:3000";
    const res = await fetch(`${url}/api/products`, {
      method: "GET",
    });

    const data = await res.json();
    console.log(data)

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${data}`);
    }

    return data;

  } catch (error) {
    console.error(error)
  }
}

export default async function ProductsPage() {
  const data = await getData();
  const products: ProductsTypes[] = await data.result.rows;
  console.log("all products", products)

  return (
    <>
      {products.length > 0 ?
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
        :
        <p>Sorry, products not found</p>
      }
    </>
  )
}
