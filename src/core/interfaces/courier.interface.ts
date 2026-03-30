import type { IGeneral } from "./general.interface";

type Role = "courier";
export interface ICourier extends IGeneral {
  role: Role;
  vehicle: string;
  workingDays: IWorkingDays;
}

export interface IWorkingDays {
  monday: IDate;
  tuesday: IDate;
  wednesday: IDate;
  thursday: IDate;
  friday: IDate;
}

export interface IDate {
  startHours: string;
  endHours: string;
}
