import React, { useState } from 'react';
import ErrorPage from '../../error/ErrorPage';
import useGetCourier from '../../../../core/hooks/useGetCourier';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/useHooks';
import { authUserSelector } from '../../../../store/auth/slice/auth.slice';
import { addBooking } from '../../../../store/booking/thunks/booking.thunks';
import ModalBooking from '../../../../shared/components/modal/ModalBooking';
import type { ICourier } from '../../../../core/interfaces/courier.interface';

const FindCourier: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authUserSelector);
  const { couriers, loading, error } = useGetCourier();

  const [selectedCourier, setSelectedCourier] = useState<ICourier | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleBookClick = (courier: ICourier) => {
    setBookingError(null);
    setBookingSuccess(null);
    setSelectedCourier(courier);
    setBookingDate('');
    setBookingTime('09:00');
  };

  const handleBookingSubmit = async () => {
    if (!currentUser) {
      setBookingError('Please sign in to book a courier.');
      return;
    }

    if (!bookingDate || !bookingTime) {
      setBookingError('Please choose a date and time.');
      return;
    }

    if (!selectedCourier) {
      setBookingError('No courier selected.');
      return;
    }

    setBookingLoading(true);
    setBookingError(null);
    setBookingSuccess(null);

    const dateTime = new Date(`${bookingDate}T${bookingTime}`);
    const bookingPayload = {
      userId: currentUser.id,
      courierId: selectedCourier.id,
      date: dateTime.toISOString(),
      status: 'pending' as const,
    };

    try {
      await dispatch(addBooking(bookingPayload)).unwrap();
      setBookingSuccess('Booking request sent successfully.');
      setSelectedCourier(null);
    } catch (err) {
      setBookingError((err as Error)?.message || 'Failed to create booking.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div>Loading ...</div>;
  if (error) return <div><ErrorPage /></div>;
  if (!couriers || couriers.length === 0) return <div>No couriers found.</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Find a Courier</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {couriers.map((courier) => (
          <div key={courier.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="shrink-0 h-12 w-12">
                  <img className="h-12 w-12 rounded-full object-cover" src={courier.profileImage} alt="Courier" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{`${courier.firstName} ${courier.lastName}`}</h3>
                  <p className="text-sm text-gray-500">{courier.vehicle}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">Available: {courier.workingDays?.length ?? 0} days/week</p>
                {courier.workingDays && ([
                  'monday',
                  'tuesday',
                  'wednesday',
                  'thursday',
                  'friday',
                  'saturday',
                  'sunday',
                ] as const)
                  .map((key) => ({
                    day: key.charAt(0).toUpperCase() + key.slice(1),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ...(courier.workingDays as any)[key],
                  }))
                  .filter((item) => item.startTime && item.endTime)
                  .slice(0, 3)
                  .map((item) => (
                    <p key={`${courier.id}-${item.day}`} className="text-sm text-gray-600">
                      {item.day}: {item.startTime} - {item.endTime}
                    </p>
                  ))}
              </div>
              <div className="mt-6">
                <button type="button" onClick={() => handleBookClick(courier)} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  Book this courier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ModalBooking
        open={Boolean(selectedCourier)}
        courier={selectedCourier}
        date={bookingDate}
        time={bookingTime}
        loading={bookingLoading}
        error={bookingError}
        success={bookingSuccess}
        onDateChange={setBookingDate}
        onTimeChange={setBookingTime}
        onClose={() => setSelectedCourier(null)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default FindCourier;
