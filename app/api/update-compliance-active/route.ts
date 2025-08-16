import { isRateLimited } from "@/lib/rate-limiter";
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

    const success = await isRateLimited(userId);

    if (!success) {
      return NextResponse.json(
        { error: "REACHED DAY LIMIT FOR UPDATE COMPLIANCE ACTIVE STATUS!" },
        { status: 429 }
      );
    }

    const reqBody = await request.json();
    
    const res = await callTiDBDataService(
      "/updateComplianceActive",
      HttpMethod.PUT,
      reqBody
    );

    console.log(res)

    return new Response(null);
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
    });
  }
}
