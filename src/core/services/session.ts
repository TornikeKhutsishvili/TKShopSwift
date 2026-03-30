import { db } from "../firestore/firebase";
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSession = async (userId: any) => {
  await setDoc(doc(db, "sessions", userId), {
    userId,
    loginTime: serverTimestamp(),
    active: true
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const endSession = async (userId: any) => {
  await updateDoc(doc(db, "sessions", userId), {
    active: false,
    logoutTime: serverTimestamp()
  });
};
