"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

const AuthContent = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage =
    pathname.startsWith("/manager") || pathname.startsWith("/tenants");

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (session && isAuthPage) {
      router.push("/");
    }
  }, [session, isAuthPage, router]);

  // Redirect unauthenticated users away from protected pages
  useEffect(() => {
    if (status === "unauthenticated" && isDashboardPage) {
      router.push("/signin");
    }
  }, [status, isDashboardPage, router]);

  // Allow access to public pages without authentication
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  // Show loading state while checking authentication
  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // For auth pages, show the children (which should be the auth forms)
  // For dashboard pages, only show if authenticated
  if (isAuthPage || (isDashboardPage && session)) {
    return <>{children}</>;
  }

  return null;
};

const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthContent>{children}</AuthContent>
    </SessionProvider>
  );
};

export default Auth;
