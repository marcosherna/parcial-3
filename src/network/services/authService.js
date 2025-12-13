import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

import { auth as authenticate } from "../firebase"; 
 
export const unsubscribeSession = (callback) =>
  onAuthStateChanged(authenticate, (currentUser) => {
    callback(currentUser);
  });

export const register = async (
  name,
  email,
  password
) => {
  const userCredential = await createUserWithEmailAndPassword(
    authenticate,
    email,
    password
  );

  const user = userCredential.user;
  await updateProfile(user, { displayName: name });
  return user;
};

export const sigIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    authenticate,
    email,
    password
  );

  const user = userCredential.user;
  return user;
};

export const signOut = async () => {
  await authenticate.signOut();
};
 