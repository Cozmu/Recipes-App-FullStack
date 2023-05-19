import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import { TbListSearch } from 'react-icons/tb';
import { CgProfile } from 'react-icons/cg';
import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';
import '../style/Header.css';

function Header() {
  const { btnSearch, setBtnSearch } = useContext(RecipesAppContext);
  const history = useHistory();
  const { location: { pathname } } = history;

  const titles = () => {
    switch (pathname) {
    case '/meals':
      return 'Food Menu';
    case '/drinks':
      return 'Drinks Menu';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default: return '';
    }
  };

  const searchIconToggle = () => {
    const link = (
      <button
        className="btn-search"
        type="button"
        onClick={ () => {
          setBtnSearch(!btnSearch);
        } }
      >
        <TbListSearch className="search-icon" />
      </button>
    );
    switch (pathname) {
    case '/meals':
      return link;
    case '/drinks':
      return link;
    default: return '';
    }
  };

  return (
    <header className="header-container">
      <NavLink
        className="btn-profile"
        to="/profile"
        activeClassName="active"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        <CgProfile className="profile-icon" />
      </NavLink>
      <h1
        data-testid="page-title"
      >
        {titles()}
      </h1>
      {searchIconToggle()}
    </header>
  );
}

Header.propTypes = {
  NavLink: PropTypes.any,
}.isRequired;

export default Header;
