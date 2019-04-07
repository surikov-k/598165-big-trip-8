import renderFilter from "./render-filter";
import * as mock from "./mock-data";
import {
  getRandomInt
} from "./utils";
import Event from "./event";
import EventEdit from "./event-edit";

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
    const event = mock.event();
    const eventComponent = new Event(event);
    const eventEditComponent = new EventEdit(event);
    tripDayItemsFragment.appendChild(eventComponent.render());
    eventComponent.onEdit = () => {
      eventEditComponent.render();
      tripDayItems.replaceChild(eventEditComponent.element, eventComponent.element);
      eventComponent.unrender();
    };

    eventEditComponent.onSubmit = (newObject) => {

      event.type = newObject.type;
      event.destination = newObject.destination;
      event.price = newObject.price;
      event.state.isFavorite = newObject.state.isFavorite;
      event.schedule.start = newObject.schedule.start;
      event.offers = newObject.offers;

      eventComponent.update(event);
      eventComponent.render();
      tripDayItems.replaceChild(eventComponent.element, eventEditComponent.element);
      eventEditComponent.unrender();
    };

    eventEditComponent.onReset = () => {
      eventComponent.render();
      tripDayItems.replaceChild(eventComponent.element, eventEditComponent.element);
      eventEditComponent.unrender();
    };
  }
  tripDayItems.appendChild(tripDayItemsFragment);
};

renderRandomEvents(7);

const tripFilterItems = document.querySelectorAll(`.trip-filter__item`);
tripFilterItems.forEach((it) => {
  it.addEventListener(`click`, () => {
    const randomAmount = getRandomInt(
        mock.EVENTS_AMOUNT.min,
        mock.EVENTS_AMOUNT.max
    );
    renderRandomEvents(randomAmount);
  });
});
