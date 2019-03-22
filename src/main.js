import renderFilter from "./render-filter";
import * as mock from "./mock-data";
import renderEvent from "./render-event";
import {getRandomInt} from "./utils";

const tripFilter = document.querySelector(`.trip-filter`);
tripFilter.innerHTML = ``;
const filtersFragment = document.createDocumentFragment();
mock.FILTERS.forEach((it) => {
  filtersFragment.appendChild(renderFilter(it));
});
tripFilter.appendChild(filtersFragment);

const tripDayItems = document.querySelector(`.trip-day__items`);

const renderRandomEvents = (amount) => {
  tripDayItems.innerHTML = ``;
  const tripDayItemsFragment = document.createDocumentFragment();

  for (let i = 1; i <= amount; i++) {
    const randomEvent = mock.event();
    tripDayItemsFragment.appendChild(renderEvent(randomEvent));
  }
  tripDayItems.appendChild(tripDayItemsFragment);
};

renderRandomEvents(7);

const tripFilterItems = document.querySelectorAll(`.trip-filter__item`);
tripFilterItems.forEach((it) => {
  it.addEventListener(`click`, () => {
    const randomAmount = getRandomInt(mock.EVENTS_AMOUNT.min, mock.EVENTS_AMOUNT.max);
    renderRandomEvents(randomAmount);
  });
});
