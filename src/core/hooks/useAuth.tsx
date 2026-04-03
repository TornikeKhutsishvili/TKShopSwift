import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firestore/firebase";
import { authUserSelector, authLoadingSelector, clearAuth } from "../../store/auth/slice/auth.slice";
import { loadCurrentUser } from "../../store/auth/thunks/auth.thunks";
import { useAppDispatch, useAppSelector } from "./useHooks";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authUserSelector);
  const loading = useAppSelector(authLoadingSelector);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          await dispatch(loadCurrentUser(firebaseUser.uid)).unwrap();
        } catch (error) {
          console.log("Profile not ready yet", error);
        }
      } else {
        dispatch(clearAuth());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, loading };
};

export default useAuth;