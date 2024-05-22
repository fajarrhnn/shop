import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs"
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 10

export async function POST(req: NextRequest) {

    const { email, password } = await req.json();

    try {
        const exitingUser = await sql`SELECT * FROM Users WHERE email = ${email}`
        if (exitingUser.rowCount === 0) {
            return NextResponse.json({ message: "Email not registered, please sign up!" }, { status: 404 })
        }
        const userData = exitingUser.rows[0];
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        const secret = process.env.JWT_SECRET || ""
        const token = jwt.sign({ id: userData.id, firstName: userData.firstname, lastName: userData.lastname }, secret, { expiresIn: MAX_AGE })

        const serialized = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
            path: '/',
        })

        return NextResponse.json(
            { message: "Login Account Successfully!", token: token },
            { status: 200, headers: { 'Set-Cookie': serialized } }
        );

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}