"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Upload, BarChart2, Users, Settings,
  User, HelpCircle, ChevronRight, ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon, label, isActive, isCollapsed, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        isActive
          ? "bg-red-600 text-white"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 w-5 h-5">{icon}</div>
      {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { href: "/", icon: <Home size={20} />, label: "Home" },
    { href: "/upload", icon: <Upload size={20} />, label: "Upload" },
    { href: "/analytics", icon: <BarChart2 size={20} />, label: "Analytics" },
    { href: "/team", icon: <Users size={20} />, label: "Team" },
  ];

  const secondaryNavItems = [
    { href: "/profile", icon: <User size={20} />, label: "Profile" },
    { href: "/settings", icon: <Settings size={20} />, label: "Settings" },
    { href: "/help", icon: <HelpCircle size={20} />, label: "Help & Support" },
  ];

  return (
    <div
      className={cn(
        "fixed hidden md:flex flex-col h-screen bg-zinc-950 border-r border-zinc-800 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex-1 flex flex-col gap-1 p-3 pt-24">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="flex-shrink-0 flex flex-col gap-1 p-3 border-t border-zinc-800">
        {secondaryNavItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>

      <div className="p-3">
        <Button
          variant="ghost"
          size="icon"
          className="w-full flex items-center justify-center h-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
    </div>
  );
}
