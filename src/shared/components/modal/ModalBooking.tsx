import React from 'react';
import type { ICourier } from '../../../core/interfaces/courier.interface';

interface ModalBookingProps {
  open: boolean;
  courier: ICourier | null;
  date: string;
  time: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const ModalBooking: React.FC<ModalBookingProps> = ({
  open,
  courier,
  date,
  time,
  loading,
  error,
  success,
  onDateChange,
  onTimeChange,
  onClose,
  onSubmit,
}) => {
  if (!open || !courier) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Book {courier.firstName} {courier.lastName}</h2>
            <p className="text-sm text-gray-500 mt-1">Vehicle: {courier.vehicle}</p>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input title="date" type="date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={date} onChange={(e) => onDateChange(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input title="time" type="time" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" value={time} onChange={(e) => onTimeChange(e.target.value)} />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={onSubmit} disabled={loading} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default ModalBooking;
