import { Outlet, Link, useLocation } from "react-router";

export function Layout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-gray-800 bg-gray-200" />
              <h1 className="text-xl font-bold text-gray-900">Vaccination Coverage & Awareness Dashboard</h1>
            </div>
            <nav className="flex gap-8">
              <Link 
                to="/" 
                className={`text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'text-gray-900 underline' 
                    : 'text-gray-600'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium ${
                  location.pathname === '/dashboard' 
                    ? 'text-gray-900 underline' 
                    : 'text-gray-600'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/compare" 
                className={`text-sm font-medium ${
                  location.pathname === '/compare' 
                    ? 'text-gray-900 underline' 
                    : 'text-gray-600'
                }`}
              >
                Compare
              </Link>
              <Link 
                to="/map" 
                className={`text-sm font-medium ${
                  location.pathname === '/map' 
                    ? 'text-gray-900 underline' 
                    : 'text-gray-600'
                }`}
              >
                Maps
              </Link>
              <Link 
                to="/learn" 
                className={`text-sm font-medium ${
                  location.pathname === '/learn' 
                    ? 'text-gray-900 underline' 
                    : 'text-gray-600'
                }`}
              >
                Learn
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}