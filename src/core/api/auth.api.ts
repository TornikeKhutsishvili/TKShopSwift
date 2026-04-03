import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firestore/firebase";
import type { IAuthUser, IRegisterPayload } from "../interfaces/auth.interface";

const profileDocument = (uid: string) => doc(db, "profiles", uid);
const usersCollection = (uid: string) => doc(db, "users", uid);
const adminCollection = (uid: string) => doc(db, "admins", uid);
const couriersCollection = (uid: string) => doc(db, "couriers", uid);

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

  const profile = buildAuthProfile(uid, {
    ...payload,
    profileImage: payload.profileImage
    ? JSON.stringify({ profileImage : payload.profileImage })
    : "",
  });

  await setDoc(profileDocument(uid), profile);

  if (payload.role === "user") await setDoc(usersCollection(uid), profile);
  if (payload.role === "admin") await setDoc(adminCollection(uid), profile);
  if (payload.role === "courier") await setDoc(couriersCollection(uid), profile);

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

export const updateUserProfile = async (uid: string, updates: Partial<IAuthUser>): Promise<IAuthUser> => {
  const profileRef = profileDocument(uid);
  await setDoc(profileRef, updates, { merge: true });

  const profile = await fetchUserProfileByUid(uid);
  const roleCollections = {
    user: usersCollection(uid),
    admin: adminCollection(uid),
    courier: couriersCollection(uid),
  };

  if (profile.role in roleCollections) {
    await setDoc(roleCollections[profile.role as keyof typeof roleCollections], { ...profile, ...updates }, { merge: true });
  }

  return { ...profile, ...updates };
};