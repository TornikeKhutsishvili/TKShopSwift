import type { IGeneral } from "./general.interface";

type TRole = "user";

export interface IUser extends IGeneral {
  role: TRole;
  address: IAddress;
}

export interface IAddress {
  lng: number;
  lat: number;
}
