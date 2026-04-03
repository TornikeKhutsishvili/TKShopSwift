import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firestore/firebase";
import type { IAuthUser, IRegisterPayload } from "../interfaces/auth.interface";

const profileDocument = (uid: string) => doc(db, "profiles", uid);
// const userDocument = (uid: string) => doc(db, "users", uid);
// const adminDocument = (uid: string) => doc(db, "admins", uid);
// const courierDocument = (uid: string) => doc(db, "couriers", uid);

const usersCollection = collection(db, "couriers");
const adminCollection = collection(db, "couriers");
const couriersCollection = collection(db, "couriers");

const buildAuthProfile = (uid: string, payload: IRegisterPayload): IAuthUser => ({
  id: uid,
  role: payload.role,
  email: payload.email,
  firstName: payload.firstName,
  lastName: payload.lastName,
  phoneNumber: payload.phoneNumber,
  profileImage: payload.profileImage ?? "",
  pid: payload.pid ?? Date.now(),
  personalId: payload.personalId,
  address: payload.address ?? "",
  vehicle: payload.vehicle ?? "",
  workingDays: Array.isArray(payload.workingDays) ? payload.workingDays : [],
});

export const registerWithEmailPassword = async (payload: IRegisterPayload): Promise<IAuthUser> => {
  const credential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
  const uid = credential.user.uid;

  const profile = buildAuthProfile(uid, { ...payload });

  await setDoc(profileDocument(uid), profile);

  // if (payload.role === "user") await setDoc(userDocument(uid), profile);
  const userRef = doc(usersCollection, uid);
  if (payload.role === "user") await setDoc(userRef, profile);
  // if (payload.role === "admin") await setDoc(adminDocument(uid), profile);
  const adminRef = doc(adminCollection, uid);
  if (payload.role === "admin") await setDoc(adminRef, profile);
  // if (payload.role === "courier") await setDoc(courierDocument(uid), profile);
  const courierRef = doc(couriersCollection, uid);
  if (payload.role === "courier") await setDoc(courierRef, profile);

  return profile;
};

export const loginWithEmailPassword = async (email: string,password: string): Promise<IAuthUser> => {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;
  const profile = await fetchUserProfileByUid(uid);
  return profile;
};

export const signOutUser = async (): Promise<void> => {
  await signOut(auth);
};

export const fetchUserProfileByUid = async (uid: string): Promise<IAuthUser> => {
  let attempts = 0;

  while (attempts < 5) {
    const snapshot = await getDoc(profileDocument(uid));

    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() } as IAuthUser;
    }

    await new Promise((res) => setTimeout(res, 300));
    attempts++;
  }

  throw new Error("User profile not found");
};