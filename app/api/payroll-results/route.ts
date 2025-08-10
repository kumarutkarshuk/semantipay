import { callTiDBDataService } from "@/lib/tidb";
import { Employee, HttpMethod, PayrollResult } from "@/lib/types";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const {userId} = await auth()
        
    if(!userId){
      return NextResponse.json({error: "not authorized"}, {status: 401})
    }
    
    const response: PayrollResult[] = await callTiDBDataService("/payrollResults", HttpMethod.GET) as PayrollResult[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
