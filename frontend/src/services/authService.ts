"use client";

import type { User } from "@/lib/types";

const TOKEN_KEY = "hireflow_token";
const USER_KEY = "hireflow_user";

export const authService = {
  saveSession(token: string, user: User) {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getToken() {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(TOKEN_KEY);
  },

  getCurrentUser(): User | null {
    if (typeof window === "undefined") return null;

    const rawUser = window.localStorage.getItem(USER_KEY);
    if (!rawUser) return null;

    try {
      return JSON.parse(rawUser) as User;
    } catch {
      this.clearSession();
      return null;
    }
  },

  clearSession() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  }
};
