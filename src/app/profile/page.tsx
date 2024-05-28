"use client";
import Link from "next/link";
import jwt from "jsonwebtoken"
import { useLogout } from "@/lib/useLogout";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { UserIcon, HomeIcon, ShoppingBagIcon, PencilIcon, LogOutIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { UsersTypes } from "@/lib/definition";
import { getToken } from "@/lib/services";

export default function Profile() {
  const [user, setUser] = useState<UsersTypes>()
  const logout = useLogout();

  async function fetchAndDecodeToken() {
    try {
      const token = await getToken();
      const decoded: any = jwt.decode(token);
      if (decoded) {
        setUser({
          id: decoded?.id,
          firstName: decoded?.firstName,
          lastName: decoded?.lastName,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAndDecodeToken();
  }, []);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <UserIcon className="h-6 w-6" />
              <span className="">User Profile</span>
            </Link>
          </div>
          <aside className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              <Link
                className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                href="#"
              >
                <HomeIcon className="h-4 w-4" />
                Overview
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ShoppingBagIcon className="h-4 w-4" />
                Order
              </Link>
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <PencilIcon className="h-4 w-4" />
                Edit Profile
              </Link>
              <Button onClick={logout} variant={"ghost"}>
                <LogOutIcon className="mr-3 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </aside>
        </div>
      </div>
      <section className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <Link className="lg:hidden" href="#">
            <UserIcon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid md:grid-cols-[1fr_2fr] gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage alt="usn" src={`https://ui-avatars.com/api/?name=${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}/?size=128`} />
                <AvatarFallback>{user?.firstName} +{user?.lastName}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{user?.firstName + " " + user?.lastName}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}