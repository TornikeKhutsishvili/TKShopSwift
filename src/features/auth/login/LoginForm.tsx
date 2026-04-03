import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Role from "../register/components/Role";
import type { TRole } from "../../../core/interfaces/role.type";
import { login } from "../../../store/auth/thunks/auth.thunks";
import { authErrorSelector, authLoadingSelector } from "../../../store/auth/slice/auth.slice";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/useHooks";

interface LoginFormProps {
  role: TRole;
  setRole: (role: TRole) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ role, setRole }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(authErrorSelector);
  const loading = useAppSelector(authLoadingSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) navigate(`/${role}`);
    else if (login.rejected.match(result)) console.error("Login failed:", result.payload || result.error);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role */}
      <Role role={role} setRole={setRole} />

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-5 w-5" aria-hidden="true">
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
              <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            </svg>
          </div>
          <input title="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full pl-10 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock h-5 w-5" aria-hidden="true">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <input title="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full pl-10 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Button */}
      <div>
        <button type="submit" disabled={loading}
          className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;