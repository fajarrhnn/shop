"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, FormEventHandler } from "react";

export default function Signup() {
  const [resMessage, setResMessage] = useState("");

  const [signupData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleSignUp: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.NEXT_PUBLIC_VERCEL_URL  || "http://localhost:3000";
      const res = await fetch(`${url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      if (res.status === 403) {
        const data = await res.json();
        setResMessage(data.message);
      } else if (res.ok) {
        const data = await res.json();
        window.location.href = "/";
      } else {
        new Error("Gagal Registrasi Akun");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Create a new account
          </h2>
          <div className="space-x-2 flex items-center justify-center mt-2">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Sign in
            </Link>
          </div>
        </div>
        <p className="text-sm text-center text-red-500">{resMessage}</p>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="first-name"
              >
                First name
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="given-name"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-500"
                  id="firstName"
                  name="firstName"
                  required
                  type="text"
                  value={signupData.firstName}
                  onChange={(e) => {
                    setSignUpData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div>
              <Label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="last-name"
              >
                Last name
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="family-name"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-500"
                  id="lastName"
                  name="lastName"
                  required
                  type="text"
                  value={signupData.lastName}
                  onChange={(e) => {
                    setSignUpData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email address
            </Label>
            <div className="mt-1">
              <Input
                autoComplete="email"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-500"
                id="email"
                name="email"
                required
                type="email"
                value={signupData.email}
                onChange={(e) => {
                  setSignUpData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </div>
          </div>
          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="mt-1">
              <Input
                autoComplete="new-password"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50 dark:placeholder-gray-500"
                id="password"
                name="password"
                required
                type="password"
                value={signupData.password}
                onChange={(e) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full h-full">
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}