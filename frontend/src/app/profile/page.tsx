"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useId } from "react";

export default function PrivatePage() {
  const { userId, updateName, updateUsername, setUpdateUsername, email } =
    useAuth();
  const router = useRouter();

  if (!userId) {
    router.push("/login");
    return null;
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

        <div className="h-fit w-[200px] mx-auto">
          <label>Username: </label>
          <div className="flex gap-2">
            <Input
              value={updateUsername}
              onChange={(e) => setUpdateUsername(e.target.value)}
            />
            <Button
              onClick={() => updateName({ updatedName: updateUsername })}
              className="cursor-pointer"
            >
              Save
            </Button>
          </div>
          <h1 className="flex items-center gap-2 mt-5">
            <span className="text-2xl font-bold">
              Email:{" "}
              <span className="text-xl font-normal bg-black  p-2 mt-5 shadow-2xl">
                {email}
              </span>
            </span>
          </h1>
        </div>
      </Card>
    </div>
  );
}
