import { db } from "../firestore/firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export const createSession: (userId: string, courierId: string) => Promise<void> = async (
  userId, courierId
) => {
  await setDoc(doc(db, "sessions", userId, courierId), {
    userId,
    courierId,
    loginTime: serverTimestamp(),
    active: true
  });
};

export const endSession: (userId: string, courierId: string) => Promise<void> = async (
  userId, courierId
) => {
  await updateDoc(doc(db, "sessions", userId, courierId), {
    active: false,
    logoutTime: serverTimestamp()
  });
};
