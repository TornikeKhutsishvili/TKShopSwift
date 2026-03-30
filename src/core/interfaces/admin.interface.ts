import type { IGeneral } from "./general.interface";

type TRole = "admin";

export interface IAdmin extends IGeneral {
  role: TRole;
}
