import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import '../style/SpecialRecipes.css';
import { LOCAL, PROTOCOL } from '../utils/makeUrl';
import InteractionBtns from './InteractionBtns';

function SpecialRecipes({ localRecipe }) {
  const [recipes, setRecipes] = useState([]);
  const [toggleShare, setToggleShare] = useState('');
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    setRecipes(localRecipe);
  }, [localRecipe]);

  const handleCopy = (elemento) => {
    const TIME = 3000;
    setToggleShare(elemento.name);
    copy(`${PROTOCOL}${LOCAL}/${
      elemento.type === 'meal' ? 'meals' : 'drinks'}/${elemento.id}`);
    setTimeout(() => {
      setToggleShare('');
    }, TIME);
  };

  const filterMeals = () => {
    const newRecipes = localRecipe.filter((e) => e.type === 'meal');
    setRecipes(newRecipes);
  };

  const filterDrinks = () => {
    const newRecipes = localRecipe.filter((e) => e.type === 'drink');
    setRecipes(newRecipes);
  };

  const allFilter = () => {
    setRecipes(localRecipe);
  };

  if (localRecipe.length === 0) {
    return (
      <div className="not-recipes-container">
        <p>
          { pathname === '/favorite-recipes' ? 'There are no favorite recipes'
            : 'There are no finished recipes' }
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="button-filters-container">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ allFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ filterMeals }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrinks }
        >
          Drinks
        </button>
      </section>
      <div className="favorites-recipes-container">
        {recipes?.map((element, index) => (
          <section
            key={ index }
            className="favorites-recipes"
          >
            <NavLink
              to={ `${element.type === 'meal' ? 'meals' : 'drinks'}/${element.id}` }
            >
              <img
                className="horizontal-image"
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.id }
              />
            </NavLink>

            <div className="information-favorites">
              <h4
                data-testid={ `${index}-horizontal-top-text` }
              >
                {element.type === 'drink'
                  ? `${element.alcoholicOrNot}`
                  : `${element.nationality} - ${element.category}`}
              </h4>
              <NavLink
                to={ `${element.type === 'meal' ? 'meals' : 'drinks'}/${element.id}` }
                className="link-special-recipes"
              >
                <h1
                  data-testid={ `${index}-horizontal-name` }
                >
                  {element.name}
                </h1>
              </NavLink>
              <h4
                data-testid={ `${index}-horizontal-done-date` }
              >
                {element.doneDate}
              </h4>
              <section className="buttons-favorites">
                <button
                  type="button"
                  className="share-button"
                  onClick={ () => handleCopy(element) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="Compartilhar"
                  />
                </button>
                <div className="favorite-recipe">
                  { pathname === '/favorite-recipes'
                && <InteractionBtns
                  idDaReceita={ element.id }
                  newFav={ element }
                  dataTestid={ `${index}-horizontal-favorite-btn` }
                />}
                </div>
              </section>
              {toggleShare === element.name && <span className="span">Link copied!</span>}

              {element?.tags
                && element?.tags.map((tagName, i) => (
                  <div
                    className="tag-name-container"
                    key={ i }
                  >
                    <p
                      data-testid={ `${index}-${tagName}-horizontal-tag` }
                    >
                      {tagName}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

SpecialRecipes.propTypes = {
  localRecipe: PropTypes.shape({
    filter: PropTypes.func,
  }),
}.isRequired;

export default SpecialRecipes;
