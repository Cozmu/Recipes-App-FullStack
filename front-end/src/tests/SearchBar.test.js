import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipesAppProvider from '../context/RecipesAppProvider';
import renderWithRouter from '../renderWithRouterAndRedux';
import oneMeal from '../../cypress/mocks/oneMeal';
import drinks from '../../cypress/mocks/drinks';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const searchBtn = 'exec-search-btn';
const nameSearchRadio = 'name-search-radio';
const firstLetter = 'first-letter-search-radio';
const ingredient = 'ingredient-search-radio';
const rf = 'recipe-photo';
const rt = 'recipe-title';

describe('Testa o componente SearchBar em Meal', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  test('1-Testa a pesquisa pelo nome de um prato', async () => {
    jest.setTimeout(30000);
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
    const search = screen.getByTestId(searchInput);
    await waitFor(() => expect(search).toBeInTheDocument());

    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    userEvent.type(searchInp, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/meals/52771');
    });
    const img = await screen.findByTestId(rf);
    const title = await screen.findByTestId(rt);

    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  test('2-Testa a pesquisa por 1a letra', async () => {
    jest.setTimeout(30000);
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const letter = screen.getByTestId(firstLetter);
    userEvent.type(searchInp, 's');
    userEvent.click(letter);
    userEvent.click(searchButton);
    const firsItemName = screen.getByTestId('0-card-name');
    expect(firsItemName).toBeInTheDocument();
  });
});
describe('Testa o componente SearchBar em Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    });
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('3-Testa a pesquisa pelo nome de uma bebida', async () => {
    jest.setTimeout(30000);
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const ingredients = screen.getByTestId(ingredient);
    userEvent.type(searchInp, 'GG');
    userEvent.click(ingredients);
    userEvent.click(searchButton);
    const nome = screen.findByText('GG');
    await waitFor(() => {
      expect(nome).toBeInTheDocument();
    });
    const img = await screen.findByTestId(rf);
    const title = await screen.findByTestId(rt);

    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
  test('4-Testa a pesquisa por 1a letra', async () => {
    jest.setTimeout(30000);
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const letter = screen.getByTestId(firstLetter);
    userEvent.type(searchInp, 's');
    userEvent.click(letter);
    userEvent.click(searchButton);
    const firsItemName = screen.getByTestId('0-card-name');
    expect(firsItemName).toBeInTheDocument();
  });
  test('5-Muda para a rota de detalhes quando a API só retorna um resultado', async () => {
    jest.setTimeout(30000);
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    userEvent.type(searchInp, 'Skirt');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/11433');
    });
  });
  test('6-Testa a pesquisa pelo nome de um ingrediente', async () => {
    jest.setTimeout(30000);
    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const ingredients = screen.getByTestId(ingredient);
    userEvent.type(searchInp, 'Galliano');
    userEvent.click(ingredients);
    userEvent.click(searchButton);
    const nome = screen.findByText('GG');
    await waitFor(() => {
      expect(nome).toBeInTheDocument();
    });
    const img = await screen.findByTestId(rf);
    const title = await screen.findByTestId(rt);
    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});

describe('Testa o alerta no componente SearchBar, em Meals', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: null,
      }),
    });
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('7-Testa se aparece o alerta ao digitar mais de 1 letra, ao selecionar o radio first letter, em Meals', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const letter = screen.getByTestId(firstLetter);
    userEvent.type(searchInp, 'angela');
    userEvent.click(letter);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalled();
  });
  test('8-Testa se aparece o alerta ao procurar por uma receita nao existente, em Meals', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const ingredients = screen.getByTestId(ingredient);
    userEvent.type(searchInp, 'angela');
    userEvent.click(ingredients);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalled();
  });
});
describe('Testa o alerta no componente SearchBar, em Drinks', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        drinks: null,
      }),
    });
  });
  afterEach(() => {
    global.fetch.mockClear();
  });

  test('9-Testa se aparece o alerta ao digitar mais de 1 letra, ao selecionar o radio first letter, em Drinks', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const letter = screen.getByTestId(firstLetter);
    userEvent.type(searchInp, 'angela');
    userEvent.click(letter);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalled();
  });
  test('10-Testa se aparece o alerta ao procurar por uma receita nao existente, em Drinks', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { history } = renderWithRouter(
      <RecipesAppProvider>
        <App />
      </RecipesAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });
    const searchIcon = screen.getByTestId(searchTopBtn);
    userEvent.click(searchIcon);
    const searchInp = screen.getByTestId(searchInput);
    const searchButton = screen.getByTestId(searchBtn);
    const ingredients = screen.getByTestId(ingredient);
    userEvent.type(searchInp, 'angela');
    userEvent.click(ingredients);
    userEvent.click(searchButton);
    expect(global.alert).toBeCalled();
  });
});
