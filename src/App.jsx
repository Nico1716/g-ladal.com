import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./assets/Navbar";
import HomePage from "./page/HomePage";
import MealDetailsPage from "./page/MealDetailsPage";
import RandomMealPage from "./page/RandomMealPage";
import SearchPage from "./page/SearchPage";
import FilteredMealsPage from "./page/FilteredMealsPage";

function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/random-meal" element={<RandomMealPage />} />
        <Route path="/meal/:id" element={<MealDetailsPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/:filterType/:filterValue" element={<FilteredMealsPage />} />
      </Routes>
    </Router>
  );
}

export default App;