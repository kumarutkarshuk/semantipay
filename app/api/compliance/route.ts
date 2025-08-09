import { callTiDBDataService } from "@/lib/tidb";
import { Compliance, HttpMethod } from "@/lib/types";

export async function GET() {
  try {
    const response: Compliance[] = (await callTiDBDataService(
      "/allCompliance",
      HttpMethod.GET
    )) as Compliance[];
    return new Response(JSON.stringify(response));
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
