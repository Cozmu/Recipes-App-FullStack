const display = (quantidade, array) => {
  const arr = [];
  for (let index = 0; index < quantidade; index += 1) {
    if (array[index]) {
      arr.push(array[index]);
    }
  }
  return arr;
};

export default display;
