import db, { getTweetById } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const data = await getTweetById(params.id);
  return NextResponse.json(data);
}
