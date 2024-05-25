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
            <main className="w-11/12 mx-auto py-4">
                {children}
            </main>
        </>
    )
}
