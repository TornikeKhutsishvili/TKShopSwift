import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firestore/firebase";
import type { IUser } from "../interfaces/user.interface";

const usersCollection = collection(db, "users");

// GET USERS
export const getUsersAPI = async (): Promise<IUser[]> => {
  const snapshot = await getDocs(usersCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IUser[];
};

// ADD USER
export const addUserAPI = async (user: Omit<IUser, "id">): Promise<IUser> => {
  const docRef = await addDoc(usersCollection, user);
  return { id: docRef.id, ...user } as IUser;
};

// UPDATE USER
export const updateUserAPI = async (id: string, user: IUser): Promise<IUser> => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, { ...user});
  return user;
};

// DELETE USER
export const deleteUserAPI = async (id: string): Promise<string> => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
  return id;
};