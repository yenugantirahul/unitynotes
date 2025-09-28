"use client";

import { login, signup, signInWithGoogle } from "../app/login/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface Field {
  name: string;
  type: string;
  placeholder: string;
}

interface AuthTypes {
  title: string;
  desc: string;
  type: string;
  fields: Field[];
  action: string;
  btn: string;
  toggle: boolean;
}

const Auth = ({ title, desc, fields, btn }: AuthTypes) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id.toLowerCase()]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    try {
      if (title === "SignUp") {
        await signup(data);
      } else {
        await login(data);
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-fit w-full flex p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              {fields.map(({ name, type, placeholder }, i) => (
                <div key={i} className="grid gap-2">
                  <Label htmlFor={name}>{name}</Label>
                  <Input
                    onChange={handleInputChange}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    required
                    disabled={isLoading}
                  />
                </div>
              ))}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <CardFooter className="flex flex-col gap-3 mt-6">
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#63688A]"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : btn}
              </Button>
              <Button
                type="button"
                onClick={signInWithGoogle}
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                {btn} with <FcGoogle />
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
