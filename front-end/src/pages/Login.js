import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import teste from '../images/DeliSemFundo.png';
import '../style/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const SIX = 6;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.email.match(emailRegex) && password.length > SIX) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const handleSubmite = () => {
    localStorage.setItem('user', JSON.stringify(email));
    history.push('/meals');
  };

  return (
    <div className="loginInitial">
      <img src={ teste } alt="logo" className="logo" />
      <div
        className="title-container"
      >
        <h1>
          DELI
        </h1>
        <h2>Recipes</h2>
      </div>
      <section
        className="inputs-container"
      >
        <label htmlFor="emailInput">
          <input
            className="inputs-login"
            data-testid="email-input"
            id="emailInput"
            type="text"
            placeholder="E-mail"
            onChange={ ({ target }) => {
              setEmail({
                email: target.value,
              });
            } }
          />
        </label>
        <label htmlFor="passwordInput">
          <input
            className="inputs-login"
            data-testid="password-input"
            id="passwordInput"
            placeholder="Password"
            type="password"
            onChange={ ({ target }) => {
              setPassword(target.value);
            } }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled }
          onClick={ handleSubmite }
          className="btnCss"
        >
          ENTER
        </button>
      </section>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
