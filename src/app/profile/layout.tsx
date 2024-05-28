import { COOKIE_NAME } from "@/lib/utils"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const token = cookies().get(COOKIE_NAME)
    if (!token) {
        redirect('/login')
    }

    return (
        <>
            <main className="w-full mx-auto">
                {children}
            </main>
        </>
    )
}
