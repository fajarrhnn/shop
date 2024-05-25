"use client";
import Link from "next/link";
import MobileMenu from "../navbar/MobileMenu";
import DesktopMenu from "../navbar/DesktopMenu";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { useState, useEffect } from "react";
import { UsersTypes } from "@/lib/definition";
import { getToken } from "@/lib/services";
import { getInitials } from "@/lib/utils";
import jwt from "jsonwebtoken";

export default function Header() {
  const [user, setUser] = useState<UsersTypes>();

  async function fetchAndDecodeToken() {
    try {
      const token = await getToken();
      const decoded:any = jwt.decode(token);
      if (decoded) {
        setUser({
          id: decoded.id,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
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
                      src={`https://ui-avatars.com/api/?name=${getInitials(user.firstName, user.lastName)}`}
                      alt="usn"
                    />
                    <AvatarFallback>
                      {getInitials(user.firstName, user.lastName)}
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
