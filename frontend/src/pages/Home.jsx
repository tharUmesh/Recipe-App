"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../api/config";
import Hero from "../components/Hero";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Add a small delay to each card's animation
  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <Hero />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="relative z-10">Explore Our Latest Recipes</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-yellow-200 transform -rotate-1 z-0"></span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover mouthwatering dishes from our community. Try something new
            today!
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <div
                  key={recipe._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{
                    animation: "fadeInUp 0.5s ease-out forwards",
                    animationDelay: getAnimationDelay(index),
                    opacity: 0,
                  }}
                >
                  <div className="h-48 bg-gradient-to-r from-green-300 to-blue-300 flex items-center justify-center">
                    {recipe.image ? (
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">🍽️</span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                      {recipe.title}
                    </h3>

                    <div className="mb-4 flex items-center">
                      <span className="text-sm bg-green-100 text-green-600 rounded-full px-3 py-1">
                        {recipe.cuisine || "Homemade"}
                      </span>
                      <span className="ml-2 text-gray-500 text-sm">
                        {recipe.prepTime || "30 mins"}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-1">
                        Top ingredients:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients
                          .slice(0, 3)
                          .map((ingredient, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 rounded-full px-2 py-1"
                            >
                              {ingredient}
                            </span>
                          ))}
                        {recipe.ingredients.length > 3 && (
                          <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
                            +{recipe.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/recipe/${recipe._id}`}
                      className="block w-full text-center py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-5xl mb-4">🍳</div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No Recipes Yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Be the first to share your amazing recipe!
                </p>
                <Link
                  to="/create-recipe"
                  className="inline-block py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Create Recipe
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Animated floating elements in the background */}
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
    </div>
  );
}

// Add this to your index.css or directly in your <head> with a style tag
const animationStyles = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
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
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

export default Home;
