import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Layers,
  LayoutDashboard,
  PlusCircle,
  Home,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { signOut } from "@/integrations/supabase/client";

export default function SidebarLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } hidden md:flex flex-col sticky top-0 h-screen overflow-y-auto duration-200 border-r border-border bg-sidebar-background`}
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <img
            src="/logo.png"
            alt="MetaBull"
            className="h-8 w-auto brightness-200"
          />
          <div className="flex flex-col">
            <span className="font-bold text-xl leading-none tracking-tight text-white">
              MetaBull
            </span>
            <span className="text-lg font-medium text-muted-foreground tracking-wide">
              Universe
            </span>
          </div>
        </div>

        <nav className="mt-2 flex-1 px-2">
          <SideItem
            to="/"
            label="Home"
            icon={<Home className="h-4 w-4" />}
            open={open}
          />
          <SideItem
            to="/dashboard"
            label="Dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            open={open}
          />
          <SideItem
            to="/create"
            label="Create New"
            icon={<PlusCircle className="h-4 w-4" />}
            open={open}
          />
        </nav>

        <div className="p-3 border-t border-border space-y-2">
          <SideItem
            to="/profile"
            label="Profile"
            icon={<User className="h-4 w-4" />}
            open={open}
          />
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            {open && "Logout"}
          </Button>
        </div>
      </aside>

      {/* Mobile top bar with menu */}
      <div className="md:hidden fixed inset-x-0 top-0 z-20 flex items-center justify-between border-b border-border bg-sidebar-background px-4 py-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-border px-3 py-1.5 text-sm text-foreground"
        >
          Menu
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
            <Layers className="h-4 w-4" />
          </div>
          <span className="font-semibold text-foreground">Landing Pages</span>
        </div>
        <Button size="sm" variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide-over mobile menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-10">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64 border-r border-border bg-sidebar-background p-4">
            <nav className="mt-8 space-y-1">
              <MobileItem to="/" label="Home" onClick={() => setOpen(false)} />
              <MobileItem
                to="/dashboard"
                label="Dashboard"
                onClick={() => setOpen(false)}
              />
              <MobileItem
                to="/create"
                label="Create New"
                onClick={() => setOpen(false)}
              />
              <div className="my-2 border-t border-border"></div>
              <MobileItem
                to="/profile"
                label="Profile"
                onClick={() => setOpen(false)}
              />
            </nav>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function SideItem({
  to,
  label,
  icon,
  open,
}: {
  to: string;
  label: string;
  icon: React.ReactNode;
  open: boolean;
}) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        ].join(" ")
      }
    >
      {icon}
      {open && <span>{label}</span>}
    </NavLink>
  );
}

function MobileItem({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        [
          "block rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}
