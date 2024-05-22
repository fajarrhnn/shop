"use server"

import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(req: NextRequest) {

    const cookieStore = cookies()
    const token = cookieStore.get('token')

    if (!token) {
        return NextResponse.json({ message: "Lu gapunya token dek! Makanya login!" }, { status: 403 })
    }

    return NextResponse.json({ token })
}

export async function POST() {
    const cookieStore = cookies()
    cookieStore.delete('token')

    // Send a response indicating the cookie has been deleted
    return NextResponse.json({ success: true }, { status: 200 })
}