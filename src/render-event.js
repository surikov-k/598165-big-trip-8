export default (event) => {
  const templateText = `
  <article class="trip-point">
    <i class="trip-icon">${event.icon}</i>
    <h3 class="trip-point__title">${event.title}</h3>
    <p class="trip-point__schedule">
      <span class="trip-point__timetable">${event.schedule.start}&nbsp;&mdash; ${event.schedule.end}</span>
      <span class="trip-point__duration">${getDuration(event.schedule)}</span>
    </p>
    <p class="trip-point__price">&euro;&nbsp;${event.price}</p>
    <ul class="trip-point__offers">
      ${renderOffers(event.offers)}
    </ul>
  </article>
  `;

  const template = document.createElement(`template`);
  template.innerHTML = templateText;
  return template.content;
};

const renderOffers = (offers) => {
  let offersList = ``;
  for (const offer of offers) {
    offersList += `
        <li>
          <button class="trip-point__offer">${offer.title} +&euro;&nbsp;${offer.price}</button>
        </li>
      `;
  }
  return offersList;
};

const getDuration = (schedule) => {
  const startHours = parseInt(schedule.start.split(`:`)[0], 10);
  const startMinutes = parseInt(schedule.start.split(`:`)[1], 10);
  const endHours = parseInt(schedule.end.split(`:`)[0], 10);
  const endMinutes = parseInt(schedule.end.split(`:`)[1], 10);
  const duration = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  let durationHours = Math.floor(duration / 60);
  let durationMinutes = duration - durationHours * 60;
  durationHours = durationHours < 10 ? `0` + durationHours : durationHours;
  durationMinutes = durationMinutes < 10 ? `0` + durationMinutes : durationMinutes;
  return `${durationHours}H ${durationMinutes}M`;
};
