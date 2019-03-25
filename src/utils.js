export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomFromArray = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

export const shuffle = (arrayOriginal) => {
  const array = arrayOriginal.slice();
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const formatTime = (hours, minutes) => {
  hours = hours < 10 ? `0` + hours : hours;
  minutes = minutes < 10 ? `0` + minutes : minutes;
  return `${hours}:${minutes}`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
