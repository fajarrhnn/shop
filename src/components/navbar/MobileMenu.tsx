"use client";

import { Menu as MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navMenu } from "./navList";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const handleClose = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <MenuIcon
          className="ml-2 h-4 w-4 md:hidden"
          aria-label="Burger Menu For Navigating"
        />
      </SheetTrigger>
      <SheetContent side="left" className="focus:[&>button]:shadow-none">
        <SheetHeader className="mb-8">
          <SheetTitle>
            <Link href="/">
              <p className="text-left text-xl font-bold">JarotShop</p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-4 text-sm">
          {navMenu.map((menu) => (
            <li key={menu.title} onClick={handleClose}>
              <Link
                href={menu.href}
                className={cn(pathName === menu.href && "font-bold")}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
