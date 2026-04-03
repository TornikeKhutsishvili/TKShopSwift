import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firestore/firebase";
import type { ICourier } from "../interfaces/courier.interface";

const couriersCollection = collection(db, "couriers");

// GET COURIERS
export const getCouriersAPI = async (): Promise<ICourier[]> => {
  const snapshot = await getDocs(couriersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ICourier[];
};

// ADD COURIER
export const addCourierAPI = async (courier: Omit<ICourier, "id">): Promise<ICourier> => {
  const docRef = await addDoc(couriersCollection, courier);
  return { id: docRef.id, ...courier } as ICourier;
};

// UPDATE COURIER
export const updateCourierAPI = async (id: string, courier: ICourier): Promise<ICourier> => {
  const courierDoc = doc(db, "couriers", id);
  await updateDoc(courierDoc, { ...courier });
  return courier;
};

// DELETE COURIER
export const deleteCourierAPI = async (id: string): Promise<string> => {
  const courierDoc = doc(db, "couriers", id);
  await deleteDoc(courierDoc);
  return id;
};