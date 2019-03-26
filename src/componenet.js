import {createElement} from "./utils";

export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate a base component, only a concrete one`);
    }
    this._element = null;
    this._state = {};
  }

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define a template`);
  }

  render() {
    if (this._element) {
      this._element = null;
    }
    this._element = createElement(this.template);
    this.bind();

    return this._element;
  }

  bind() {}

  unbind() {}

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}
