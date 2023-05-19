import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipesAppProvider from '../context/RecipesAppProvider';
import renderWithRouter from '../renderWithRouterAndRedux';
import Profile from '../pages/Profile';

describe('Testando o Profile', () => {
  test('1-Testa o botão de Done Recipes', () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <Profile />
      </RecipesAppProvider>,
    );
    const done = screen.getByTestId('profile-done-btn');
    userEvent.click(done);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('2-Testa o botão de Favorite Recipes', () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <Profile />
      </RecipesAppProvider>,
    );
    const favorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favorite);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('3-Testa o botão de Logout', () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <Profile />
      </RecipesAppProvider>,
    );
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
  });
});
