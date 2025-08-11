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

    const AGENTIC_MIDDLEWARE_URL = process.env.AGENTIC_MIDDLEWARE_URL;

    if (!AGENTIC_MIDDLEWARE_URL) {
      throw new Error("Missing agentic middleware credentials");
    }
    const embeddingsUrl = `${AGENTIC_MIDDLEWARE_URL}/generate-compliance-embeddings`;

    const reqBody = await request.json();
    // console.log(reqBody)
    const res = await callTiDBDataService("/addCompliance", HttpMethod.POST, reqBody);
    console.log(res)
    // generate compliance embeddings
    await fetch(embeddingsUrl, {
      method: "PUT",
    });

    return new Response(null);
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
    });
  }
}
