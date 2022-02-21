function randomInt(min, max) {
  if ((min > max) || (min < 0)) {
    return 0;
  }
  return Math.round(min + Math.random() * (max - min));
}

function randomFloat(min, max, floor) {
  if ((min > max) || (min < 0)) {
    return 0;
  }
  return (min + Math.random() * (max - min)).toFixed(floor);
}


console.log(randomInt(0, 5));
console.log(randomFloat(0, 5, 3));
