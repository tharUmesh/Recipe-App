"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  // Animate form appearance
  useEffect(() => {
    setFormVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-4 py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background floating elements (same as Home page) */}
      <div
        className="fixed top-20 left-10 text-7xl opacity-10 animate-float"
        style={{ animationDuration: "15s" }}
      >
        🥑
      </div>
      <div
        className="fixed bottom-20 right-10 text-7xl opacity-10 animate-float"
        style={{ animationDuration: "12s", animationDelay: "2s" }}
      >
        🍅
      </div>
      <div
        className="fixed top-1/2 right-20 text-6xl opacity-10 animate-float"
        style={{ animationDuration: "10s", animationDelay: "1s" }}
      >
        🧀
      </div>

      <div
        className={`w-full max-w-md transform transition-all duration-700 ${
          formVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Card container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transform transition-all duration-500 hover:shadow-xl">
          {/* Header with accent color */}
          <div className="bg-gradient-to-r from-green-400 to-green-500 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="opacity-90">
              Sign in to continue your culinary journey
            </p>
          </div>

          {/* Form section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                )}
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-green-600 font-medium hover:text-green-800 transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-10 text-center text-gray-500 text-xs">
          <p>Secure login powered by Recipe App</p>
        </div>
      </div>
    </div>
  );
}

// Add any additional styles needed
const loginStyles = `
@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = loginStyles;
  document.head.appendChild(style);
}

export default Login;
