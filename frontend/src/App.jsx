import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RecipeDetails from "./pages/RecipeDetails";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
