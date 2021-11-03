export interface Alert {
  id?: string | number;
  timeOut?: number | string | boolean;
  title: string;
  description?: string;
  theme: "success" | "warn" | "fail" | "default";
}
