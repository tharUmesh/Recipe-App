"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../api/config";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();

  // Animate form appearance
  useEffect(() => {
    setFormVisible(true);
  }, []);

  // Check if passwords match
  useEffect(() => {
    if (confirmPassword) {
      setPasswordMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordMatch) return;

    setIsLoading(true);
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-4 py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background floating elements */}
      <div
        className="fixed top-20 left-10 text-7xl opacity-10 animate-float"
        style={{ animationDuration: "13s" }}
      >
        🥕
      </div>
      <div
        className="fixed bottom-20 right-10 text-7xl opacity-10 animate-float"
        style={{ animationDuration: "10s", animationDelay: "1s" }}
      >
        🍎
      </div>
      <div
        className="fixed top-1/2 right-20 text-6xl opacity-10 animate-float"
        style={{ animationDuration: "8s", animationDelay: "2s" }}
      >
        🥦
      </div>

      <div
        className={`w-full max-w-md transform transition-all duration-700 ${
          formVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Card container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transform transition-all duration-500 hover:shadow-xl">
          {/* Header with accent color */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="opacity-90">Join our community of food enthusiasts</p>
          </div>

          {/* Form section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200"
                  required
                  placeholder="JohnDoe"
                />
              </div>

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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
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

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200 ${
                    !passwordMatch && confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  required
                  placeholder="••••••••"
                />
                {!passwordMatch && confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center disabled:opacity-70"
                disabled={isLoading || !passwordMatch}
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
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                )}
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-green-600 font-medium hover:text-green-800 transition-colors"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-10 text-center text-gray-500 text-xs">
          <p>By registering, you agree to our Terms and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

// Add animation styles
const registerStyles = `
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
  style.textContent = registerStyles;
  document.head.appendChild(style);
}

export default Register;
