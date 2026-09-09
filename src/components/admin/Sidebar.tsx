import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Tags, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { cn } from "../../lib/utils";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package, end: false },
  { to: "/admin/categories", label: "Categories", icon: Tags, end: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, end: false },
];

export function Sidebar() {
  const { signOut } = useAuth();
  const { settings } = useSiteSettings();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/admin/login");
  }

  return (
    <aside className="flex h-full w-full flex-col gap-1 border-r border-black/[0.06] bg-white p-4">
      <div className="mb-6 flex items-center gap-2.5 px-2">
        <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
          <img src={settings.logo_url || "/logo.jpg"} alt={`${settings.business_name} logo`} className="h-full w-full object-cover" />
        </span>
        <span className="text-base font-extrabold text-text-dark">MRV Admin</span>
      </div>

      {LINKS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-semibold transition-colors",
              isActive ? "bg-red/10 text-red" : "text-text-dark hover:bg-black/[0.03]"
            )
          }
        >
          <Icon size={18} aria-hidden />
          {label}
        </NavLink>
      ))}

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 rounded-[12px] px-4 py-3 text-sm font-semibold text-text-muted transition-colors hover:bg-black/[0.03] hover:text-red"
      >
        <LogOut size={18} aria-hidden />
        Logout
      </button>
    </aside>
  );
}
