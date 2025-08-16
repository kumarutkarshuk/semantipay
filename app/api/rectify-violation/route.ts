import { callTiDBDataService } from "@/lib/tidb";
import { HttpMethod } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    
    console.log("user:", userId, "rectifying payroll : request:", reqBody)

    await callTiDBDataService("/rectifyViolation", HttpMethod.PUT, reqBody);
    return new Response(null);
  } catch (err) {
    console.error(err instanceof Error ? err?.message : err)
    return new Response(JSON.stringify(err instanceof Error ? err?.message : err), {
      status: 500,
    });
  }
}
