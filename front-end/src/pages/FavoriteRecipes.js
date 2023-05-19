import { useContext } from 'react';
import Header from '../components/Header';
import SpecialRecipes from '../components/SpecialRecipes';
import RecipesAppContext from '../context/RecipesAppContext';

function FavoriteRecipes() {
  const { favorites } = useContext(RecipesAppContext);

  return (
    <div>
      <Header />
      <SpecialRecipes
        localRecipe={ favorites }
      />
    </div>
  );
}

export default FavoriteRecipes;
