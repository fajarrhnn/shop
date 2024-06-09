"use client";
import Link from "next/link";
import MobileMenu from "../navbar/MobileMenu";
import DesktopMenu from "../navbar/DesktopMenu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useGetFullName } from "@/services/profile";

export default function Header() {
  const user = useGetFullName()
  return (
    <>
      <header className="w-full mx-auto sticky top-0 z-50 bg-white shadow-md">
        <nav className="flex items-center justify-between py-4 w-11/12 mx-auto">
          <div className="flex items-center gap-2">
            <MobileMenu />
            <Link href="/" className="hidden md:block">
              <p className="text-2xl font-bold">JarotShop</p>
            </Link>
          </div>
          <div className="hidden md:block">
            <DesktopMenu />
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href={"/profile"}>
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${user?.firstName.charAt(0)}${user?.lastName.charAt(0)}`}
                      alt="usn"
                    />
                    <AvatarFallback>
                      {user?.firstName.charAt(0) + user?.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <Link href={"/login"} passHref>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
