import {
  getRandomFromArray,
  getRandomInt,
  shuffle
} from "./utils";
import moment from "moment";

export const FILTERS = [`Everthing`, `Future`, `Past`];

export const EVENTS_AMOUNT = {
  min: 3,
  max: 5
};

export const Points = {
  'TAXI': {
    icon: `🚕`,
    title: `Taxi to`
  },
  'BUS': {
    icon: `🚌`,
    title: `Bus to`
  },
  'TRAIN': {
    icon: `🚂`,
    title: `Train to`
  },
  'SHIP': {
    icon: `🛳`,
    title: `Ship to`
  },
  'TRANSPORT': {
    icon: `🚊`,
    title: `Transportaion to`
  },
  'DRIVE': {
    icon: `🚗`,
    title: `Drive to`
  },
  'FLIGHT': {
    icon: `✈️`,
    title: `Flight to`
  },
  'CHECK-IN': {
    icon: `🏨`,
    title: `Check into a hotel in  `
  },
  'SIGHTSEEING': {
    icon: `🏛`,
    title: `Sightseeing in`
  },
  'RESTAURANT': {
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

export const cities = [
  `Amsterdam`,
  `Geneva`,
  `Chamonix`
];

const getType = () => {
  return getRandomFromArray(Object.keys(Points));
};

const getOffers = () => {
  const offersLimit = getRandomInt(0, 2);
  const randomOffers = shuffle(offers);
  const newOffers = {};
  for (let i = 0; i <= offersLimit; i++) {
    const offerKey = randomOffers[i].toLowerCase().split(` `).join(`-`);
    newOffers[offerKey] = {};
    newOffers[offerKey][`title`] = randomOffers[i];
    newOffers[offerKey][`price`] = getRandomInt(20, 200);
    newOffers[offerKey][`isSelected`] = false;

  }
  return newOffers;
};

const getDiscription = (string) => {
  const centenseQty = getRandomInt(1, 3);
  const centenseArray = shuffle(string.split(`. `));
  return centenseArray.slice(0, centenseQty).join(`. `);
};

const getRandomTime = () => {
  const date = new Date();
  date.setHours(getRandomInt(0, 23), getRandomInt(0, 59));
  return moment(date.getTime()).format(`HH: mm`);
};

const getImages = () => {
  const MAX = 5;
  const images = [];
  for (let i = 0; i <= MAX - 1; i++) {
    images.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return images;

};

export const event = () => {
  const type = getType();
  const destination = getRandomFromArray(cities);
  return {
    destination,
    type,
    img: getImages(),
    offers: getOffers(),
    description: getDiscription(descriptionString),
    date: new Date(),
    schedule: {
      start: getRandomTime(),
      end: getRandomTime()
    },
    price: getRandomInt(10, 50),
    state: {
      isFavorite: false
    }
  };
};
