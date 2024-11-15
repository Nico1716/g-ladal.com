import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const FilteredMealsPage = () => {
  const { filterType, filterValue } = useParams(); // Récupère le type (category/ingredient) et la valeur
  const [meals, setMeals] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchMeals = async () => {
      let endpoint = "";

      // Détermine l'endpoint basé sur le type de filtre
      if (filterType === "category") {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${filterValue}`;
      } else if (filterType === "ingredient") {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${filterValue}`;
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setMeals(data.meals || []); // Si aucun repas, assurez-vous que meals est un tableau vide
      } catch (error) {
        console.error("Erreur lors de la récupération des repas :", error);
      }
    };

    fetchMeals();
  }, [filterType, filterValue]);

  return (
    <main>
      <h1>
        Repas pour {filterType === "category" ? "la catégorie" : "l'ingrédient"} :{" "}
        <span className="text-warning">{filterValue}</span>
      </h1>
      <div className="container">
        {meals.length > 0 ? (
          <div className="row">
            {meals.map((meal) => (
              <div className="col-md-4" key={meal.idMeal}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{meal.strMeal}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun repas trouvé pour {filterType} : {filterValue}</p>
        )}
      </div>
    </main>
  );
};

export default FilteredMealsPage;