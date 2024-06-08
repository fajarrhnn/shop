import {NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { v4 as uuidv4 } from "uuid";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const BearerToken = req.headers.get("Authorization");

  try {
    if (!BearerToken) {
      return NextResponse.json({ message: "Unauthorized!!" }, { status: 401 });
    }

    const token = BearerToken.split(" ")[1];
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const user_id = decoded.id;

    const result = await sql`SELECT * FROM Address WHERE user_id = ${user_id}`;
    return NextResponse.json(
      { message: "Successfully Get Address", result },
      { status: 200 },
    );
  } catch (error) {
    if (error) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Something went wrong :(" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const BearerToken = req.headers.get("Authorization");

  try {
    if (!BearerToken) {
      return NextResponse.json({ message: "Unauthorized!!" }, { status: 401 });
    }

    const token = BearerToken.split(" ")[1];
    const decoded = jwt.decode(token) as JwtPayload;
    const user_id = decoded.id;

    const {
      state,
      city,
      district,
      subDistrict,
      neighborhood,
      street,
      zipCode,
    } = await req.json();

    const id = uuidv4();
    const addAddress =
      await sql`INSERT INTO Address (id, user_id, state, city, district, subDistrict, neighborhood, street, zipCode) 
        VALUES (${id}, ${user_id}, ${state}, ${city}, ${district}, ${subDistrict}, ${neighborhood}, ${street}, ${zipCode})`;
    return NextResponse.json(
      { message: "Add Address Successfully!", addAddress },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong :(" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const BearerToken = req.headers.get("Authorization");

  try {
    if (!BearerToken) {
      return NextResponse.json({ message: "Unauthorized!!" }, { status: 401 });
    }

    const token = BearerToken.split(" ")[1];
    const decoded = jwt.decode(token) as JwtPayload;
    const user_id = decoded.id;

    const deleteAddress =
      await sql`DELETE FROM Address WHERE user_id = ${user_id}`;

    return NextResponse.json(
      { message: "Remove address successfully!", deleteAddress },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong :(" },
      { status: 500 },
    );
  }
}

