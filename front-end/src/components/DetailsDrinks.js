import { useContext, useEffect, useState } from 'react';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import display from '../helpers/display';
import handleFilter from '../helpers/handleFilter';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import '../style/DetailsRecipes.css';
import { HOST, PROTOCOL } from '../utils/makeUrl';
import InteractionBtns from './InteractionBtns';

function DetailsDrinks() {
  const [newFav, setNewFav] = useState({});
  const { inProgressRecipes,
    setInProgressRecipes, setRecipes } = useContext(RecipesAppContext);
  const history = useHistory();
  const SIX = 6;
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeAlcoholic, setRecipeAlcoholic] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { idDaReceita } = useParams();

  const displayDetails = async () => {
    const FIFTEEN = 15;
    const request = await requestRecipesFromAPI(
      `${PROTOCOL}${HOST}/drinks/${idDaReceita}`,
    );
    const result = {
      id: request[0].idDrink,
      type: 'drink',
      nationality: '',
      category: request[0].strCategory,
      alcoholicOrNot: request[0].strAlcoholic,
      name: request[0].strDrink,
      image: request[0].strDrinkThumb,
    };
    setNewFav(result);
    const filtro = handleFilter(request, FIFTEEN);
    setIngredientAndMeasure(filtro);
    setRecipePhoto(request[0].strDrinkThumb);
    setRecipeTitle(request[0].strDrink);
    setRecipeAlcoholic(request[0].strAlcoholic);
    setInstructions(request[0].strInstructions);
  };

  const requestRecommendations = async () => {
    const result = await requestRecipesFromAPI(`${PROTOCOL}${HOST}/meals`);
    setRecommendations(result);
  };

  useEffect(() => {
    displayDetails();
    requestRecommendations();
  }, []);

  const rrp = () => { // redirect to recipe in progress
    setInProgressRecipes({
      ...inProgressRecipes,
      drinks: {
        ...inProgressRecipes.drinks,
        [idDaReceita]: [],
      },
    });
    history.push(`/drinks/${idDaReceita}/in-progress`);
  };

  const toggleInProgress = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
     || { drinks: {}, meals: {} };
    const recipesID = Object.keys(storage.drinks);
    return recipesID.includes(idDaReceita) ? 'Continue Recipe' : 'Start Recipe';
  };

  return (
    <div>
      <section className="recipe-photo-container">
        <NavLink
          onClick={ () => {
            setRecipes([]);
          } }
          to="/drinks"
          className="back-icon"
        >
          <IoChevronBackCircleSharp />
        </NavLink>
        <img
          data-testid="recipe-photo"
          className="recipe-photo"
          src={ recipePhoto }
          alt={ idDaReceita }
        />
      </section>
      <section className="titles-and-btns-container">
        <div>
          <h1
            data-testid="recipe-title"
          >
            {recipeTitle}
          </h1>
          <h3
            data-testid="recipe-category"
          >
            {recipeAlcoholic}
          </h3>
        </div>
        <div className="buttons-container">
          <InteractionBtns
            newFav={ newFav }
            idDaReceita={ idDaReceita }
            dataTestid="favorite-btn"
          />
        </div>
      </section>
      <section className="ingredients-container">
        <h1>Ingredients</h1>
        <ul>
          {ingredientAndMeasure.map((e, i) => (
            <li
              data-testid={ `${i}-ingredient-name-and-measure` }
              key={ i }
            >
              {e}
            </li>
          ))}
        </ul>
      </section>
      <section className="instructions-container">
        <h1>Intructions</h1>
        <p
          data-testid="instructions"
        >
          {instructions}

        </p>
      </section>
      <div className="recommendations">
        <h2>Recommended</h2>
        <section
          className="recommendationCard-container"
        >
          {display(SIX, recommendations)
            .map(({ strMeal, strMealThumb, idMeal }, index) => (
              <NavLink
                to={ `/meals/${idMeal}` }
                className="recommendationCard"
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <img src={ strMealThumb } alt={ strMeal } />
                <p
                  data-testid={ `${index}-recommendation-title` }
                >
                  {strMeal}
                </p>
              </NavLink>
            ))}
        </section>
      </div>
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ rrp } // redirect to recipe in progress
      >
        { toggleInProgress() }
      </button>
    </div>
  );
}

export default DetailsDrinks;
