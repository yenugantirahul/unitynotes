"use client";

import { createClient } from "@/utils/supabase/client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
type UserFunction = ({ updatedName }: { updatedName: string }) => Promise<void>;

// 1️⃣ Context type
type AuthContextType = {
  updateUsername: string;
  setUpdateUsername: Dispatch<SetStateAction<string>>;
  userId: string | null;
  updateName: UserFunction;
  email: string | undefined;
  userName: string | undefined;
};

// 2️⃣ Create context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// 3️⃣ Provider props
type AuthProviderProps = { children: ReactNode };

// 4️⃣ Provider implementation
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [updateUsername, setUpdateUsername] = useState<string>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | undefined>("");

  const supabase = createClient();
  async function getUserName() {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("Error fetching username:", error);
      return null;
    }
    setUserName(data.username);
  }

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Supabase getUser error:", error.message);
        return;
      }
      setUserId(user?.id || null);
      setEmail(user?.email);
    }

    getUser();
    getUserName();
  }, [updateName]);

  async function updateName({ updatedName }: { updatedName: string }) {
    if (!userId) return;
    const { data, error } = await supabase
      .from("profiles")
      .update({ username: updatedName }) // only update the username
      .eq("id", userId) // filter by the logged-in user
      .select();

    console.log("Profile row:", data, error);

    if (error) console.error(error.message);
  }

  return (
    <AuthContext.Provider
      value={{
        updateUsername,
        setUpdateUsername,
        userId,
        updateName,
        email,
        userName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 5️⃣ Hook to consume
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
