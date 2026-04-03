import { useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firestore/firebase";
import { authUserSelector, authLoadingSelector, clearAuth } from "../../store/auth/slice/auth.slice";
import { loadCurrentUser } from "../../store/auth/thunks/auth.thunks";
import { useAppDispatch, useAppSelector } from "./useHooks";
import { endSession } from "../services/session";


const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authUserSelector);
  const loading = useAppSelector(authLoadingSelector);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await dispatch(loadCurrentUser(firebaseUser.uid)).unwrap();
          userIdRef.current = userData.id;
        } catch (error) {
          console.log("Profile not ready yet", error);
        }
      } else {
        dispatch(clearAuth());
        userIdRef.current = null;
      }
    });

    return () => {
      const sessionId = localStorage.getItem("sessionId");
      if (userIdRef.current && sessionId) {
        endSession(userIdRef.current, sessionId)
          .catch((err) => console.warn("Failed to close session", err));
        localStorage.removeItem("sessionId");
      }
      unsubscribe();
    };
  }, [dispatch]);

  return { user, loading };
};

export default useAuth;