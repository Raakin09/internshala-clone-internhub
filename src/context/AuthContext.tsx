import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { auth } from "@/firebase/auth";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({
  children,
}: any) => {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);