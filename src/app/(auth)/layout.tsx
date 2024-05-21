export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <main className="w-11/12 mx-auto min-h-screen">
                <section className="flex justify-center items-center">
                    {children}
                </section>
            </main>
        </>
    )
}