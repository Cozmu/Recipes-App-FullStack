import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/drinks/:idDaReceita/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/meals/:idDaReceita/in-progress"
        component={ RecipeInProgress }
      />
      <Route exact path="/meals/:idDaReceita" component={ RecipeDetails } />
      <Route exact path="/drinks/:idDaReceita" component={ RecipeDetails } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
