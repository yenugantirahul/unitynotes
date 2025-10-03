"use client";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { userId, userName } = useAuth();
  return (
    <div>
      <h1 className="lg:text-5xl text-3xl font-bold text-center">
        {!userId ? "Login/SignUp to create" : `Welcome back ${userName}`}
      </h1>
    </div>
  );
}
