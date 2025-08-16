import { isRateLimited } from "@/lib/rate-limiter";
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

    const success = await isRateLimited(userId, "/add-employee");

    if (!success) {
      throw new Error("REACHED DAY LIMIT FOR ADDING EMPLOYEES!");
      // return NextResponse.json(
      //   { error: "REACHED DAY LIMIT FOR PADDING EMPLOYEES!" },
      //   { status: 429 }
      // );
    }

    const reqBody = await request.json();
    // console.log(reqBody)
    await callTiDBDataService("/addEmployee", HttpMethod.POST, reqBody);
    return new Response(null);
  } catch (err) {
    console.error(err instanceof Error ? err?.message : err)
    return new Response(JSON.stringify(err instanceof Error ? err?.message : err), {
      status: 500,
    });
  }
}
