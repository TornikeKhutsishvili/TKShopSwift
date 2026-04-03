import type { ISchedule } from "../../shared/components/forms/CourierForm";
import type { TRole } from "./role.type";

export interface IAuthUser {
  id: string;
  role: TRole;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number;
  profileImage?: string;
  pid?: number;
  personalId?: string;
  address?: string;
  vehicle?: string;
  workingDays?: ISchedule[];
}

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  role: TRole;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: number;
  profileImage?: string;
  pid?: number;
  personalId?: string;
  address?: string;
  vehicle?: string;
  workingDays?: ISchedule[];
}
