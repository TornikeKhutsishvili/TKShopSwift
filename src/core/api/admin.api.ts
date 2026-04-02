import { collection, getDocs, deleteDoc, doc, updateDoc, query, where} from "firebase/firestore";
import { db } from "../firestore/firebase";
import type { IUser } from "../interfaces/user.interface";
import type { ICourier } from "../interfaces/courier.interface";

// COLLECTIONS
const usersCollection = collection(db, "users");
const couriersCollection = collection(db, "couriers");
const bookingsCollection = collection(db, "bookings");


// GET ALL USERS
export const getAllUsersAPI = async (): Promise<IUser[]> => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IUser[];
};

// GET ALL COURIERS
export const getAllCouriersAPI = async (): Promise<ICourier[]> => {
  const snapshot = await getDocs(couriersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ICourier[];
};

// DELETE USER
export const deleteUserByAdminAPI = async (id: string) => {
  await deleteDoc(doc(db, "users", id));
  return id;
};

// DELETE COURIER
export const deleteCourierByAdminAPI = async (id: string) => {
  await deleteDoc(doc(db, "couriers", id));
  return id;
};

// UPDATE COURIER WORKING DAYS
export const updateCourierScheduleAPI = async (id: string,workingDays: ICourier["workingDays"]) => {
  const courierRef = doc(db, "couriers", id);
  await updateDoc(courierRef, { workingDays });

  return { id, workingDays };
};

// GET COURIER BOOKINGS
export const getCourierBookingsAPI = async (courierId: string) => {
  const q = query(bookingsCollection, where("courierId", "==", courierId));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};