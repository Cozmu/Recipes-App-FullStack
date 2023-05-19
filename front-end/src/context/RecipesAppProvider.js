import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const storeFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const store = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const storeDone = JSON.parse(localStorage.getItem('doneRecipes'));
  const [isFavorite, setIsFavorite] = useState('');
  const [favorites, setFavorites] = useState(storeFav || []);
  const [btnSearch, setBtnSearch] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [inProgressRecipes,
    setInProgressRecipes] = useState(store || { drinks: {}, meals: {} });
  const [doneRecipes, setDoneRecipes] = useState(storeDone || []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }, [doneRecipes]);

  const values = useMemo(() => ({
    setInProgressRecipes,
    inProgressRecipes,
    btnSearch,
    setBtnSearch,
    recipes,
    setRecipes,
    setFavorites,
    favorites,
    isFavorite,
    setIsFavorite,
    setDoneRecipes,
    doneRecipes,
  }), [
    isFavorite,
    favorites,
    inProgressRecipes,
    btnSearch,
    recipes,
    doneRecipes,
  ]);

  return (
    <RecipesAppContext.Provider value={ values }>
      {children}
    </RecipesAppContext.Provider>
  );
}

RecipesAppProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default RecipesAppProvider;
