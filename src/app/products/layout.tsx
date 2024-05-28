import { Toaster } from "@/components/ui/toaster"

export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <main className="w-11/12 mx-auto py-6">
        {children}
        <Toaster />
      </main>
    </>
  );
}