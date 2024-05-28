// when im deploy my code to vercel, i get the error message in log like this

// SyntaxError: Unexpected token 'T', "The deploy"... is not valid JSON
//     at JSON.parse(<anonymous>)
//   at parseJSONFromBytes (node:internal/deps/undici/undici:5584:19)
//   at successSteps (node:internal/deps/undici/undici:5555:27)
//   at fullyReadBody (node:internal/deps/undici/undici:1665:9)
//   at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
//   at async specConsumeBody (node:internal/deps/undici/undici:5564:7)
//   at async l (/vercel/path0/.next/server/app/products/page.js:1:7956)

// i think this error because a products page, so this is my code // app/products/page.tsx


import { ProductsTypes } from "@/lib/definition";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { formatter } from "@/lib/utils";
import Link from "next/link";

async function getData() {
  const url = process.env.URL || "http://localhost:3000";
  const res = await fetch(`${url}/api/products`, {
    method: "GET",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${text}`);
  }
}

export default async function ProductsPage() {
  try {
    const data = await getData();
    const products: ProductsTypes[] = data.result.rows;

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
  } catch (error) {
    <p> Failed to fetch products</p>
    console.error(error)
  }
}