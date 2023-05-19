const handleFilter = (receita, quantidade) => {
  const arr = [];
  for (let index = 1; index <= quantidade; index += 1) {
    if (receita[0][`strIngredient${index}`] !== ''
       && receita[0][`strIngredient${index}`] !== null) {
      if (receita[0][`strMeasure${index}`] === null) {
        arr.push(`${receita[0][`strIngredient${index}`]}`);
      } else {
        arr.push(`${receita[0][`strIngredient${index}`]} ${receita[0][`strMeasure${index}`
        ]}`);
      }
    }
  }
  return arr;
};

export default handleFilter;
