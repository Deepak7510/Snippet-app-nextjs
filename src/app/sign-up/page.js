"use client";
import * as React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // ✅ Correct

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import signupUserAction from "@/actions/auth/signup";

const schema = z.object({
  name: z
    .string()
    .nonempty("Name is required.")
    .min(3, "Name must be greater then 3 character."),
  email: z
    .string()
    .nonempty("Name is required.")
    .email("Invalid email formet."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must be at least 6 character."),
});

function SignUp() {
  const navigate = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValue: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleOnSubmit(data) {
    const response = await signupUserAction(data);
    if (response.success) {
      toast.success(response.message);
      reset();
      navigate.push("/sign-in");
    } else {
      toast.error(response.message);
    }
  }

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-[370px]">
        <CardHeader>
          <CardTitle className={"text-2xl text-center font-extrabold"}>
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Name</Label>
                <Input
                  type={"text"}
                  id="name"
                  placeholder="Enter you name"
                  {...register("name")}
                />
                {errors && errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type={"email"}
                  id="email"
                  placeholder="Enter you email"
                  {...register("email")}
                />
                {errors && errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  type={"password"}
                  id="password"
                  placeholder="Enter you password"
                  {...register("password")}
                />
                {errors && errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button className={"w-full"}>Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignUp;
