import type { IGeneral } from "./general.interface";

type TypeRole = "user";

export interface IUser extends IGeneral {
  role: TypeRole;
  address: IAddress;
}

export interface IAddress {
  lng: number;
  lat: number;
}
