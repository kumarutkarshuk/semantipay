import { callTiDBDataService } from "@/lib/tidb";
import { HttpMethod } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    await callTiDBDataService("/flagPayroll", HttpMethod.POST, reqBody);
    return new Response(null);
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
    });
  }
}
