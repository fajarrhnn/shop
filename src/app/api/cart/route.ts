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

    const decoded: any = jwt.decode(BearerToken);
    const user_id = decoded.id;

    const result =
      await sql`SELECT Carts.id, Products.id, Products.title, Products.image, Products,price, Carts.quantity FROM 
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

    const token = BearerToken.split(' ')[1];
    const secret = process.env.JWT_SECRET || ""
    const decoded: any = jwt.verify(token, secret);
    const user_id = decoded.id;

    const { product_id, quantity } = await req.json();
    if (!product_id || !quantity || typeof product_id !== 'string' || typeof quantity !== 'number' || quantity <= 0) {
      return NextResponse.json(
        { message: "Invalid product_id or quantity" },
        { status: 400 },
      );
    }

    const queryCheck = await sql`SELECT * FROM Carts WHERE product_id = ${product_id} AND user_id = ${user_id}`;

    if (queryCheck.rowCount > 0) {
      const addQty = await sql`UPDATE Carts SET quantity = quantity + ${quantity} WHERE product_id = ${product_id} AND user_id = ${user_id};`;
      return NextResponse.json(
        { message: "Product has been found, so adding quantity", addQty },
        { status: 200 }
      );
    }

    const id = uuidv4();
    const addCart = await sql`INSERT INTO Carts (id, user_id, product_id, quantity) VALUES (${id},${user_id}, ${product_id}, ${quantity})`;
    return NextResponse.json(
      { message: "Add Cart Successfully!", addCart },
      { status: 201 },
    );
  } catch (error) {
    if (error) {
      return NextResponse.json(
        { message: "Invalid Token" },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: "Something went wrong :(" }, { status: 500 });
  }
}

