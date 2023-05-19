import { useHistory } from 'react-router-dom';
import DetailsDrinks from '../components/DetailsDrinks';
import DetailsMeals from '../components/DetailsMeals';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;

  return (
    <div>{ pathname.includes('/meals') ? <DetailsMeals /> : <DetailsDrinks /> }</div>
  );
}

export default RecipeDetails;
