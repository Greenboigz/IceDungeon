class Tile {

  /**
   * Abstract class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   * @param {number} type
   * @param {string} string
   * @param {string} image
   */
  constructor(x, y, type, string, image) {
    this._loc = new Vector(x,y);
    this._type = type;
    this._string = string;
    this._image = image;

    this._item = null;
    this._hasItem = false;
    this._storable = false;
    this._traversible = false;
    this._interrupting = false;
    this._deadly = false;
  }

  /**
   * Gets the string representation
   * @return {string}
   */
  toString() {
    return this._string;
  }

  /**
   * Gets the type of the tile
   * @return {number}
   */
  get type() {
    return this._type;
  }

  /**
   * Gets the vector of the location of the tile
   * @return {Vector}
   */
  get location() {
    return new Vector(this._loc.x, this._loc.y)
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return this._image;
  }

  /**
   * Gets the item on the tile
   * @return {Item}
   */
  get item() {
    if (this._hasItem) {
      return this._item;
    }
  }

  /**
   * Sets the item associated to the tile
   * @param {Item} item
   */
  set item(item) {
    if (this.isStorable() && !this._hasItem && item != null) {
      this._item = item;
      this._hasItem = true;
    } else if (!this.isStorable()) {
      throw "This tile cannot store items";
    }
  }

  /**
   * Removes the item from the tile
   * @return {Item}
   */
  removeItem() {
    if (this.hasItem()) {
      var item = this._item;
      this._item = null;
      this._hasItem = false;
      return item;
    }
  }

  /**
   * Checks if the tile is storing an item
   * @return {boolean}
   */
  hasItem() {
    return this._hasItem;
  }

  /**
   * Checks if the tile can store items
   * @return {boolean}
   */
  isStorable() {
    return this._storable;
  }

  /**
   * Checks if the tile is traversible
   * @return {boolean}
   */
   isTraversible() {
     return this._traversible;
   }

   /**
    * Checks if the skaters is stopped after traversing
    * @return {boolean}
    */
   isInterrupting() {
     return this._interrupting;
   }

   /**
    * Checks if the block is deadly
    * @return {boolean}
    */
    isDeadly() {
      return this._deadly;
    }

    /**
     * Creates a tile from the provided information
     * @param {number} x
     * @param {number} y
     * @param {string} character
     * @return {Tile}
     */
    static createTile(x, y, character) {
      var tile;
      switch (character) {
        case 'w':
          tile = new Wall(x, y);
          break;
        case ' ':
        case 't':
        case 'T':
          tile = new Space(x, y);
          if (character == 't') {
            tile.item = new Token();
          } else if (character == 'T') {
            tile.item = new BigToken();
          }
          break;
        case 's':
          tile = new Spike(x, y);
          break;
        case 'b':
          tile = new Barrier(x, y);
          break;
        default:
          tile = new Space(x, y);
      }

      return tile;
    }

}

class Wall extends Tile {

  /**
   * Wall class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 0, "w", "wall");
  }

}

class Space extends Tile {

  /**
   * Space class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 1, " ", "space");
    this._traversible = true;
    this._storable = true;
  }

}

class Spike extends Tile {

  /**
   * Spike class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 2, "s", "spike");
    this._interrupting = true;
    this._traversible = true;
    this._storable = true;
    this._deadly = true;
  }

}

class Barrier extends Tile {

  /**
   * Barrier class representing the tile object that holds location value
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    super(x, y, 3, "b", "barrier");
    this._interrupting = true;
    this._traversible = true;
  }

  /**
   * Gets the image name of the tile
   * @return {string}
   */
  get image() {
    return "barrier";
  }

}
