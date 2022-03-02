const getRandomInt = (min, max) => {
  const lower = Math.abs(min);
  const upper = Math.abs(max);

  if (lower > upper) {
    return 0;
  }
  return Math.round(lower + Math.random() * (upper - lower));
};

const getRandomFloat = (min, max, floor) => {
  const lower = Math.abs(min);
  const upper = Math.abs(max);
  if (lower > upper) {
    return 0;
  }
  return (lower + Math.random() * (upper - lower)).toFixed(floor);
};

export {getRandomInt, getRandomFloat};
