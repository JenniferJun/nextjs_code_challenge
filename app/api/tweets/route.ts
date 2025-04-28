import { NextResponse } from "next/server";
import { getTweets } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const data = await getTweets({ page, pageSize });
  return NextResponse.json(data);
}
