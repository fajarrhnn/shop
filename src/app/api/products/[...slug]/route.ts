"use server";

import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname
    .split("/")
    .filter(Boolean)
    .slice(2)
    .join("/");

  try {
    const result = await sql`SELECT * FROM Products WHERE slug = ${slug}`;
    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: `Product ${slug} are not found` },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: `Successfully get data Products ${slug}`, result },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}