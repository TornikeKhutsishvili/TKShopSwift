import type { ISchedule } from "../../shared/components/forms/CourierForm";

export interface IFormData {
  image: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  personalId: string;
  address: string;
  vehicle: string;
  schedule?: ISchedule[];
}