import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if a route is active
  const isActive = (path) => location.pathname === path;

  // Check authentication status on mount and when localStorage changes
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Check on mount
    checkAuth();

    // Listen for storage events (like when token is added/removed in another tab)
    window.addEventListener("storage", checkAuth);

    // Set up an interval to periodically check auth status (optional, helps with reliability)
    const authCheckInterval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(authCheckInterval);
    };
  }, [location]); // Re-check when location changes (like after login redirect)

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-white/90 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-3xl">🍽️</span>
              <span className="font-bold text-gray-800 text-xl bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                Recipe App
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`nav-link px-4 py-2 rounded-lg text-gray-600 font-medium transition-all duration-300 hover:text-green-700 relative group overflow-hidden ${
                isActive("/")
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-green-50/50"
              }`}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-50/0 to-green-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Link>

            <Link
              to="/create-recipe"
              className={`nav-link px-4 py-2 rounded-lg text-gray-600 font-medium transition-all duration-300 hover:text-green-700 relative group overflow-hidden ${
                isActive("/create-recipe")
                  ? "bg-green-50 text-green-700"
                  : "hover:bg-green-50/50"
              }`}
            >
              <span className="relative z-10">Create Recipe</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-green-50/0 to-green-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2.5 font-medium text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:shadow"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 font-medium text-white rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 font-medium text-white rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-200 shadow hover:shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white border-t border-gray-200 animate-fadeDown`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 relative overflow-hidden ${
              isActive("/")
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:text-green-600 hover:bg-green-50/60"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="relative z-10">Home</span>
            {!isActive("/") && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
            )}
          </Link>
          <Link
            to="/create-recipe"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 relative overflow-hidden ${
              isActive("/create-recipe")
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:text-green-600 hover:bg-green-50/60"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="relative z-10">Create Recipe</span>
            {!isActive("/create-recipe") && (
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300"></span>
            )}
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-300">
            <div className="flex items-center justify-center space-x-3 px-3 py-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="w-full text-center px-4 py-2 rounded-md text-gray-700 font-medium border border-gray-300 hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-center px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-4 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Add animation for mobile menu and hover effects
const navbarStyles = `
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeDown {
  animation: fadeDown 0.3s ease-out;
}

.nav-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.nav-link:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(52, 211, 153, 0.2) 0%, transparent 70%);
  z-index: -1;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

// Add styles to document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = navbarStyles;
  document.head.appendChild(style);
}

export default Navbar;
