import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

const Create = async () => {
  const supabase = await createClient();

  // 1️⃣ Get the current authenticated user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/login");
  }
  return <div>Create Notes</div>;
};

export default Create;
