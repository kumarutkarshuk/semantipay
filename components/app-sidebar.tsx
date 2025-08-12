"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton, useSignIn } from "@clerk/nextjs";
import {
  Calculator,
  Users,
  Landmark,
  Loader,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  // {
  //   title: "Dashboard",
  //   url: "/dashboard",
  //   icon: BarChart3,
  // },
  {
    title: "Process Payroll",
    url: "/dashboard/payroll",
    icon: Loader,
  },
  {
    title: "Payroll Results",
    url: "/dashboard/payroll-results",
    icon: Calculator,
  },
  {
    title: "Employees",
    url: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "Compliance",
    url: "/dashboard/compliance",
    icon: Landmark,
  },
  // {
  //   title: "Settings",
  //   url: "/dashboard/settings",
  //   icon: Settings,
  // },
];

export function AppSidebar() {
  const { isLoaded } = useSignIn();
  const {setOpenMobile} = useSidebar()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base sm:text-lg">
              SemantiPay
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          {/* <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Main Menu
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="w-full justify-start px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Link href={item.url} className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-2">
              {isLoaded ? (
                <SignedIn>
                <UserButton />
              </SignedIn>
              ) : (
                <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
              )}
              <span className="text-sm text-muted-foreground truncate">
                Account
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
