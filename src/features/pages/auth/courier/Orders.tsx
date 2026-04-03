import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/useHooks';
import { authUserSelector } from '../../../../store/auth/slice/auth.slice';
import { getBookings } from '../../../../store/booking/thunks/booking.thunks';
import { bookingsSelector, bookingsLoadingSelector, bookingsErrorSelector } from '../../../../store/booking/slice/booking.slice';
import { usersSelector } from '../../../../store/users/slice/users.slice';
import useGetUsers from '../../../../core/hooks/useGetUsers';
import type { IUser } from '../../../../core/interfaces/user.interface';
import type { IBooking } from '../../../../core/interfaces/booking.interface';

const Orders: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authUserSelector);
  const bookings = useAppSelector(bookingsSelector);
  const loading = useAppSelector(bookingsLoadingSelector);
  const error = useAppSelector(bookingsErrorSelector);
  const users = useAppSelector(usersSelector);

  const { loading: usersLoading } = useGetUsers();

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getBookings({ courierId: currentUser.id }));
    }
  }, [currentUser?.id, dispatch]);

  if (loading || usersLoading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-600">Error loading orders: {error}</div>;

  const getUserName = (userId?: string) => {
    if (!userId) return 'Unknown';
    const user = users.find((u: IUser) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown User';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
      {bookings.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6">No orders assigned yet.</div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {bookings.map((booking: IBooking) => (
              <li key={booking.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">{getUserName(booking.userId)}</p>
                    <p className="text-sm text-gray-500">{booking.date ? new Date(booking.date).toLocaleString() : 'No date'}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status || 'unknown'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Orders;