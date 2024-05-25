"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const res = await fetch("/api/protect", {
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
