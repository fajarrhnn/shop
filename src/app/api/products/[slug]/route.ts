import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid"

export async function GET(req: NextRequest) {
    const { slug } = await req.json()

    try {
        const result = await sql`SELECT * FROM Products WHERE slug = ${slug}`;
        if (!result.rowCount) {
            return NextResponse.json({ message: "Product dengan slug itu kosong dek" }, { status: 404 })
        } else {
            return NextResponse.json({ message: "Successfully get all data Products", result }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
