import { useContext, useEffect, useState } from 'react';
import { IoChevronBackCircleSharp } from 'react-icons/io5';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import handleFilter from '../helpers/handleFilter';
import requestRecipesFromAPI from '../services/requestRecipesFromAPI';
import '../style/DetailsRecipes.css';
import { HOST, PROTOCOL } from '../utils/makeUrl';
import InteractionBtns from './InteractionBtns';

function RecipeDrinksInProgress() {
  const history = useHistory();
  const { idDaReceita } = useParams();
  const [itsFinished, setItsFinished] = useState(false);
  const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const recipeKey = store?.drinks[idDaReceita];
  const [isChecked, setIsChecked] = useState(recipeKey || []);
  const [newFav, setNewFav] = useState({});
  const [recipePhoto, setRecipePhoto] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeAlcoholic, setRecipeAlcoholic] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredientAndMeasure, setIngredientAndMeasure] = useState([]);
  const [tags, setTags] = useState();
  const {
    inProgressRecipes,
    setInProgressRecipes,
    setDoneRecipes,
    doneRecipes,
  } = useContext(RecipesAppContext);

  useEffect(() => {
    setInProgressRecipes({
      ...inProgressRecipes,
      drinks: {
        ...inProgressRecipes.drinks,
        [idDaReceita]: isChecked,
      },
    });
    if (isChecked.length !== ingredientAndMeasure.length) {
      setItsFinished(true);
    } else {
      setItsFinished(false);
    }
  }, [isChecked]);

  const requestDetails = async () => {
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
    if (isChecked.length === filtro.length) {
      setItsFinished(false);
    } else {
      setItsFinished(true);
    }
    setIngredientAndMeasure(filtro);
    setRecipePhoto(request[0].strDrinkThumb);
    setRecipeTitle(request[0].strDrink);
    setRecipeAlcoholic(request[0].strAlcoholic);
    setInstructions(request[0].strInstructions);
    setTags(request[0].strTags);
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    requestDetails();
  }, []);

  const itsChecked = (ingrediente) => {
    if (isChecked.includes(ingrediente)) {
      return 'ingredient-step';
    }
    return '';
  };

  const finishRecipe = () => {
    const recipe = newFav;
    const today = new Date().toLocaleDateString();
    let arrTags = [];
    if (tags === null) {
      arrTags = [];
    } else {
      arrTags = tags.split(',');
    }
    if (!doneRecipes?.some((e) => e.id === recipe.id && e.type === recipe.type)) {
      setDoneRecipes([
        ...doneRecipes,
        {
          ...recipe,
          doneDate: today,
          tags: arrTags,
        },
      ]);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      <section className="recipe-photo-container">
        <NavLink
          className="back-icon"
          to={ `/drinks/${idDaReceita}` }
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
            {recipeAlcoholic}
          </h4>
        </div>
        <div className="buttons-container">
          <InteractionBtns
            idDaReceita={ idDaReceita }
            newFav={ newFav }
            dataTestid="favorite-btn"
          />
        </div>
      </section>
      <section className="ingredients-container">
        <h1>Ingredients</h1>
        <div className="ingredientes-checked">
          {ingredientAndMeasure.map((e, index) => (
            <label
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ index }
              className={ itsChecked(e) }
              key={ index }
            >
              <input
                id={ index }
                type="checkbox"
                className="checked"
                value={ e }
                onChange={ ({ target }) => {
                  if (isChecked.some((ingredient) => ingredient === target.value)) {
                    const newChecked = isChecked.filter((el) => el !== target.value);
                    setIsChecked(newChecked);
                  } else {
                    setIsChecked([...isChecked, target.value]);
                  }
                } }
                checked={ isChecked.includes(e) }
              />
              {e}
            </label>
          ))}
        </div>
      </section>
      <section className="instructions-container-in-progress">
        <h1>Intructions</h1>
        <p
          data-testid="instructions"
        >
          {instructions}
        </p>
      </section>
      <button
        data-testid="finish-recipe-btn"
        type="button"
        className="start-recipe-btn"
        disabled={ itsFinished }
        onClick={ finishRecipe }
      >
        Finalizar
      </button>
    </div>
  );
}

export default RecipeDrinksInProgress;
