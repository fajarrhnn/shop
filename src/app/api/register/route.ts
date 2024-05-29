import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { MAX_AGE, COOKIE_NAME } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password } = await req.json();

  try {
    const exitingUser = await sql`SELECT * FROM Users WHERE email = ${email}`;
    if (exitingUser.rowCount > 0) {
      return NextResponse.json(
        { message: "Already account. Please Login!" },
        { status: 403 },
      );
    } else {
      const uuid = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      const secret = process.env.JWT_SECRET || "";
      const token = jwt.sign(
        { id: uuid, firstName: firstName, lastName: lastName },
        secret,
        { expiresIn: MAX_AGE },
      );
      const result =
        await sql`INSERT INTO Users (id, firstName, lastName, email, password) VALUES (${uuid}, ${firstName}, ${lastName}, ${email}, ${hashedPassword})`;

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
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}