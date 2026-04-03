import React from 'react';
import useGetUsers from '../../../../core/hooks/useGetUsers';
import { useAppDispatch } from '../../../../core/hooks/useHooks';
import { deleteUser } from '../../../../store/users/thunks/users.thunks';
import type { IUser } from '../../../../core/interfaces/user.interface';

const Users: React.FC = () => {
  const { users, loading, error } = useGetUsers();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{String(error)}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">

          {/* THEAD */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>

          {/* TBODY */}
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user: IUser) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">

                    <div className="shrink-0 h-10 w-10">
                      <img src={user.profileImage} className="h-10 w-10 rounded-full" alt="user image" />
                    </div>

                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.id}
                      </div>
                    </div>

                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.phoneNumber}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-red-600 hover:text-red-900 ml-4" title="Delete User"
                    type="button" onClick={() => handleDelete(user.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;