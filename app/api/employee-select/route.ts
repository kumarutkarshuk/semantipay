import { callTiDBDataService } from "@/lib/tidb";
import { EmployeeSelect, HttpMethod } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "not authorized" }, { status: 401 });
    }

    const reqBody = await request.json();
    // console.log(reqBody)
    const response: EmployeeSelect[] =  await callTiDBDataService("/employeeSelect", HttpMethod.POST, reqBody) as EmployeeSelect[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
