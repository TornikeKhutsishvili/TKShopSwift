import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firestore/firebase";
import type { IAuthUser, IRegisterPayload } from "../interfaces/auth.interface";

const profileDocument = (uid: string) => doc(db, "profiles", uid);

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
  address: payload.address,
  vehicle: payload.vehicle,
  workingDays: payload.workingDays ?? []
});


export const registerWithEmailPassword = async (payload: IRegisterPayload): Promise<IAuthUser> => {
  const credential = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
  const uid = credential.user.uid;
  const profile = buildAuthProfile(uid, payload);
  await setDoc(profileDocument(uid), profile);
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