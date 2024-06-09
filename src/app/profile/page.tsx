"use client";
import * as React from "react";
import Link from "next/link";
import { useLogout } from "@/lib/useLogout";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  UserIcon,
  HomeIcon,
  ShoppingBagIcon,
  PencilIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { UsersTypes, AddressTypes } from "@/lib/definition";
import FormAddress from "./postAddress";
import PreviewAddress from "./previewAddress";
import { useGetAddress } from "@/services/address";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useGetFullName } from "@/services/profile";

export default function Profile() {
  const user = useGetFullName()
  const location = useGetAddress()
  const logout = useLogout();
  const { toast } = useToast()
  const { refresh } = useRouter()

  return (
    <>
      <header className="lg:hidden w-full mx-auto py-2.5 sticky top-16 bg-white z-50">
        <nav className="w-11/12 mx-auto">
          <ul className="w-full list-none flex justify-evenly items-center">
            <Link href={'/profile'} className="pb-1">
              <span className="text-sm text-center text-slate-900 underline-offset-4 hover:underline dark:text-slate-50">Overview</span>
            </Link>
            <Button variant={'ghost'} onClick={() => { toast({ title: "This feature is coming soon in the future" }) }}>
              <span className="text-sm text-center">Orders</span>
            </Button>
            <Button variant={'ghost'} onClick={() => { toast({ title: "This feature is coming soon in the future" }) }}>
              <span className="text-sm text-center">Setting</span>
            </Button>
            <Button variant={'ghost'} onClick={logout}>
              <span className="text-sm text-center">Logout</span>
            </Button>
          </ul>
        </nav>
      </header >
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

                <Button variant={'ghost'} onClick={refresh}>
                  <HomeIcon className="w-4 h-4 mr-2" />
                  Overview
                </Button>
                <Button variant={'ghost'} onClick={() => { toast({ title: "This feature is coming soon in the future" }) }}>
                  <ShoppingBagIcon className="w-4 h-4 mr-2" />
                  Orders
                </Button>
                <Button variant={'ghost'} onClick={() => { toast({ title: "This feature is coming soon in the future" }) }}>
                  <SettingsIcon className="w-4 h-4 mr-2" />
                  Setting
                </Button>
                <Button onClick={logout} variant={"ghost"}>
                  <LogOutIcon className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </nav>
            </aside>
          </div>
        </div>
        <section className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex flex-row items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  alt="usn"
                  src={`https://ui-avatars.com/api/?name=${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}/?size=128`}
                />
                <AvatarFallback>
                  {user?.firstName} +{user?.lastName}
                </AvatarFallback>
              </Avatar>
              <div className="text-start flex-col">
                <h2 className="text-2xl font-bold">
                  {user?.firstName + " " + user?.lastName}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {location.length > 0 ? (
                <PreviewAddress address={location} />
              ) : (
                <FormAddress />
              )}
            </div>
          </main>
        </section>
      </div>
    </>
  );
}