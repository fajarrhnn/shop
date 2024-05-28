"use server";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const token = await cookies().get(COOKIE_NAME)?.value;
  const url = req.nextUrl.clone();
  url.pathname = "/login";

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized! Please Login or Signup" },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { message: "You are logged in", token },
    { status: 200 },
  );
}

export async function POST() {
  cookies().delete(COOKIE_NAME);
  return NextResponse.json({ success: true }, { status: 200 });
}