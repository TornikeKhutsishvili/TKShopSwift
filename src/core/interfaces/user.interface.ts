import type { IGeneral } from "./general.interface";

type Role = "user";

export interface IUser extends IGeneral {
  role: Role;
  address: IAddress;
}

export interface IAddress {
  lng: number;
  lat: number;
}
