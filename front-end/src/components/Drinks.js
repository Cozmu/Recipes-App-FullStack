import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import display from '../helpers/display';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import '../style/MealsDrinks.css';
import { HOST, PROTOCOL } from '../utils/makeUrl';

function Drinks() {
  const [firstDrinks, setFirstDrinks] = useState([]);
  const [drinksCategorys, setDrinksCategorys] = useState([]);
  const [filtersCollection, setFiltersCollection] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');
  const TWELVE = 12;
  const FIVE = 5;
  const {
    recipes,
    setRecipes,
  } = useContext(RecipesAppContext);

  const firstRecipes = async () => {
    const result = await requestRecipesFromAPI(`${PROTOCOL}${HOST}/drinks`);
    setFirstDrinks(result);
  };

  const categorys = async () => {
    const resultCategory = await requestRecipesFromAPI(
      `${PROTOCOL}${HOST}/drinks/category/list`,
    );
    setDrinksCategorys(resultCategory);
  };

  const filters = async (filterParam) => {
    setRecipes([]);
    if (filterParam === currentFilter && filtersCollection.length >= 1) {
      setFiltersCollection([]);
      setCurrentFilter('');
    } else if (filterParam === 'Cocktail') {
      const resultCocktail = await requestRecipesFromAPI(
        `${PROTOCOL}${HOST}/drinks/category/Cocktail`,
      );
      setFiltersCollection(resultCocktail);
      setCurrentFilter(filterParam);
    } else {
      const endPoint = `${PROTOCOL}${HOST}/drinks/category/${
        filterParam === 'Coffee / Tea' ? 'Coffee_Tea' : filterParam}`;
      const result = await requestRecipesFromAPI(endPoint);
      setFiltersCollection(result);
      setCurrentFilter(filterParam);
    }
  };

  useEffect(() => {
    categorys();
    firstRecipes();
  }, []);

  const rendeizacao = (filtersCollection?.length === 0
    ? display(TWELVE, firstDrinks).map(({ strDrinkThumb, strDrink, idDrink }, index) => (
      <NavLink
        to={ `/drinks/${idDrink}` }
        key={ index }
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ strDrinkThumb }
          width="250"
          alt={ strDrink }
        />
        <h3
          data-testid={ `${index}-card-name` }
        >
          {strDrink}
        </h3>
      </NavLink>
    )) : display(TWELVE, filtersCollection)
      .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
        <NavLink
          to={ `/drinks/${idDrink}` }
          key={ idDrink }
          data-testid={ `${index}-recipe-card` }
          className="recipe-card"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt={ idDrink }
            width="250"
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            {strDrink}
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
        {display(FIVE, drinksCategorys).map(({ strCategory }) => (
          <section key={ strCategory }>
            <button
              type="button"
              className={ selectedButton(strCategory) }
              onClick={ () => filters(strCategory) }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
            >
              {strCategory}
            </button>
          </section>
        ))}
      </div>

      <section className="recipes-cards-container">
        {recipes?.length > 1 ? (recipes?.length > 1
      && display(TWELVE, recipes).map(({ strDrink, strDrinkThumb, idDrink }, i) => (
        <NavLink
          to={ `/drinks/${idDrink}` }
          key={ i }
          data-testid={ `${i}-recipe-card` }
          className="recipe-card"
        >
          <img
            data-testid={ `${i}-card-img` }
            src={ strDrinkThumb }
            width="250"
            alt={ strDrink }
          />
          <h3
            data-testid={ `${i}-card-name` }
          >
            {strDrink}
          </h3>
        </NavLink>
      ))) : rendeizacao}
      </section>
    </div>
  );
}

export default Drinks;
