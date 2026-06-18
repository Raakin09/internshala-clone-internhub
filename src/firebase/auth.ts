import app from "./firebase";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const auth = getAuth(app);

const provider =
  new GoogleAuthProvider();

export const signInWithGoogle =
  async () => {
    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const user =
      result.user;

    await fetch(
      "/api/users/create",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name:
            user.displayName,
          email:
            user.email,
          photoURL:
            user.photoURL,
        }),
      }
    );

    return result;
  };

export const logoutUser = () => {
  return signOut(auth);
};