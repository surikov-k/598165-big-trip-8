import {getRandomFromArray, getRandomInt, shuffle, formatTime} from "./utils";

export const FILTERS = [`Everthing`, `Future`, `Past`];

export const EVENTS_AMOUNT = {
  min: 3,
  max: 5
};

const points = {
  taxi: {
    icon: `🚕`,
    title: `Taxi to`
  },
  bus: {
    icon: `🚌`,
    title: `Bus to`
  },
  train: {
    icon: `🚂`,
    title: `Train to`
  },
  ship: {
    icon: `🛳`,
    title: `Ship to`
  },
  transport: {
    icon: `🚊`,
    title: `Transportaion to`
  },
  drive: {
    icon: `🚗`,
    title: `Drive to`
  },
  flight: {
    icon: `✈`,
    title: `Flight to`
  },
  checkIn: {
    icon: `🏨`,
    title: `Check into a hotel in  `
  },
  sightseeing: {
    icon: `🏛`,
    title: `Sightseeing in`
  },
  restaurant: {
    icon: `🍴`,
    title: `Dinner at a restaurant in`
  }
};

const offers = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`
];

const descriptionString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`
];

const getType = () => {
  return getRandomFromArray(Object.keys(points));
};

const getOffers = () => {
  const offersQty = getRandomInt(0, 2);
  const randomOffers = shuffle(offers);
  const newOffers = [];
  for (let i = 0; i <= offersQty; i++) {
    const newOffer = {};
    newOffer[`title`] = randomOffers[i];
    newOffer[`price`] = getRandomInt(20, 200);
    newOffers.push(newOffer);
  }
  return newOffers;
};

const getDiscription = (string) => {
  const centenseQty = getRandomInt(1, 3);
  const centenseArray = shuffle(string.split(`. `));
  return centenseArray.slice(0, centenseQty).join(`. `);
};

const getRandomTime = () => {
  return formatTime(getRandomInt(0, 23), getRandomInt(0, 59));
};

export const event = () => {
  const type = getType();
  return {
    type,
    icon: points[type][`icon`],
    title: `${points[type][`title`]} ${getRandomFromArray(cities)}`,
    img: `http://picsum.photos/300/150?r=${Math.random()}`,
    offers: getOffers(),
    description: getDiscription(descriptionString),
    date: ``,
    schedule: {
      start: getRandomTime(),
      end: getRandomTime()
    },
    price: getRandomInt(20, 50)
  };
};


