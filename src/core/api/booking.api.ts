import {
  collection, getDocs, addDoc, deleteDoc, doc, query, where, Query, type DocumentData
} from "firebase/firestore";
import { db } from "../firestore/firebase";
import type { IBooking } from "../interfaces/booking.interface";

// COLLECTION
const bookingsCollection = collection(db, "bookings");

// GET BOOKINGS BY USER OR COURIER
export const getBookingsAPI = async (filter: {
  userId?: string;
  courierId?: string;
}): Promise<IBooking[]> => {
  let q: Query<DocumentData> = bookingsCollection;

  if (filter.userId && filter.courierId) q = query(
    bookingsCollection, where("userId", "==", filter.userId), where("courierId", "==", filter.courierId)
  );
  else if (filter.userId) q = query(bookingsCollection, where("userId", "==", filter.userId));
  else if (filter.courierId) q = query(bookingsCollection, where("courierId", "==", filter.courierId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  })) as IBooking[];
};

// ADD BOOKING
export const addBookingAPI = async (booking: Omit<IBooking, "id">): Promise<IBooking> => {
  const docRef = await addDoc(bookingsCollection, booking);
  return { id: docRef.id, ...booking } as IBooking;
};

// DELETE BOOKING
export const deleteBookingAPI = async (id: string): Promise<string> => {
  const bookingDoc = doc(db, "bookings", id);
  await deleteDoc(bookingDoc);
  return id;
};