import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const result = await sql`SELECT * FROM Products`;
    if (!result.rowCount) {
      return NextResponse.json(
        { message: "Products are not found" },
        { status: 404 },
      );
    } else {
      return NextResponse.json(
        { message: "Successfully get all data Products", result },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { title, description, image, category, slug, price, rating, stock } =
    await req.json();

  try {
    const uuid = uuidv4();
    const result =
      await sql`INSERT INTO Products (id, title, description, image, category, slug, price, rating, stock) 
        VALUES (${uuid}, ${title}, ${description}, ${image}, ${category}, ${slug}, ${price}, ${rating}, ${stock})`;
    return NextResponse.json(
      { message: "Add Product Successfully!", result: result },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}