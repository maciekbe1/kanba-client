export default class Todo {
  constructor(_id, cards = []) {
    this._id = _id;
    this.cards = [...cards];
  }
}
