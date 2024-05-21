import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {

    const { email, password } = await req.json();

    try {
        const exitingUser = await sql`SELECT * FROM Users WHERE email = ${email}`
        if (exitingUser.rowCount === 0 || !exitingUser.rows) {
            return NextResponse.json({ message: "Email not registered, please sign up!" }, { status: 404 })
        }
        const userData = exitingUser.rows[0];
        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
        }

        const token = jwt.sign({ id: userData.id, firstname: userData.firstName, lastname: userData.lastName }, null, { expiresIn: '1d', algorithm: "none" });

        const response = NextResponse.json({ message: "Login successful", token: token }, { status: 200 });
        response.headers.set('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=86400`);

        return response;

    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}