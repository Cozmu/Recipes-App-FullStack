import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeDrinksInProgress from '../components/RecipeDrinksInProgress';
import RecipeMealsInProgress from '../components/RecipeMealsInProgress';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <div>
      {pathname.includes('/meals')
        ? <RecipeMealsInProgress /> : <RecipeDrinksInProgress />}
    </div>
  );
}

export default RecipeInProgress;
