import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_URL from "../api/config";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/recipes/${id}`);
        setRecipe(response.data);

        // Trigger animation after data is loaded
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      } catch (err) {
        console.error("Error fetching recipe:", err);
        setError("Could not load recipe details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pt-24 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pt-24 px-4">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
          <div className="text-center text-red-500">
            <h2 className="text-2xl font-bold mb-2">Error</h2>
            <p>{error}</p>
            <Link
              to="/"
              className="mt-4 inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 pt-24 px-4">
      <div
        className={`max-w-4xl mx-auto transition-all duration-700 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Recipe Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-green-300 to-blue-300 relative">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-7xl">🍽️</span>
              </div>
            )}

            {/* Floating badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-white/80 px-4 py-2 rounded-full text-green-600 font-medium shadow-md">
                {recipe.cuisine || "Homemade"}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-600">
                  {recipe.prepTime || "30 mins"}
                </span>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-gray-600">
                  Serves {recipe.servings || "4"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Ingredients */}
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-1">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Instructions
            </h2>
            <div className="text-gray-700 space-y-4">
              {recipe.instructions.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 mb-16">
          <Link
            to="/"
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Recipes
          </Link>

          <button
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
            onClick={() => window.print()}
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print Recipe
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="fixed -bottom-10 -left-10 text-7xl opacity-5 animate-float"
        style={{ animationDuration: "16s" }}
      >
        🥗
      </div>
      <div
        className="fixed top-1/3 -right-10 text-7xl opacity-5 animate-float"
        style={{ animationDuration: "18s", animationDelay: "1s" }}
      >
        🧂
      </div>
    </div>
  );
}

// Add animation for decorative elements
const recipeDetailsStyles = `
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
  style.textContent = recipeDetailsStyles;
  document.head.appendChild(style);
}

export default RecipeDetails;
