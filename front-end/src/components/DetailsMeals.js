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

function DetailsMeals() {
  const [newFav, setNewFav] = useState({});
  const { inProgressRecipes,
    setInProgressRecipes, setRecipes } = useContext(RecipesAppContext);
  const history = useHistory();
  const SIX = 6;
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeCategory, setRecipeCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [video, setVideo] = useState('');
  const { idDaReceita } = useParams();

  const displayDetails = async () => {
    const TWENTY = 20;
    const request = await requestRecipesFromAPI(
      `${PROTOCOL}${HOST}/meals/${idDaReceita}`,
    );
    const result = {
      id: request[0].idMeal,
      type: 'meal',
      nationality: request[0].strArea,
      category: request[0].strCategory,
      alcoholicOrNot: '',
      name: request[0].strMeal,
      image: request[0].strMealThumb,
    };
    setNewFav(result);
    const filtro = handleFilter(request, TWENTY);
    setIngredientAndMeasure(filtro);
    setRecipePhoto(request[0].strMealThumb);
    setRecipeTitle(request[0].strMeal);
    setRecipeCategory(request[0].strCategory);
    setInstructions(request[0].strInstructions);
    const ytLink = request[0].strYoutube;
    const YT = ytLink.split('watch?v=');
    setVideo(YT);
  };

  const requestRecommendations = async () => {
    const result = await requestRecipesFromAPI(`${PROTOCOL}${HOST}/drinks`);
    setRecommendations(result);
  };

  useEffect(() => {
    displayDetails();
    requestRecommendations();
  }, []);

  const rrp = () => { // redirect to recipe in progress
    setInProgressRecipes({
      ...inProgressRecipes,
      meals: {
        ...inProgressRecipes.meals,
        [idDaReceita]: [],
      },
    });
    history.push(`/meals/${idDaReceita}/in-progress`);
  };

  const toggleInProgress = () => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { drinks: {}, meals: {} };
    const recipesID = Object.keys(storage.meals);
    return recipesID.includes(idDaReceita) ? 'Continue Recipe' : 'Start Recipe';
  };

  return (
    <div>
      <section className="recipe-photo-container">
        <NavLink
          onClick={ () => {
            setRecipes([]);
          } }
          to="/meals"
          className="back-icon"
        >
          <IoChevronBackCircleSharp />
        </NavLink>
        <img
          className="recipe-photo"
          data-testid="recipe-photo"
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
          <h4
            data-testid="recipe-category"
          >
            {recipeCategory}
          </h4>
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
      <div className="iframe-container">
        <iframe
          className="iframe"
          data-testid="video"
          src={ `${video[0]}embed/${video[1]}` }
          title={ recipeTitle }
          frameBorder="0"
          allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="recommendations">
        <h2>Recommended</h2>
        <section
          className="recommendationCard-container"
        >
          {display(SIX, recommendations)
            .map(({ strDrink, strDrinkThumb, idDrink }, index) => (
              <NavLink
                to={ `/drinks/${idDrink}` }
                className="recommendationCard"
                key={ index }
                data-testid={ `${index}-recommendation-card` }
              >
                <img src={ strDrinkThumb } alt={ strDrink } />
                <p
                  data-testid={ `${index}-recommendation-title` }
                >
                  {strDrink}
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

export default DetailsMeals;
