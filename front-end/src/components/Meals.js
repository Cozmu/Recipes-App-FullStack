import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import display from '../helpers/display';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import '../style/MealsDrinks.css';
import { HOST, PROTOCOL } from '../utils/makeUrl';

function Meals() {
  const [firstMeals, setFirstMeals] = useState([]);
  const [mealsCategorys, setMealsCategorys] = useState([]);
  const [filtersCollection, setFiltersCollection] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const TWELVE = 12;
  const FIVE = 5;
  const {
    recipes,
    setRecipes,
  } = useContext(RecipesAppContext);

  const firstRecipes = async () => {
    const result = await requestRecipesFromAPI(`${PROTOCOL}${HOST}/meals`);
    setFirstMeals(result);
  };

  const categorys = async () => {
    const resultCategory = await requestRecipesFromAPI(
      `${PROTOCOL}${HOST}/meals/category/list`,
    );
    setMealsCategorys(resultCategory);
  };

  const filters = async (filterParam) => {
    setRecipes([]);
    if (filterParam === currentFilter && filtersCollection.length >= 1) {
      setFiltersCollection([]);
      setCurrentFilter('');
    } else if (filterParam === 'Beef') {
      const resultBeef = await requestRecipesFromAPI(
        `${PROTOCOL}${HOST}/meals/category/Beef`,
      );
      setFiltersCollection(resultBeef);
      setCurrentFilter(filterParam);
    } else {
      const endPoint = `${PROTOCOL}${HOST}/meals/category/${filterParam}`;
      const result = await requestRecipesFromAPI(endPoint);
      setFiltersCollection(result);
      setCurrentFilter(filterParam);
    }
  };

  useEffect(() => {
    categorys();
    firstRecipes();
  }, []);

  const rendeizacao = (filtersCollection.length === 0
    ? display(TWELVE, firstMeals).map(({ strMealThumb, strMeal, idMeal }, index) => (
      <NavLink
        to={ `/meals/${idMeal}` }
        key={ index }
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb }
          alt={ strMeal }
        />
        <h3
          data-testid={ `${index}-card-name` }
        >
          {strMeal}
        </h3>
      </NavLink>
    )) : display(TWELVE, filtersCollection)
      .map(({ strMeal, strMealThumb, idMeal }, index) => (
        <NavLink
          to={ `/meals/${idMeal}` }
          key={ idMeal }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ idMeal }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            {strMeal}
          </h3>
        </NavLink>
      )));

  const selectedButton = (butaoAtual) => {
    if (butaoAtual === currentFilter) {
      return 'filter-btn-active filter-btn';
    }
    return 'filter-btn';
  };

  return (
    <div>
      <div className="filter-container">
        <button
          onClick={ () => {
            setRecipes([]);
            setFiltersCollection([]);
            setCurrentFilter('');
          } }
          data-testid="All-category-filter"
          type="button"
          className={ selectedButton('') }
        >
          All
        </button>
        {display(FIVE, mealsCategorys).map(({ strCategory }) => (
          <section key={ strCategory }>
            <button
              type="button"
              className={ selectedButton(strCategory) }
              onClick={ () => filters(strCategory) }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>
          </section>
        ))}
      </div>
      <section className="recipes-cards-container">
        {recipes?.length > 1
          ? display(TWELVE, recipes).map(({ strMeal, strMealThumb, idMeal }, i) => (
            <NavLink
              to={ `/meals/${idMeal}` }
              key={ i }
              data-testid={ `${i}-recipe-card` }
              className="recipe-card"
            >
              <img
                data-testid={ `${i}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <h3
                data-testid={ `${i}-card-name` }
              >
                {strMeal}
              </h3>
            </NavLink>
          ))
          : rendeizacao}
      </section>
    </div>
  );
}

export default Meals;
