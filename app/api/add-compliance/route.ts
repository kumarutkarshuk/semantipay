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

    const success = await isRateLimited(userId, "add-compliance");

    if (!success) {
      return NextResponse.json(
        { error: "REACHED DAY LIMIT FOR ADDING COMPLIANCE RULES!" },
        { status: 429 }
      );
    }

    const AGENTIC_MIDDLEWARE_URL = process.env.AGENTIC_MIDDLEWARE_URL;

    if (!AGENTIC_MIDDLEWARE_URL) {
      throw new Error("Missing agentic middleware credentials");
    }

    const embeddingsUrl = `${AGENTIC_MIDDLEWARE_URL}/generate-compliance-embeddings`;

    const reqBody = await request.json();
    // console.log(reqBody)
    const res = await callTiDBDataService(
      "/addCompliance",
      HttpMethod.POST,
      reqBody
    );
    // generate compliance embeddings
    await fetch(embeddingsUrl, {
      method: "PUT",
    });

    return new Response(null);
  } catch (err) {
    console.error(err instanceof Error ? err?.message : err)
    return new Response(JSON.stringify(err instanceof Error ? err?.message : err), {
      status: 500,
    });
  }
}
