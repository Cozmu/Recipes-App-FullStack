import React from 'react';
import { useHistory } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Profile.css';

function Profile() {
  const history = useHistory();
  const getEMail = () => {
    const usuario = localStorage.getItem('user');
    const email = JSON.parse(usuario);
    if (email === null) {
      return 'usuario@mail.com';
    }
    return email.email;
  };
  return (
    <div>
      <Header />
      <section className="container">
        <div className="profile-container">
          <CgProfile className="profile" />
          <p data-testid="profile-email">
            { getEMail() }
          </p>
          <button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.clear();
              history.push('/');
            } }
          >
            Logout
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Profile;
