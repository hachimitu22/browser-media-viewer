module.exports = class Label {
  constructor(text) {
    this._text = text;
  }
  get text() {
    return this._text;
  }
}
