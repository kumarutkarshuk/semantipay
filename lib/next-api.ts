import { get } from "http";
import { Compliance, Employee, EmployeeSelect, NextAPIRes, PayrollResult, WorkRecord } from "./types";

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

export async function fetchWorkRecords(request: Object): Promise<WorkRecord[]> {
  const baseUrl = getBaseUrl();
  const response = await fetch(
    `${baseUrl}/api/work-records`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

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

export async function rectifyViolation(request: Object): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/rectify-violation`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error("failed to update records");
  }
}

export async function flagIncorrectPayroll(request: Object): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/flag-incorrect-payroll`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error("failed to flag incorrect payroll");
  }
}

export async function addCompliance(request: Object): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/add-compliance`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error(await response.json().then(d => d.error));
  }
}

export async function addWorkRecord(request: Object): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/add-work-record`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error("failed to add work record");
  }
}

export async function fetchEmployeeSelect(request: Object): Promise<EmployeeSelect[]> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/employee-select`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error("failed to add work record");
  }

  return response.json();
}

export async function addEmployee(request: Object): Promise<void> {
  const baseUrl = getBaseUrl();
  
  const response = await fetch(
    `${baseUrl}/api/add-employee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    },
    
  );

  if (!response.ok) {
    throw new Error("failed to add compliance rule");
  }
}

function getBaseUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error("Next API base URL not found");
  }
  return baseUrl;
}
