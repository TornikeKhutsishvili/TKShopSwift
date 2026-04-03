import type { IGeneral } from "./general.interface";

type TypeRole = "courier";

export interface ICourier extends IGeneral {
  role: TypeRole;
  vehicle: string;
  workingDays: IWorkingDays;
}

export interface IWorkingDays {
  length: number;
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
