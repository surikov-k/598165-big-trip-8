import {
  Points
} from "./mock-data";
import {
  Component
} from "./componenet";


export default class extends Component {
  constructor(event) {
    super();
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

    this._state.isFavorite = false;

    this._onEdit = null;
    this._onEventClick = this._onEventClick.bind(this);
  }

  _onEventClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    return `
      <article class="trip-point">
        <i class="trip-icon">${Points[this._type.toUpperCase()].icon}</i>
        <h3 class="trip-point__title">${Points[this._type.toUpperCase()].title} ${this._destination}</h3>
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
    for (const offer of Object.entries(this._offers)) {
      if (offer[1].isSelected) {
        offersList += `
          <li>
            <button class="trip-point__offer">${offer[1].title} +&euro;&nbsp;${offer[1].price}</button>
          </li>
        `;
      }
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

  bind() {
    this._element.addEventListener(`click`, this._onEventClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEventClick);
  }

  update(data) {
    this._type = data.type;
    this._destination = data.destination;
    this._price = data.price;
    this._state.isFavorite = data.state.isFavorite;
    this._schedule.start = data.schedule.start;
    this._offers = data.offers;
  }

}
