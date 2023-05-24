import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import RecipesAppContext from '../context/RecipesAppContext';
import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/InteractionBtns.css';

function InteractionBtns({ idDaReceita, newFav, dataTestid }) {
  const [toggleShare, setToggleShare] = useState(false);
  const { isFavorite, setIsFavorite,
    favorites, setFavorites } = useContext(RecipesAppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    const storeFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storeFav?.some((e) => Number(e.id) === Number(idDaReceita))) {
      setIsFavorite(<RiHeartFill className="filled-heart-icon" />);
    } else {
      setIsFavorite(<RiHeartLine className="empty-heart-icon" />);
    }
  }, []);

  useEffect(() => {
    if (favorites?.some((e) => Number(e.id) === Number(idDaReceita))) {
      setIsFavorite(<RiHeartFill className="filled-heart-icon" />);
    } else {
      if (pathname === '/favorite-recipes'
       && favorites.length >= 1 && favorites?.some((e) => Number(e.id) !== Number(idDaReceita))) {
        return setIsFavorite(<RiHeartFill className="filled-heart-icon" />);
      }
      setIsFavorite(<RiHeartLine className="empty-heart-icon" />);
    }
  }, [favorites]);

  const toggleFavorite = () => {
    if (favorites.some((e) => e.id === newFav.id)) {
      const deteleFav = favorites.filter((e) => e.id !== newFav.id);
      setFavorites(deteleFav);
    } else {
      setFavorites([...favorites, newFav]);
    }
  };

  return (
    <section className="interaction-btns-container">
      <button
        type="button"
        className="interaction-btns"
        onClick={ () => toggleFavorite() }
      >
        <img
          data-testid={ dataTestid }
          className="favorite-icon"
          src={ isFavorite }
          alt="Favorite"
        />
        {isFavorite}
      </button>
      {pathname !== '/favorite-recipes'
       && (
         <button
           type="button"
           data-testid="share-btn"
           className="interaction-share-btn"
           onClick={ () => {
             const TIME = 3000;
             setToggleShare(true);
             copy(`http://localhost:3000/${pathname.includes('meals') ? 'meals' : 'drinks'}/${idDaReceita}`);
             setTimeout(() => {
               setToggleShare(false);
             }, TIME);
           } }
         >
           <img src={ shareIcon } alt="Compartilhar" />
         </button>)}
      {toggleShare && <span>Link copied!</span>}

    </section>
  );
}

InteractionBtns.propTypes = {
  idDaReceita: PropTypes.any,
  newFav: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
}.isRequired;

export default InteractionBtns;
