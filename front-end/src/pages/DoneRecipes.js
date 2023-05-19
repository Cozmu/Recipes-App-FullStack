import { useContext } from 'react';
import Header from '../components/Header';
import SpecialRecipes from '../components/SpecialRecipes';
import RecipesAppContext from '../context/RecipesAppContext';

function DoneRecipes() {
  const { doneRecipes } = useContext(RecipesAppContext);

  return (
    <div>
      <Header />
      <SpecialRecipes
        localRecipe={ doneRecipes }
      />
    </div>
  );
}

export default DoneRecipes;
