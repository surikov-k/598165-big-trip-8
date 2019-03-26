import {Points, cities} from "./mock-data";
import {Component} from "./componenet";

export default class extends Component {
  constructor(event) {
    super();
    this._type = event.type;
    this._icon = event.icon;
    this._destination = event.destination;
    this._title = event.title;
    this._img = event.img;
    this._offers = event.offers;
    this._description = event.description;
    this._date = event.date;
    this._schedule = {
      start: event.schedule.start,
      end: event.schedule.end
    };
    this._price = event.price;

    this._onSubmit = null;
    this._onReset = null;
    this._onSubmitButtonClick = this._onSubmitButtonClick.bind(this);
    this._onFormReset = this._onFormReset.bind(this);
  }

  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    if (typeof this._onSubmit === `function`) {
      this._onSubmit();
    }
  }

  _onFormReset() {
    if (typeof this._onReset === `function`) {
      this._onReset();
    }
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onReset(fn) {
    this._onReset = fn;
  }

  _getDestinations() {
    return cities.reduce((template, city) => {
      template += `<option value="${city}"></option>`;
      return template;
    }, ``);
  }

  _getOffers() {
    return this._offers.reduce((template, offer) => {
      const id = offer.title.split(` `).join(`-`);
      return template + `
      <input class="point__offers-input visually-hidden" type="checkbox" id="${id}" name="offer" value="add-luggage">
      <label for="${id}" class="point__offers-label">
        <span class="point__offer-service">${offer.title}</span> + €<span class="point__offer-price">${offer.price}</span>
      </label>`;
    }, ``);
  }

  _getImages() {
    return this._img.reduce((template, img) => {
      return template + `<img src="` + img + `" alt="picture from place" class="point__destination-image">`;
    }, ``);
  }

  get template() {
    return `
      <article class="point">
        <form action="#" method="get">
          <header class="point__header">
            <label class="point__date">
              choose day
              <input class="point__input" type="text" placeholder="MAR 18" name="day">
            </label>

            <div class="travel-way">
              <label class="travel-way__label" for="travel-way__toggle">${Points[this._type].icon}</label>

              <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">

              <div class="travel-way__select">
                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                  <label class="travel-way__select-label" for="travel-way-taxi">🚕 taxi</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-bus" name="travel-way" value="bus">
                  <label class="travel-way__select-label" for="travel-way-bus">🚌 bus</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-train" name="travel-way" value="train">
                  <label class="travel-way__select-label" for="travel-way-train">🚂 train</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-flight" name="travel-way" value="train" checked>
                  <label class="travel-way__select-label" for="travel-way-flight">✈️ flight</label>
                </div>

                <div class="travel-way__select-group">
                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-check-in" name="travel-way" value="check-in">
                  <label class="travel-way__select-label" for="travel-way-check-in">🏨 check-in</label>

                  <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-sightseeing" name="travel-way" value="sight-seeing">
                  <label class="travel-way__select-label" for="travel-way-sightseeing">🏛 sightseeing</label>
                </div>
              </div>
            </div>

            <div class="point__destination-wrap">
              <label class="point__destination-label" for="destination">${Points[this._type].title}</label>
              <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination}" name="destination">
              <datalist id="destination-select">
                ${this._getDestinations()}
              </datalist>
            </div>

            <label class="point__time">
              choose time
              <input class="point__input" type="text" value="${this._schedule.start} — ${this._schedule.end}" name="time" placeholder="${this._schedule.start} — ${this._schedule.end}">
            </label>

            <label class="point__price">
              write price
              <span class="point__price-currency">€</span>
              <input class="point__input" type="text" value="${this._price}" name="price">
            </label>

            <div class="point__buttons">
              <button class="point__button point__button--save" type="submit">Save</button>
              <button class="point__button" type="reset">Delete</button>
            </div>

            <div class="paint__favorite-wrap">
              <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
              <label class="point__favorite" for="favorite">favorite</label>
            </div>
          </header>

          <section class="point__details">
            <section class="point__offers">
              <h3 class="point__details-title">offers</h3>

              <div class="point__offers-wrap">
                ${this._getOffers()}
              </div>

            </section>
            <section class="point__destination">
              <h3 class="point__details-title">Destination</h3>
              <p class="point__destination-text">${this._description}</p>
              <div class="point__destination-images">
                ${this._getImages()}
              </div>
            </section>
            <input type="hidden" class="point__total-price" name="total-price" value="">
          </section>
        </form>
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

  bind() {
    this._element.querySelector(`.point__button--save`).addEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`form`).addEventListener(`reset`, this._onFormReset);
  }

  unbind() {
    this._element.querySelector(`.point__button--save`).removeEventListener(`submit`, this._onSubmitButtonClick);
    this._element.querySelector(`form`).removeEventListener(`reset`, this._onFormReset);
  }
}
