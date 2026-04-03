export interface IBooking {
  id: string;
  userId?: string;
  courierId?: string;
  date?: string;
  status?: 'pending' | 'confirmed' | 'completed';
  [key: string]: unknown;
}
