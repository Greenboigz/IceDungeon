class Door extends Tile {

  /**
   * Barrier class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y, color) {
    super(x, y, 4, "b", "barrier");
    this._color = color;
    this._interrupting = true;
    this._traversible = true;
    this._walkable = true;
    this._locked = false;
  }

  get color() {
    return this._color;
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    if (this._locked) {
      return "locked_door_" + this.color;
    } else {
      return "door_" + this.color;
    }
  }

  get locked() {
    return this._locked
  }

  /**
   * Locks the door
   */
  lock() {
    this._locked = true;
  }

  /**
   * Unlocks the door
   * @param {Key} key
   */
  unlock(key) {
    if (this.color == key.color) {
      this._locked = false;
    }
  }

}
