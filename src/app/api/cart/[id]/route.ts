import { sql } from "@vercel/postgres";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  const BearerToken = req.headers.get("Authorization");
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();

  try {
    if (!BearerToken) {
      return NextResponse.json({ message: "Unauthorized!!" }, { status: 401 });
    }

    const result = await sql`DELETE FROM Carts WHERE product_id = ${id}`;
    if (!result.rows || result.rowCount === 0) {
      return NextResponse.json(
        { message: "No data in the cart." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Successfully remove data in the cart.", result },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
