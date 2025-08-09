export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface Employee {
  employee_id: number;
  name: string;
  employee_code: string;
  country_code: string;
  region: string;
  hourly_rate: number;
}

export interface Compliance {
  rule_id: number;
  country_code: string;
  region?: string;
  rule_name: string;
  description: string;
  effective_date: string; // check for date data type
  threshold_value: number;
  formula: string;
}

export interface WorkRecord {
  employee_id: number;
  name: string;
  employee_code: string;
  country_code: string;
  record_id: number;
  hourly_rate: number;
  work_month: string; // check for date data type
  hours_worked: number;
  overtime_hours: number;
}

export interface PayrollResult extends WorkRecord {
  gross_pay: number;
  deductions?: string;
  net_pay: number;
  status: "DONE" | "PENDING" | "VIOLATION" | "FAILED";
  violation_reason?: string;
}

export interface NextAPIRes {
  status: string;
  message: string;
}
