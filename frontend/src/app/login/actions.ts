"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email?.includes("@") || !email?.includes(".") || password?.length < 6) {
    throw new Error("Invalid email or password (minimum 6 characters).");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login error:", error.message);
    throw new Error(error.message || "Login failed.");
  }

  revalidatePath("/", "layout");

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out:", error.message);
  } else {
    console.log("Logged out successfully!");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email?.includes("@") || !email?.includes(".") || password?.length < 6) {
    throw new Error("Invalid email or password (minimum 6 characters).");
  }

  const { data: signUpData, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("Signup error:", error.message);
    throw new Error(error.message || "Signup failed.");
  }

  if (!signUpData.user?.id) {
    console.error("No user ID returned from signup");
    throw new Error("Signup failed: No user ID returned.");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Google sign-in error:", error.message);
    throw new Error(error.message || "Google sign-in failed.");
  }
}
