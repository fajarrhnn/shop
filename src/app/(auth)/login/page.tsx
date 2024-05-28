"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEventHandler } from "react";
import { useState } from "react";

export default function Login() {
  const [resMessage, setResMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin: FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.NEXT_PUBLIC_VERCEL_URL  || "http://localhost:3000";
      const res = await fetch(`${url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (res.status === 404) {
        const data = await res.json();
        setResMessage(data.message);
      } else if (res.status === 401) {
        const data = await res.json();
        setResMessage(data.message);
      } else if (res.ok) {
        const data = await res.json();
        window.location.href = "/";
      } else {
       new Error('Gagal Login Akun')
      }
    } catch (error) {
        console.error(error)
    }
  };

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
        <p className="text-sm text-center text-red-500">{resMessage}</p>
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
                value={loginData.email}
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, email: e.target.value }));
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
                value={loginData.password}
                onChange={(e) => {
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full h-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}