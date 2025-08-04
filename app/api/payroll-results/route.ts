import { callTiDBDataService } from "@/lib/tidb";
import { Employee, HttpMethod, PayrollResult } from "@/lib/types";

export async function GET() {
  try {
    const response: PayrollResult[] = await callTiDBDataService("/payrollResults", HttpMethod.GET) as PayrollResult[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
