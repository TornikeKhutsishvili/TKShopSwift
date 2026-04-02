import React from "react";
import Input from "../ui/Input";

interface UserFormProps {
  formData: { address: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ formData, handleChange }) => {
  return (
    <div className="sm:col-span-3">
      <label className="block text-sm font-medium text-gray-700">Address</label>
      <Input name="address" type="text" value={formData.address} onChange={handleChange} required />
    </div>
  );
};

export default UserForm;