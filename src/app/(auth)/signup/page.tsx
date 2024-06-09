"use client"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SignUpDataType, useSignUp } from "@/services/auth";

export default function Signup() {
  const { signup, loading, error } = useSignUp()

  const [data, setData] = useState<SignUpDataType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(data);
  }


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
        {error && <p className="text-red-500 text-center">{error}</p>}
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
                  value={data.firstName}
                  onChange={(e) => {
                    setData((prev) => ({
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
                  value={data.lastName}
                  onChange={(e) => {
                    setData((prev) => ({
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
                value={data.email}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }));
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
                value={data.password}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}