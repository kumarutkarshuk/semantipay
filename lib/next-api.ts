import { get } from "http";
import { Compliance, Employee, NextAPIRes, PayrollResult, WorkRecord } from "./types";

export async function fetchEmployees(): Promise<Employee[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/employees`);

  if (!response.ok) {
    throw new Error("failed to fetch employees");
  }

  return response.json();
}

export async function fetchCompliance(): Promise<Compliance[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/compliance`);

  if (!response.ok) {
    throw new Error("failed to fetch compliance data");
  }

  return response.json();
}

export async function fetchWorkRecords(): Promise<WorkRecord[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/work-records`);

  if (!response.ok) {
    throw new Error("failed to fetch work records");
  }

  return response.json();
}

export async function fetchPayrollResults(): Promise<PayrollResult[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/payroll-results`);

  if (!response.ok) {
    throw new Error("failed to fetch payroll results");
  }

  return response.json();
}

export async function processPayroll(request: Object): Promise<NextAPIRes> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/payroll`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error("failed to process payroll");
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
