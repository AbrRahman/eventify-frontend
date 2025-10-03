import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import app from "./firebaseConfig";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// login with google
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result?.user;
};

// signout  firebase
export const googleLogOut = async () => {
  await signOut(auth);
};
