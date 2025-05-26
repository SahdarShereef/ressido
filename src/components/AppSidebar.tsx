
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Bed, 
  CreditCard, 
  BarChart3, 
  Settings,
  HelpCircle,
  Building2,
  Plus
} from 'lucide-react';

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Tenants", url: "/tenants", icon: Users },
  { title: "Rooms", url: "/rooms", icon: Bed },
  { title: "Payments", url: "/payments", icon: CreditCard },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help", url: "/help", icon: HelpCircle },
];

const propertyManagementItems = [
  { title: "Add New Property", url: "/onboard-property", icon: Plus },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 bg-white border-r border-slate-200/60`}>
      <SidebarContent className="pt-6">
        <div className={`px-4 mb-8 ${collapsed ? "text-center" : ""}`}>
          {!collapsed ? (
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ressido
              </h2>
              <p className="text-sm text-slate-500 mt-1">Property Management</p>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Property Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {propertyManagementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive(item.url) || linkActive
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-l-4 border-green-500 font-medium"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mb-1">
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive: linkActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive(item.url) || linkActive
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-l-4 border-blue-500 font-medium"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
