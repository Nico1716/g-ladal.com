import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=French");
      const data = await response.json();
      setMeals(data.meals.slice(0, 6));
    };

    fetchMeals();
  }, []);

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
      const data = await response.json();
      setIngredients(data.meals.slice(0, 6)); // Limiter à 6 ingrédients
    };

    fetchIngredients();
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
      const data = await response.json();
      setCategories(data.categories.slice(0, 6)); // Limiter à 6 catégories
    };

    fetchCategories();
  }, []);

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">Bienvenue sur G-ladal.com</h1>
      <div className="row">
        {meals.map((meal) => (
          <div className="col-md-4 mb-4" key={meal.idMeal}>
            <div className="card mauve h-100 shadow-sm">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{meal.strMeal}</h5>
                <Link to={`/meal/${meal.idMeal}`} className="btn btn-warning mt-auto">
                  Voir les détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1>Catégories</h1>
      <div className="container">
        <div className="row">
          {categories.map((category) => (
            <div className="col-md-4 mb-4" key={category.idCategory}>
              <div className="card mauve h-100 shadow-sm">
                <img
                  src={category.strCategoryThumb}
                  alt={category.strCategory}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{category.strCategory}</h5>
                  <Link to={`/category/${category.strCategory}`} className="btn btn-warning">
                    Voir les K-sdal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1>Ingrédients</h1>
      <div className="container">
        <div className="row">
          {ingredients.map((ingredient, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card mauve h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ingredient.strIngredient}</h5>
                  <Link to={`/ingredient/${ingredient.strIngredient}`} className="btn btn-warning">
                    Voir les K-sdal
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomePage;