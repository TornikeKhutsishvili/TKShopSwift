import React from "react";
import Role from "./components/Role";
import ProfileImage from "./components/ProfileImage";
import Label from "../../../shared/components/ui/Label";
import type { TRole } from "../../../core/interfaces/role.type";
import type { IFormData } from "../../../core/interfaces/formData.interface";

interface RegisterFormProps {
  role: TRole;
  setRole: (role: TRole) => void;
  formData: IFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ role, setRole, handleFileChange, formData, handleChange}) => {
  return (
    <>
      {/* Role */}
      <Role role={role} setRole={setRole} />

      {/* Profile Image */}
      <ProfileImage handleFileChange={handleFileChange} />

      {/* First Name */}
      <div className="sm:col-span-3">
        <Label>First Name</Label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} title="first name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
        />
      </div>

      {/* Last Name */}
      <div className="sm:col-span-3">
        <Label>Last Name</Label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} title="last name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
        />
      </div>

      {/* Email */}
      <div className="sm:col-span-3">
        <Label>Email</Label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} title="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
        />
      </div>

      {/* Password */}
      <div className="sm:col-span-3">
        <Label>Password</Label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} title="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
        />
      </div>

      {/* Phone */}
      <div className="sm:col-span-3">
        <Label>Phone</Label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} title="phone"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
        />
      </div>

      {/* Personal ID */}
      <div className="sm:col-span-3">
        <Label>Personal ID</Label>
        <input type="text" name="personalId" value={formData.personalId} onChange={handleChange} title="personal id"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 border"
        />
      </div>
    </>
  );
}

export default RegisterForm;