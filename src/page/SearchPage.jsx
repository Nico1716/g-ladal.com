import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SearchPage = () => {
  const { query } = useParams(); // Récupérer la requête de recherche depuis l'URL
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );
        const data = await response.json();
        setMeals(data.meals || []); // Si aucun résultat, assurez-vous que meals est un tableau vide
      } catch (error) {
        console.error("Erreur lors de la recherche :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <p className="text-center mt-5">Chargement des résultats...</p>;
  }

  return (
    <main className="container mt-5">
      <h1 className="text-center mb-4">
        Résultats pour : <span className="text-warning">{query}</span>
      </h1>

      {meals.length > 0 ? (
        <div className="row">
          {meals.map((meal) => (
            <div className="col-md-4 mb-4" key={meal.idMeal}>
              <div className="card h-100 shadow-sm">
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
      ) : (
        <p className="text-center">Aucun résultat trouvé pour "{query}".</p>
      )}
    </main>
  );
};

export default SearchPage;