"use client";

import { Box, LogOut, SlidersHorizontal } from "lucide-react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import cookies from "@/services/cookies";

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Menu items.
  const menus = [
    {
      title: "Stock Adjustment",
      url: "/admin",
      icon: SlidersHorizontal,
    },
    {
      title: "Product Management",
      url: "/admin/product",
      icon: Box,
    },
  ];

  const handleLogout = () => {
    cookies.remove("access_token");
    console.log("User logged out");

    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Simple Webstore</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center space-x-2 ${item.url === pathname ? "bg-black text-white" : ""}`}
                    >
                      <item.icon
                        className={item.title === pathname ? "text-white" : ""}
                      />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout Button */}
        <div className="p-4 mt-auto">
          <Button
            variant="destructive"
            className="w-full flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
