"use server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { sql } from "@vercel/postgres";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const BearerToken = req.headers.get("Authorization");
  try {
    if (!BearerToken) {
      return NextResponse.json(
        { message: "Unauthorized!!" },
        { status: 401 },
      );
    }

    const decoded:any = jwt.decode(BearerToken);
    const user_id = decoded.id;

    const result =
      await sql`SELECT Carts.id, Products.title, Products.image, Products,price, Carts.quantity FROM 
        Carts INNER JOIN Products ON Carts.product_id = Products.id WHERE Carts.user_id = ${user_id}`;
    if (!result.rows || result.rowCount === 0) {
      return NextResponse.json(
        { message: "No data in the cart." },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Successfully retrieve data in the cart.", result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const BearerToken = req.headers.get("Authorization");

  try {
    if (!BearerToken) {
      return NextResponse.json(
        { message: "Unauthorized!!" },
        { status: 401 },
      );
    }

    const decoded:any = jwt.decode(BearerToken);
    const user_id = decoded.id;
    const id = uuidv4();
    const { product_id, quantity } = await req.json();

    const result =
      await sql`INSERT INTO Carts (id, user_id, product_id, quantity) VALUES (${id},${user_id}, ${product_id}, ${quantity})`;
    return NextResponse.json(
      { message: "Add Cart Successfully!", result },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}