"use client";

import { useEffect, useState } from "react";
import { authService } from "@/services/authService";
import type { User } from "@/lib/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setIsReady(true);
  }, []);

  function logout() {
    authService.clearSession();
    setUser(null);
  }

  return {
    user,
    token: authService.getToken(),
    isAuthenticated: Boolean(user),
    isReady,
    logout
  };
}
