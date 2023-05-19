import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipesAppProvider from '../context/RecipesAppProvider';
import { renderWithRouter } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  const searchTopBtn = 'search-top-btn';
  test('1-Testa o Header Geral', async () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/meals');
    });

    const searchbtn = screen.getByTestId(searchTopBtn);
    userEvent.click(searchbtn);
    const searchInput = screen.getByTestId('search-input');
    await waitFor(() => expect(searchInput).toBeInTheDocument());
  });

  test('2-Testa o Header no Done Recipes', async () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const searchbtn = screen.getByTestId(searchTopBtn);
    expect(searchbtn).not.toBeInTheDocument();
  });

  test('3-Testa o Header no Favorite Recipes', async () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/favorite-recipes');
    });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });

  test('4-Testa o Search do Drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchbtn = screen.getByTestId(searchTopBtn);
    expect(searchbtn).toBeInTheDocument();
  });
});
