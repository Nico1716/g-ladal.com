import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RandomMealPage = () => {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    const fetchRandomMeal = async () => {
      const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setMeal(data.meals[0]);
    };

    fetchRandomMeal();
  }, []);

  if (!meal) {
    return <p className="text-center mt-5">Chargement...</p>;
  }

  return (
    <main className="container mt-5">
      <div className="card shadow-lg">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="img-fluid rounded-start"
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h1 className="card-title">{meal.strMeal}</h1>
              <h5 className="text-muted">{meal.strArea} Cuisine</h5>
              <h5 className="text-muted">Catégorie : {meal.strCategory}</h5>
              <h4>Instructions</h4>
              <p>{meal.strInstructions}</p>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-5">Ingrédients</h3>
      <ul className="list-group">
        {Array.from({ length: 20 }).map((_, index) => {
          const ingredient = meal[`strIngredient${index + 1}`];
          const measure = meal[`strMeasure${index + 1}`];
          return ingredient ? (
            <li key={index} className="list-group-item">
              {ingredient}: {measure}
            </li>
          ) : null;
        })}
      </ul>
    </main>
  );
};

export default RandomMealPage;