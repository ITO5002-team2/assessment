import { Outlet, Link, useLocation } from "react-router";
import { Shield, Home, BarChart3, GitCompare, Map, BookOpen } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { to: "/compare", label: "Compare", icon: GitCompare },
    { to: "/map", label: "Maps", icon: Map },
    { to: "/learn", label: "Learn", icon: BookOpen },
  ];
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Vaccination Coverage Dashboard</h1>
                <p className="text-sm text-slate-500">High-level monitoring and regional comparison</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-2">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    location.pathname === to
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="pb-10">
        <Outlet />
      </main>
    </div>
  );
}
