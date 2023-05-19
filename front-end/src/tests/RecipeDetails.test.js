import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinks from '../../cypress/mocks/drinks';
import meals from '../../cypress/mocks/meals';

const startBtn = 'start-recipe-btn';
const arrabiata = '/meals/52771';

describe('Testa página RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async (endpoint) => ({
      json: jest.fn()
        .mockImplementation(async () => (endpoint === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771' ? oneMeal : drinks)),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('1-Ao clicar em uma receita, vá para a página dela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(arrabiata);
    });
    expect(history.location.pathname).toEqual(arrabiata);
    const recipeTitle = screen.getByTestId('recipe-title');
    const favBtn = screen.getByTestId('favorite-btn');
    const compart = screen.getByTestId('share-btn');
    const nameArrabiata = await screen.findByRole('heading', {
      name: /Spicy Arrabiata Penne/i,
    });
    expect(nameArrabiata).toBeInTheDocument();
    expect(compart).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    userEvent.click(favBtn);
    const btnStartRecipe = await screen.findByTestId(startBtn);
    expect(btnStartRecipe).toBeInTheDocument();
  });
});

describe('Testa página RecipeDetails', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(async (endpoint) => ({
      json: jest.fn()
        .mockImplementation(async () => (endpoint === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319' ? oneDrink : meals)),
    }));
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('2-Se aparece categoria de bebida alcoolica e start', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/178319');
    });
    expect(history.location.pathname).toEqual('drinks/178319');
    const cathegory = await screen.findByTestId('recipe-category');
    const btnStartRecipe = await screen.findByTestId(startBtn);
    const favBtn = screen.getByTestId('favorite-btn');
    expect(btnStartRecipe).toBeInTheDocument();
    expect(cathegory).toBeInTheDocument();
    userEvent.click(favBtn);
    userEvent.click(favBtn);
    userEvent.click(btnStartRecipe);
  });
});
