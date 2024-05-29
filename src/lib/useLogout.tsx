"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const url = process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000";
      const res = await fetch(`${url}/api/protect`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        router.push("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  return logout;
}
