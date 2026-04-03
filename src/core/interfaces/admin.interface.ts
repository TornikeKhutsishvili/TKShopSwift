import type { IGeneral } from "./general.interface";

type TypeRole = "admin";

export interface IAdmin extends IGeneral {
  role: TypeRole;
}
