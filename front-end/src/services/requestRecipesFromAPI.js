const requestRecipesFromAPI = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks ? data.drinks : data.meals || [];
  } catch (error) {
    console.log(error);
  }
};

export default requestRecipesFromAPI;
