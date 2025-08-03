import { get } from "http";
import { Compliance, Employee } from "./types";

export async function fetchEmployees():Promise<Employee[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/employees`);

  if (!response.ok) {
    throw new Error("failed to fetch employees");
  }
  
  return response.json();
}

export async function fetchCompliance():Promise<Compliance[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/compliance`);

  if (!response.ok) {
    throw new Error("failed to fetch compliance data");
  }
  
  return response.json();
}

function getBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Next API base URL not found");
  }
  return baseUrl;
}
