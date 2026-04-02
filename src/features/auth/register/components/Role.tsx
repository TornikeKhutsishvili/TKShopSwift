import React from "react";
import type { TRole } from "../../../../core/interfaces/role.type";

interface RoleProps {
  role: TRole;
  setRole: (role: TRole) => void;
}

const Role: React.FC<RoleProps> = ({ role, setRole }) => {
  return (
    <div className="sm:col-span-3">
      <label className="block text-sm font-medium text-gray-700">Role</label>
      <select value={role} onChange={(e) => setRole(e.target.value as TRole)} name="role" title="role"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
      >
        <option value="user">User</option>
        <option value="courier">Courier</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  );
};

export default Role;