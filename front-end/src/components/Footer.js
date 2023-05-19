import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiDrink } from 'react-icons/bi';
import { GiMeal } from 'react-icons/gi';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../style/Footer.css';
import RecipesAppContext from '../context/RecipesAppContext';

function Footer() {
  const { setRecipes } = useContext(RecipesAppContext);
  const history = useHistory();
  const btnDrinks = () => {
    history.push('/drinks');
    setRecipes([]);
  };
  const btnMeals = () => {
    history.push('/meals');
    setRecipes([]);
  };

  return (
    <footer className="footer" data-testid="footer">
      <button
        data-testid="drinks-bottom-btn"
        className="bottom-btn"
        type="button"
        onClick={ btnDrinks }
        src={ drinkIcon }
      >
        <BiDrink className="bottom-icon" />
      </button>
      <button
        data-testid="meals-bottom-btn"
        className="bottom-btn"
        type="button"
        onClick={ btnMeals }
        src={ mealIcon }
      >
        <GiMeal className="bottom-icon" />
      </button>
    </footer>
  );
}

export default Footer;
