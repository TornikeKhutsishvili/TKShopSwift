import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserForm from "../../../shared/components/forms/UserForm";
import CourierForm, { type ISchedule } from "../../../shared/components/forms/CourierForm";
import Button from "../../../shared/components/ui/Button";
import RegisterForm from "./RegisterForm";
import AdminForm from "../../../shared/components/forms/AdminForm";
import BaseForm from "../../../shared/components/forms/BaseForm";
import type { TRole } from "../../../core/interfaces/role.type";
import type { IFormData } from "../../../core/interfaces/formData.interface";
import { register } from "../../../store/auth/thunks/auth.thunks";
import { authErrorSelector, authLoadingSelector } from "../../../store/auth/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/hooks";

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(authErrorSelector);
  const loading = useAppSelector(authLoadingSelector);
  const [role, setRole] = useState<TRole>("user");

  const [formData, setFormData] = useState<IFormData>({
    file: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    personalId: "",
    address: "",
    vehicle: "",
    schedule: [
      { day: "Monday", startTime: "09:00", endTime: "17:00" }
    ]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      role,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phone ? Number(formData.phone) : undefined,
      personalId: formData.personalId,
      address: formData.address,
      vehicle: formData.vehicle,
      profileImage: formData.file,
      schedule: formData.schedule as ISchedule[],
    };

    const result = await dispatch(register(payload));
    if (register.fulfilled.match(result)) {
      navigate(`/${result.payload.role}`);
    }
  };

  return (
    <>
      <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Courier Management</h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white rounded-lg mt-9">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600 mb-8">Already have an account?{" "}
            <Link to="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</Link>
          </p>

          {/* Form */}
          <div className="min-h-screen flex flex-col justify-center sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:grid-cols-1 pb-10">

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <BaseForm onSubmit={handleSubmit} title="Register">
                  <RegisterForm
                    role={role} setRole={setRole} handleFileChange={handleFileChange} formData={formData} handleChange={handleChange}
                  />

                  {/* Dynamic Form */}
                  {role === "admin" && <AdminForm />}
                  {role === "user" && <UserForm formData={formData} handleChange={handleChange} />}
                  {role === "courier" && <CourierForm formData={formData} handleChange={handleChange}
                    schedule={formData.schedule || []}
                    onChange={(index, field, value) => {
                      const newSchedule = [...(formData.schedule || [])];
                      newSchedule[index] = { ...newSchedule[index], [field]: value };
                      setFormData((prev) => ({ ...prev, schedule: newSchedule }));
                    }}
                    onAdd={() => {
                      setFormData((prev) => ({
                        ...prev,
                        schedule: [...(prev.schedule || []), { day: "Monday", startTime: "09:00", endTime: "17:00" }] 
                      }));
                    }}
                    onRemove={(index) => {
                      const newSchedule = [...(formData.schedule || [])];
                      newSchedule.splice(index, 1);
                      setFormData((prev) => ({ ...prev, schedule: newSchedule }));
                    }}
                  />}

                  {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                  <div className="pt-5">
                    <Button type="submit"
                      className={`inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 px-4 py-2 text-sm w-full hover:cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                </BaseForm>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;