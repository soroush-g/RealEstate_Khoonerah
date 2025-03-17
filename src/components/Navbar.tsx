"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Bell, MessageCircle, Plus, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { NAVBAR_HEIGHT } from "@/lib/constants";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const isDashboardPage =
    pathname.includes("/managers") || pathname.includes("/tenants");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-sm"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8 bg-primary-700 text-white">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/"
            className="cursor-pointer hover:!text-gray-300"
            scroll={false}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="KhooneRah Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-xl font-bold">
                KHOONE
                <span className="text-white font-light">
                  RAH
                </span>
              </div>
            </div>
          </Link>
          {isDashboardPage && session?.user && (
            <Button
              variant="secondary"
              className="md:ml-4 bg-gray-100 text-black hover:bg-gray-200"
              onClick={() =>
                router.push(
                  session.user.role === "manager"
                    ? "/managers/newproperty"
                    : "/search"
                )
              }
            >
              {session.user.role === "manager" ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block mr-2">ملک جدید</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block mr-2">
                    جستجوی املاک
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
        {!isDashboardPage && (
          <p className="text-gray-300 hidden md:block">
            خانه دلخواه خود را در <span className="font-bold">خونه راه</span> پیدا کنید
          </p>
        )}
        <div className="flex items-center gap-5">
          {session?.user ? (
            <>
              <div className="relative hidden md:block">
                <MessageCircle className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
              <div className="relative hidden md:block">
                <Bell className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
                  <Avatar>
                    <AvatarImage src={session.user.image || undefined} />
                    <AvatarFallback className="bg-gray-700">
                      {session.user.name?.[0]?.toUpperCase() || session.user.role?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-gray-300 hidden md:block">
                    {session.user.name}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white text-black">
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-gray-200"
                    onClick={() =>
                      router.push(
                        session.user.role === "manager"
                          ? "/managers/properties"
                          : "/tenants/favorites",
                        { scroll: false }
                      )
                    }
                  >
                    داشبورد
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-gray-200"
                    onClick={() =>
                      router.push(
                        `/${session.user.role}s/settings`,
                        { scroll: false }
                      )
                    }
                  >
                    تنظیمات
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:!bg-gray-200"
                    onClick={handleSignOut}
                  >
                    خروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-black rounded-lg"
                >
                  ورود
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="text-black bg-white hover:bg-gray-200 rounded-lg"
                >
                  ثبت نام
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
