import { callTiDBDataService } from "@/lib/tidb";
import { Employee, HttpMethod } from "@/lib/types";

export async function GET() {
  try {
    const response: Employee[] = await callTiDBDataService("/employees", HttpMethod.GET) as Employee[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
