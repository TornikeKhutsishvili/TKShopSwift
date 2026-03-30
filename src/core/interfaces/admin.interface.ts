import type { IGeneral } from "./general.interface";

type Role = "admin";

export interface IAdmin extends IGeneral {
  role: Role;
}
