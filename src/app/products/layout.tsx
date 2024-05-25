export default function ProductsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <>
        <main className="w-11/12 mx-auto py-12">{children}</main>
      </>
    );
  }