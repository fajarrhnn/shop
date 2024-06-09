"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { baseUrl } from "./utils";

export function useLogout() {
  const router = useRouter();

  const logout = useCallback(async () => {
    try {
      const res = await fetch(`${baseUrl}/api/protect`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success) {
        window.location.reload()
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
