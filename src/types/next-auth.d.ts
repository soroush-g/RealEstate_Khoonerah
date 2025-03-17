import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * تعریف نقش‌های کاربری
   */
  type UserRole = "manager" | "tenant" | "owner";

  /**
   * اضافه کردن نقش کاربری به session.user
   */
  interface Session {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  /**
   * اضافه کردن نقش کاربری به User
   */
  interface User {
    id: string;
    role: UserRole;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  /**
   * اضافه کردن نقش کاربری به JWT
   */
  interface JWT {
    id: string;
    role: string;
  }
} 