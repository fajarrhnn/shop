"use client"

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoginDataType, useLogin } from "@/services/auth";

export default function Login() {
  const { login, loading, message } = useLogin();
  const [data, setData] = useState<LoginDataType>({
    email: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(data);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Or
            </p>
            <Link
              href="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              sign up for a new account
            </Link>
          </div>
        </div>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="email"
            >
              Email address
            </Label>
            <div className="mt-1">
              <Input
                type="email"
                id="email"
                placeholder="Email"
                required
                value={data.email}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }))
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
                type="password"
                id="password"
                placeholder="Password"
                required
                value={data.password}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, password: e.target.value }))
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
    </div >
  );
}