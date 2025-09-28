import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="text-2xl font-bold text-center">
          Profile
        </CardHeader>

        <Avatar className="h-[50px] rounded-full w-[50px] mx-auto text-center">
          <AvatarImage
            className="rounded-full"
            src="https://github.com/shadcn.png"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="h-fit w-[200px] mx-auto"></div>
      </Card>
    </div>
  );
}
