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