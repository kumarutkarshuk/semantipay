import { callTiDBDataService } from "@/lib/tidb";
import { Employee, HttpMethod } from "@/lib/types";

export async function GET() {
  try {
    const response: Employee[] = await callTiDBDataService("/workRecords", HttpMethod.GET) as Employee[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
