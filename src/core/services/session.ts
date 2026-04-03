import { db } from "../firestore/firebase";
import { doc, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";

// Create a session
export const createSession = async (userId: string) => {
  const sessionId = crypto.randomUUID();

  await setDoc(
    doc(db, "sessions", userId, "userSessions", sessionId),
    {
      userId,
      loginTime: serverTimestamp(),
      active: true,
    }
  );

  localStorage.setItem("sessionId", sessionId);
};

// End a session
export const endSession = async (userId: string, sessionId: string) => {
  const sessionRef = doc(db, "sessions", userId, "userSessions", sessionId);

  const sessionDoc = await getDoc(sessionRef);
  if (sessionDoc.exists()) {
    await updateDoc(sessionRef, {
      active: false,
      logoutTime: serverTimestamp(),
    });
  }
};