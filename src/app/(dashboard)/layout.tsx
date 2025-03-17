"use client";

import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/signin");
      return;
    }

    const userRole = session.user.role?.toLowerCase();
    const isInManagerRoute = pathname.startsWith("/managers");
    const isInTenantRoute = pathname.startsWith("/tenants");

    // Redirect if user is accessing wrong role's routes
    if (
      (userRole === "manager" && isInTenantRoute) ||
      (userRole === "tenant" && isInManagerRoute)
    ) {
      router.push(
        userRole === "manager" ? "/managers/dashboard" : "/tenants/dashboard"
      );
      return;
    }

    // If user is at root dashboard, redirect to appropriate dashboard
    if (pathname === "/dashboard") {
      router.push(
        userRole === "manager" ? "/managers/dashboard" : "/tenants/dashboard"
      );
      return;
    }

    setIsLoading(false);
  }, [session, status, router, pathname]);

  if (status === "loading" || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <Navbar />
        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;