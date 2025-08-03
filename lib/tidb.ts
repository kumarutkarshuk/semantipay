import DigestFetch from "digest-fetch";
import { HttpMethod } from "./types";

export async function callTiDBDataService(
  endpoint: string,
  method: HttpMethod,
  body?: Object,
  rowsToBeAffected?: number
) {
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const TIDB_URL = process.env.TIDB_URL;

  if (!PUBLIC_KEY || !PRIVATE_KEY || !TIDB_URL) {
    throw new Error("Missing TiDB API credentials");
  }

  const client = new DigestFetch(PUBLIC_KEY, PRIVATE_KEY);
  const url = `${TIDB_URL + endpoint}`;

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body && (method === "POST" || method === "PUT")) {
      options.body = JSON.stringify(body);
    }

    const response = await client.fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    const parsedRes = await response.json();

    if (body && rowsToBeAffected && (method === "POST" || method === "PUT")) {
      const rowsAffected = parsedRes?.data?.result?.row_affect as number;

      console.log("TiDB rows to be affected:", rowsToBeAffected);
      console.log("TiDB rows affected:", rowsAffected);

      if (rowsAffected != rowsToBeAffected) {
        throw new Error("All rows not inserted/updated");
      }
    }

    const rows = parsedRes?.data?.rows;

    if (!rows) {
      throw new Error("Data not found: rows are absent");
    }

    return rows;
  } catch (error) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
