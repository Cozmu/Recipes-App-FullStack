import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';

describe('Testes da tela de login', () => {
  test('Testa se ha dois inputs, e se o botao esta desativado', () => {
    renderWithRouterAndRedux(<App />);

    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    // https://amitd.co/code/testing/spying-on-localstorage-in-jest

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();

    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(emailInput, 'joao@hotmail.com');
    expect(btnLogin).toBeDisabled();

    userEvent.type(passwordInput, '1234567');
    expect(btnLogin).toBeEnabled();

    userEvent.click(btnLogin);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
});
