export default (name) => {
  const templateText = `
  <input type="radio" id="filter-${name.toLowerCase()}" name="filter" value="${name.toLowerCase()}" checked>
  <label class="trip-filter__item" for="filter-${name.toLowerCase()}">${name}</label>`;
  const template = document.createElement(`template`);
  template.innerHTML = templateText;
  return template.content;
};
