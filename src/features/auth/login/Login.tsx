import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import type { TRole } from '../../../core/interfaces/role.type';

const Login: React.FC = () => {
  const [role, setRole] = useState<TRole>("user");

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Courier Management</h2>
      </div>

      {/* Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">Or{' '}
                <Link to="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">create a new account</Link>
              </p>
            </div>

            {/* Form */}
            <LoginForm role={role} setRole={setRole} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;