import React from 'react'
import useGetCourier from '../../../../core/hooks/useGetCourier';
import { useAppDispatch } from '../../../../core/hooks/useHooks';
import { deleteCourier } from '../../../../store/couriers/thunks/couriers.thunks';
import type { ICourier } from '../../../../core/interfaces/courier.interface';

const Couriers:React.FC = () => {
  const { couriers, loading, error } = useGetCourier();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteCourier(id));
  };

  if (loading) return <p>Loading couriers...</p>;
  if (error) return <p>{String(error)}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Manage Couriers</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">

          {/* THEAD */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          {/* TBODY */}
          <tbody className="bg-white divide-y divide-gray-200">

            {couriers.map((courier: ICourier) => (
              <tr key={courier.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src={courier.profileImage} alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{courier.firstName} {courier.lastName}</div>
                    <div className="text-sm text-gray-500">{courier.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{courier.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{courier.vehicle}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button type="button" className="text-red-600 hover:text-red-900 ml-4" title='button'
                  onClick={() => handleDelete(courier.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 lucide-trash-2 h-5 w-5" aria-hidden="true">
                    <path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </td>
            </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Couriers;