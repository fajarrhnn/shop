import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function GET(req: Request) {
    try {
        const result = await sql`SELECT * FROM Users`;
        if (!result.rowCount) {
            return NextResponse.json({ message: "kosong dek" }, { status: 404 })
        } else {
            return NextResponse.json({ message: "Successfully get all data Users", result }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

// app/api/user/route.ts
export async function POST(req: NextRequest) {

    const { firstName, lastName, email, password } = await req.json();

    try {
        const exitingUser = await sql`SELECT * FROM Users WHERE email = ${email}`
        if (exitingUser.rowCount > 0) {
            return NextResponse.json({ message: "Already account. Plis login!" }, { status: 403 })
        } else {
            const uuid = uuidv4()
            const hashedPassword = await bcrypt.hash(password, 10)
            const token = jwt.sign({ id: uuid, firstName: firstName, lastName: lastName }, null, { expiresIn: '1d', algorithm: "none" })
            const result = await sql`INSERT INTO Users (id, firstName, lastName, email, password) VALUES (${uuid}, ${firstName}, ${lastName}, ${email}, ${hashedPassword})`
            const response = NextResponse.json({ message: "Create Account Successfully!", result }, { status: 201 });
            response.headers.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=86400`);

            return response;
        }

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}