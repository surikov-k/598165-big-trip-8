import renderFilter from "./render-filter";
import * as mock from "./mock-data";
import renderEvent from "./render-event";

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
    const randomEvent = Math.floor(Math.random() * mock.EVENTS.length);
    tripDayItemsFragment.appendChild(renderEvent(mock.EVENTS[randomEvent]));
  }
  tripDayItems.appendChild(tripDayItemsFragment);
};

renderRandomEvents(7);

const tripFilterItems = document.querySelectorAll(`.trip-filter__item`);
tripFilterItems.forEach((it) => {
  it.addEventListener(`click`, () => {
    const randomAmount = Math.floor(Math.random() * (mock.EVENTS_AMOUNT.max - mock.EVENTS_AMOUNT.min + 1) + mock.EVENTS_AMOUNT.min);
    renderRandomEvents(randomAmount);
  });
});
