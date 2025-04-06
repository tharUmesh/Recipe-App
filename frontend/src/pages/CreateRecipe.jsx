"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api/config";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
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
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You need to be logged in to create a recipe");
        navigate("/login");
        return;
      }

      await axios.post(
        `${API_URL}/recipes`,
        {
          title,
          ingredients: ingredients.split(",").map((i) => i.trim()),
          instructions,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setIngredients("");
      setInstructions("");
      alert("Recipe created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error);
      alert("Error creating recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 px-4 py-16 flex items-center justify-center relative overflow-hidden">
      {/* Background floating elements */}
      <div
        className="fixed top-20 left-10 text-7xl opacity-10 animate-float"
        style={{ animationDuration: "14s" }}
      >
        🌶️
      </div>
      <div
        className="fixed bottom-20 right-10 text-7xl opacity-10 animate-float"
        style={{ animationDuration: "13s", animationDelay: "2s" }}
      >
        🥘
      </div>
      <div
        className="fixed top-1/2 right-20 text-6xl opacity-10 animate-float"
        style={{ animationDuration: "9s", animationDelay: "1.5s" }}
      >
        🍳
      </div>

      <div
        className={`w-full max-w-2xl transform transition-all duration-700 ${
          formVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        {/* Card container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100 transform transition-all duration-500 hover:shadow-xl">
          {/* Header with accent color */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Share Your Recipe</h1>
            <p className="opacity-90">
              Create and share your culinary masterpiece with our community
            </p>
          </div>

          {/* Form section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipe Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Grandma's Famous Chocolate Cake"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingredients{" "}
                  <span className="text-gray-500 text-xs">
                    (comma-separated)
                  </span>
                </label>
                <textarea
                  id="ingredients"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200"
                  rows="3"
                  placeholder="2 cups flour, 1 cup sugar, 3 eggs, 1/2 cup milk"
                  required
                ></textarea>
                <p className="text-xs text-gray-500 italic mt-1">
                  Separate ingredients with commas. Include quantities if
                  possible.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="instructions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cooking Instructions
                </label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all duration-200"
                  rows="5"
                  placeholder="Step 1: Preheat oven to 350°F..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving Recipe...
                  </>
                ) : (
                  <>
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Recipe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-6 text-center text-gray-500 text-xs">
          <p>
            By submitting a recipe, you agree to share it with the Recipe App
            community
          </p>
        </div>
      </div>
    </div>
  );
}

// Add necessary animations
const createRecipeStyles = `
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
  style.textContent = createRecipeStyles;
  document.head.appendChild(style);
}

export default CreateRecipe;
