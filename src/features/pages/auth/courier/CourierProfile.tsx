import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/useHooks';
import { authUserSelector, authLoadingSelector } from '../../../../store/auth/slice/auth.slice';
import { getBookings } from '../../../../store/booking/thunks/booking.thunks';
import { bookingsSelector, bookingsLoadingSelector, bookingsErrorSelector } from '../../../../store/booking/slice/booking.slice';
import type { IBooking } from '../../../../core/interfaces/booking.interface';

const CourierProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authUserSelector);
  const authLoading = useAppSelector(authLoadingSelector);

  const bookings = useAppSelector(bookingsSelector);
  const bookingsLoading = useAppSelector(bookingsLoadingSelector);
  const bookingsError = useAppSelector(bookingsErrorSelector);

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getBookings({ courierId: currentUser.id }));
    }
  }, [currentUser?.id, dispatch]);

  const activeOrders = bookings.filter((b: IBooking) => b.status === 'pending' || b.status === 'confirmed');
  const completedOrders = bookings.filter((b: IBooking) => b.status === 'completed');

  if (authLoading || bookingsLoading) {
    return <div>Loading profile...</div>;
  }

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Courier Profile</h1>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <h2 className="text-sm font-medium text-gray-500">Total Orders</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{bookings.length}</p>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <h2 className="text-sm font-medium text-gray-500">Active Orders</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{activeOrders.length}</p>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <h2 className="text-sm font-medium text-gray-500">Completed Orders</h2>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{completedOrders.length}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Profile Info</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-1">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="mt-1 text-base font-semibold text-gray-900">{`${currentUser.firstName} ${currentUser.lastName}`}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="mt-1 text-base font-semibold text-gray-900">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="mt-1 text-base font-semibold text-gray-900">{currentUser.phoneNumber ?? 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Vehicle</p>
            <p className="mt-1 text-base font-semibold text-gray-900">{currentUser.vehicle ?? 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900">Work Schedule</h2>
        <div className="mt-3 space-y-2">
          {currentUser.workingDays && currentUser.workingDays.length > 0 ? (
            currentUser.workingDays.map((day: { day: string; startTime: string; endTime: string }) => (
              <div key={`${day.day}-${day.startTime}`} className="flex justify-between border p-3 rounded-md">
                <span className="font-medium text-gray-700">{day.day}</span>
                <span className="text-gray-500">{`${day.startTime} - ${day.endTime}`}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No schedule is set.</p>
          )}
        </div>
      </div>

      {bookingsError && (
        <div className="rounded-md bg-red-50 p-4 text-red-700">Failed to load orders: {bookingsError}</div>
      )}
    </div>
  );
};

export default CourierProfile;