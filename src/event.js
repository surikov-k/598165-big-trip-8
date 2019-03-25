import {createElement} from "./utils";
import {Points} from "./mock-data";

export default class {
  constructor(event) {
    this._type = event.type;
    this._destination = event.destination;
    this._img = event.img;
    this._offers = event.offers;
    this._description = event.description;
    this._date = event.date;
    this._schedule = {
      start: event.schedule.start,
      end: event.schedule.end
    };
    this._price = event.price;

    this._element = null;
    this._state = {
    };
    this._onEdit = null;
    this._onEventClick = this._onEventClick.bind(this);
  }

  _onEventClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${Points[this._type].icon}</i>
        <h3 class="trip-point__title">${Points[this._type].title} ${this._destination}</h3>
        <p class="trip-point__schedule">
          <span class="trip-point__timetable">${this._schedule.start}&nbsp;&mdash; ${this._schedule.end}</span>
          <span class="trip-point__duration">${this._getDuration()}</span>
        </p>
        <p class="trip-point__price">&euro;&nbsp;${this._price}</p>
        <ul class="trip-point__offers">
          ${this._renderOffers()}
        </ul>
      </article>`.trim();
  }

  _renderOffers() {
    let offersList = ``;
    for (const offer of this._offers) {
      offersList += `
        <li>
          <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
        </li>
      `;
    }
    return offersList;
  }

  _getDuration() {
    const startHours = parseInt(this._schedule.start.split(`:`)[0], 10);
    const startMinutes = parseInt(this._schedule.start.split(`:`)[1], 10);
    const endHours = parseInt(this._schedule.end.split(`:`)[0], 10);
    const endMinutes = parseInt(this._schedule.end.split(`:`)[1], 10);
    let duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    duration = duration <= 0 ? duration + 24 * 60 : duration;
    let durationHours = Math.floor(duration / 60);
    let durationMinutes = duration - durationHours * 60;
    durationHours = durationHours < 10 ? `0` + durationHours : durationHours;
    durationMinutes = durationMinutes < 10 ? `0` + durationMinutes : durationMinutes;
    return `${durationHours}H ${durationMinutes}M`;
  }

  render() {
    if (this._element) {
      this._element = null;
    }
    this._element = createElement(this.template);
    this.bind();

    return this._element;
  }

  bind() {
    this._element.addEventListener(`click`, this._onEventClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEventClick);
  }

  unrender() {
    this.unbind();
    this._element = null;
  }

}