import { isRateLimited } from "@/lib/rate-limiter";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const success = await isRateLimited(userId, "/payroll");

    if (!success) {
      throw new Error("REACHED DAY LIMIT FOR PROCESSING PAYROLL!");
      // return NextResponse.json(
      //   { error: "REACHED DAY LIMIT FOR PROCESSING PAYROLL!" },
      //   { status: 429 }
      // );
    }

    const DIFY_TOKEN = process.env.DIFY_TOKEN;

    if (!DIFY_TOKEN) {
      throw new Error("Missing DIFY credentials");
    }

    console.log("user:", userId, "processing payroll...");

    const reqBody = await request.json();
    // console.log(reqBody)
    const url = "https://api.dify.ai/v1/workflows/run";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DIFY_TOKEN}`,
      },
      body: JSON.stringify(reqBody),
    });

    const resJSON = await res.json();

    if (resJSON?.data?.error !== "") {
      throw new Error("Dify workflow issue");
    }

    const nextAPIres = {
      status: "success",
      message: "Payroll processed successfully!",
    };

    return new Response(JSON.stringify(nextAPIres));
  } catch (err) {
    console.error(err instanceof Error ? err?.message : err);
    return new Response(
      JSON.stringify(err instanceof Error ? err?.message : err),
      {
        status: 500,
      }
    );
  }
}
