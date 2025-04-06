import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  // Food-related words for animated text
  const foodWords = ["Delicious", "Tasty", "Homemade", "Fresh", "Gourmet"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Array of hero images
  const heroImages = [
    
    "/images/hero-food2.jpg",
    "/images/hero-food4.jpg",
    "/images/hero-food5.jpg",
    "/images/hero-food6.jpg",
    "/images/hero-food7.jpg",
    "/images/hero-food8.jpg",
    "/images/hero-food10.jpg",
    "/images/hero-food12.jpg",
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Animate food words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % foodWords.length);
    }, 2000);

    return () => clearInterval(wordInterval);
  }, []);

  // Animate hero images with fade effect
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setFade(true); // Start fade-in
      }, 500); // Duration of fade-out
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-50 to-green-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content with animated words */}
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="relative">
                <span
                  className="inline-block transition-all duration-700 transform"
                  style={{
                    animationName: "bounce",
                    animationDuration: "2s",
                    animationIterationCount: "infinite",
                  }}
                >
                  {foodWords[currentWordIndex]}
                </span>
              </span>
              <br />
              Recipes For Everyone
            </h1>
            <p className="text-lg text-gray-600 mb-8 animate-pulse">
              Find inspiration for your next meal, share your culinary
              creations, and connect with food lovers around the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Get Started
              </Link>
              <Link
                to="/recipes"
                className="px-6 py-3 bg-white text-green-500 font-medium rounded-lg border border-green-500 hover:bg-green-50 transition duration-300 hover:shadow-lg transform hover:-translate-y-1"
              >
                Browse Recipes
              </Link>
            </div>
          </div>

          {/* Hero Image with animation */}
          <div className="md:w-1/2 perspective-1000">
            <div
              className={`rounded-lg overflow-hidden shadow-xl transform transition-all duration-1000 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
              style={{
                animation: "float 6s ease-in-out infinite",
              }}
            >
              <img
                src={heroImages[currentImageIndex]} // Dynamic image source
                alt="Delicious food"
                className="w-full h-auto object-cover transform transition-transform duration-700 hover:scale-105"
                style={{
                  minHeight: "300px",
                  maxHeight: "400px",
                }}
              />
            </div>

            {/* Optional overlay text on the image */}
            <div className="relative mt-4">
              <span className="bg-white/80 px-4 py-2 rounded-full text-green-600 font-medium shadow-md">
                Start your culinary journey today!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this to your index.css or directly in your <head> with a style tag
const animationStyles = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.perspective-1000 {
  perspective: 1000px;
}
`;

// Add the styles to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

export default Hero;
