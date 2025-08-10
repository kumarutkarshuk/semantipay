import { callTiDBDataService } from "@/lib/tidb";
import { Employee, HttpMethod } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const reqBody = await request.json()
    const response: Employee[] = await callTiDBDataService("/workRecords", HttpMethod.POST, reqBody) as Employee[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
