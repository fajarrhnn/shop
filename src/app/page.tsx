import Image from "next/image";
import Link from "next/link";
import HeroImage from "../../public/hero.png"
export default function Home() {
  return (
    <section className="w-full py-12 bg-gray-100 dark:bg-gray-800">
      <main className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover the Latest Fashion Trends
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl dark:text-gray-400">
                Explore our curated collection of stylish apparel and accessories for every occasion.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/products"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <Image
            alt="Hero"
            className="mx-auto overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last aspect-square"
            height={550}
            src={HeroImage}
            width={550}
            priority={true}
          />
        </div>
      </main>
    </section>
  )
}