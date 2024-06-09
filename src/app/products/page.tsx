import Link from "next/link";
import Image from "next/image";
import { ProductsTypes } from "@/lib/definition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { getDataProducts } from "@/services/products";

export default async function ProductsPage() {
  const data = await getDataProducts();
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
      {!products || products.length === 0 && <p className="text-center text-lg text-red-500 my-10">Sorry, Products not found</p>}
    </>
  )
}

