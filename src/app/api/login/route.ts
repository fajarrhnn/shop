import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const exitingUser = await sql`SELECT * FROM Users WHERE email = ${email}`;
    if (exitingUser.rowCount === 0) {
      return NextResponse.json(
        { message: "Email not registered, please sign up!" },
        { status: 404 },
      );
    }
    const userData = exitingUser.rows[0];
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    const secret = process.env.JWT_SECRET || "";
    const token = jwt.sign(
      {
        id: userData.id,
        firstName: userData.firstname,
        lastName: userData.lastname,
      },
      secret,
      { expiresIn: MAX_AGE },
    );

    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: MAX_AGE,
      path: "/",
    });

    const response = NextResponse.json(
      { message: "Login Account Successfully!", token: token },
      { status: 200 },
    );

    response.headers.set('Set-Cookie', serialized);
    response.headers.set('Access-Control-Allow-Origin', "https://jarot-shop.vercel.app/");
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}